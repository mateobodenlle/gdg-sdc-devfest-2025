/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { Stage, Talk } from '@lib/types';
import styles from './schedule-grid.module.css';
import Button from './hms/Button';

type ScheduleGridProps = {
  allStages: Stage[];
  serviceSessions: Talk[];
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}


// Mobile-specific components
function MobileTalkCard({ talk }: { talk: Talk }) {
  return (
    <div className={cn(styles.mobileTalkCard, {
      [styles.mobileServiceSession]: talk.isServiceSession
    })}>
      <div className={styles.mobileTimeHeader}>
        <span className={styles.mobileTime}>
          {formatTime(new Date(talk.start))} - {formatTime(new Date(talk.end))}
        </span>
        {talk.stage && (
          <span className={styles.mobileStage}>{talk.stage.name}</span>
        )}
      </div>

      <div className={styles.mobileTalkContent}>
        <h3 className={styles.mobileTalkTitle}>{talk.title}</h3>

        {talk.speaker && talk.speaker.length > 0 && (
          <div className={styles.mobileSpeakers}>
            {talk.speaker.map((speaker, index) => (
              <div key={index} className={styles.mobileSpeakerItem}>
                {speaker.image && (
                  <div className={styles.mobileSpeakerAvatar}>
                    <Image
                      src={speaker.image.url}
                      alt={speaker.name}
                      width={40}
                      height={40}
                      className={styles.mobileSpeakerImage}
                    />
                  </div>
                )}
                <div className={styles.mobileSpeakerInfo}>
                  <span className={styles.mobileSpeakerName}>{speaker.name}</span>
                  {speaker.title && (
                    <span className={styles.mobileSpeakerTitle}>{speaker.title}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MobileSchedule({ allStages, serviceSessions, currentDay }: {
  allStages: Stage[];
  serviceSessions: Talk[];
  currentDay: Date;
}) {
  // Get all talks for current day and sort by time
  const allTalksToday = React.useMemo(() => {
    const talks: Talk[] = [];

    // Add service sessions
    const dayServiceSessions = serviceSessions.filter(session => {
      const sessionDate = new Date(session.start);
      return sessionDate.toDateString() === currentDay.toDateString();
    });
    talks.push(...dayServiceSessions);

    // Add regular talks
    allStages.forEach(stage => {
      const stageTalks = stage.schedule.filter(talk => {
        const talkDate = new Date(talk.start);
        return talkDate.toDateString() === currentDay.toDateString();
      }).map(talk => ({ ...talk, stage: { name: stage.name } }));
      talks.push(...stageTalks);
    });

    // Sort by start time
    return talks.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  }, [allStages, serviceSessions, currentDay]);

  return (
    <div className={styles.mobileSchedule}>
      {allTalksToday.map((talk, index) => (
        <MobileTalkCard key={`${talk.slug}-${index}`} talk={talk} />
      ))}
    </div>
  );
}


export default function ScheduleGrid({ allStages, serviceSessions }: ScheduleGridProps) {
  // Mobile detection
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get all unique days
  const allDays = React.useMemo(() => {
    if (!allStages || allStages.length === 0) return [];

    const days = allStages.reduce((prev: Date[], stage: Stage) => {
      const stageDays = stage.schedule.map(talk => {
        const time = new Date(talk.start);
        return new Date(time.getFullYear(), time.getMonth(), time.getDate());
      });
      return [...prev, ...stageDays];
    }, []);

    const uniqueDays = days.reduce((prev: Date[], curr: Date) => {
      const exists = prev.find(day => day.toDateString() === curr.toDateString());
      if (!exists) prev.push(curr);
      return prev;
    }, []);

    return uniqueDays.sort((a, b) => a.getTime() - b.getTime());
  }, [allStages]);

  const [currentDay, setCurrentDay] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (allDays.length > 0 && !currentDay) {
      setCurrentDay(allDays[0]);
    }
  }, [allDays, currentDay]);

  // Calculate time range and positioning for continuous timeline
  const timelineConfig = React.useMemo(() => {
    if (!currentDay || !allStages) return null;

    const allTalks = allStages.reduce((talks: Talk[], stage) => {
      const dayTalks = stage.schedule.filter(talk => {
        const talkDate = new Date(talk.start);
        return talkDate.toDateString() === currentDay.toDateString();
      });
      return [...talks, ...dayTalks];
    }, []);

    const dayServiceSessions = serviceSessions.filter(session => {
      const sessionDate = new Date(session.start);
      return sessionDate.toDateString() === currentDay.toDateString();
    });

    const allSessionsToday = [...allTalks, ...dayServiceSessions];
    if (allSessionsToday.length === 0) return null;

    // Get earliest and latest times
    const times = allSessionsToday.map(s => new Date(s.start).getTime());
    const minSessionTime = Math.min(...times);
    const maxSessionTime = Math.max(...allSessionsToday.map(s => new Date(s.end).getTime()));

    // Generate hourly markers for the timeline
    // Start from the hour before the first session
    const startHour = new Date(minSessionTime);
    startHour.setMinutes(0, 0, 0);

    // End one hour after the last session
    const endHour = new Date(maxSessionTime);
    endHour.setMinutes(0, 0, 0);
    endHour.setHours(endHour.getHours() + 1);

    // Use startHour as minTime for positioning calculations
    const minTime = startHour.getTime();
    const maxTime = endHour.getTime();

    const hourMarkers = [];
    for (let time = startHour.getTime(); time <= endHour.getTime(); time += 3600000) {
      hourMarkers.push(new Date(time));
    }

    const PIXELS_PER_MINUTE = 3.5; // 3.5px per minute for better readability
    const totalMinutes = (maxTime - minTime) / 60000;
    const timelineHeight = totalMinutes * PIXELS_PER_MINUTE;

    return {
      minTime,
      maxTime,
      hourMarkers,
      timelineHeight,
      pixelsPerMinute: PIXELS_PER_MINUTE,
      calculatePosition: (time: string) => {
        const timeMs = new Date(time).getTime();
        const minutesFromStart = (timeMs - minTime) / 60000;
        return minutesFromStart * PIXELS_PER_MINUTE;
      },
      calculateHeight: (start: string, end: string) => {
        const duration = (new Date(end).getTime() - new Date(start).getTime()) / 60000;
        return duration * PIXELS_PER_MINUTE;
      }
    };
  }, [allStages, serviceSessions, currentDay]);

  // Get current day stages and sessions
  const currentStages = React.useMemo(() => {
    if (!currentDay || !allStages) return [];

    return allStages.map(stage => ({
      ...stage,
      schedule: stage.schedule.filter(talk => {
        const talkDate = new Date(talk.start);
        return talkDate.toDateString() === currentDay.toDateString();
      })
    })).filter(stage => stage.schedule.length > 0);
  }, [allStages, currentDay]);

  const currentServiceSessions = React.useMemo(() => {
    if (!currentDay || !serviceSessions) return [];

    return serviceSessions.filter(session => {
      const sessionDate = new Date(session.start);
      return sessionDate.toDateString() === currentDay.toDateString();
    });
  }, [serviceSessions, currentDay]);

  if (!currentDay) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Day selector */}
      <div className={styles.daySelector}>
        {allDays.map((day: Date) => (
          <Button
            onClick={() => setCurrentDay(day)}
            key={day.toDateString()}
            type="button"
            className={cn(styles.dayButton, {
              [styles.dayButtonActive]: day.toDateString() === currentDay.toDateString()
            })}
          >
            {day.toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'short'
            })}
          </Button>
        ))}
      </div>

      {/* Mobile layout */}
      {isMobile ? (
        <MobileSchedule
          allStages={currentStages}
          serviceSessions={currentServiceSessions}
          currentDay={currentDay}
        />
      ) : (
        /* Desktop continuous timeline layout */
        <div className={styles.scheduleWrapper}>
          {!timelineConfig ? (
            <div>No sessions scheduled for this day</div>
          ) : (
            <div className={styles.timelineContainer}>
              {/* Headers row */}
              <div className={styles.headersRow}>
                <div className={styles.timeHeaderCell}></div>
                {currentServiceSessions.length > 0 && (
                  <div className={styles.stageHeader}>
                    <h3 className={styles.stageName}>General</h3>
                  </div>
                )}
                {currentStages.map(stage => (
                  <div key={stage.name} className={styles.stageHeader}>
                    <h3 className={styles.stageName}>{stage.name}</h3>
                  </div>
                ))}
              </div>

              {/* Timeline content area */}
              <div className={styles.timelineContent}>
                {/* Time markers column */}
                <div
                  className={styles.timeMarkersColumn}
                  style={{ height: `${timelineConfig.timelineHeight}px` }}
                >
                  {timelineConfig.hourMarkers.map((marker, index) => {
                    const position = timelineConfig.calculatePosition(marker.toISOString());
                    return (
                      <div
                        key={index}
                        className={styles.timeMarker}
                        style={{ top: `${position}px` }}
                      >
                        <span className={styles.timeLabel}>
                          {formatTime(marker)}
                        </span>
                        <div className={styles.timeMarkerLine} />
                      </div>
                    );
                  })}
                </div>

                {/* Tracks container */}
                <div className={styles.tracksContainer}>
                  {/* Service sessions track */}
                  {currentServiceSessions.length > 0 && (
                    <div
                      className={styles.track}
                      style={{ height: `${timelineConfig.timelineHeight}px` }}
                    >
                      {currentServiceSessions.map((session) => {
                        const top = timelineConfig.calculatePosition(session.start);
                        const height = timelineConfig.calculateHeight(session.start, session.end);

                        return (
                          <div
                            key={`service-${session.slug || session.title}`}
                            className={styles.timelineSession}
                            style={{
                              top: `${top}px`,
                              height: `${height}px`
                            }}
                          >
                            <div className={cn(styles.talkCell, styles.serviceSession)}>
                              <div className={styles.talkContent}>
                                <h4 className={styles.talkTitle}>{session.title}</h4>
                                {session.speaker && session.speaker.length > 0 && (
                                  <div className={styles.speakers}>
                                    {session.speaker.map((speaker, index) => (
                                      <div key={index} className={styles.speakerItem}>
                                        {speaker.image && (
                                          <div className={styles.speakerAvatar}>
                                            <Image
                                              src={speaker.image.url}
                                              alt={speaker.name}
                                              width={24}
                                              height={24}
                                              className={styles.speakerImage}
                                            />
                                          </div>
                                        )}
                                        <span className={styles.speakerName}>
                                          {speaker.name}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <div className={styles.talkTime}>
                                  {formatTime(new Date(session.start))} - {formatTime(new Date(session.end))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Regular stage tracks */}
                  {currentStages.map((stage) => (
                    <div
                      key={stage.name}
                      className={styles.track}
                      style={{ height: `${timelineConfig.timelineHeight}px` }}
                    >
                      {stage.schedule.map((talk) => {
                        const top = timelineConfig.calculatePosition(talk.start);
                        const height = timelineConfig.calculateHeight(talk.start, talk.end);

                        return (
                          <div
                            key={`${stage.name}-${talk.slug || talk.title}`}
                            className={styles.timelineSession}
                            style={{
                              top: `${top}px`,
                              height: `${height}px`
                            }}
                          >
                            <div className={styles.talkCell}>
                              <div className={styles.talkContent}>
                                <h4 className={styles.talkTitle}>{talk.title}</h4>
                                {talk.speaker && talk.speaker.length > 0 && (
                                  <div className={styles.speakers}>
                                    {talk.speaker.map((speaker, index) => (
                                      <div key={index} className={styles.speakerItem}>
                                        {speaker.image && (
                                          <div className={styles.speakerAvatar}>
                                            <Image
                                              src={speaker.image.url}
                                              alt={speaker.name}
                                              width={24}
                                              height={24}
                                              className={styles.speakerImage}
                                            />
                                          </div>
                                        )}
                                        <span className={styles.speakerName}>
                                          {speaker.name}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <div className={styles.talkTime}>
                                  {formatTime(new Date(talk.start))} - {formatTime(new Date(talk.end))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}