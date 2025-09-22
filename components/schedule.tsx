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

import cn from 'classnames';
import { Stage, Talk } from '@lib/types';
import styles from './schedule.module.css';
import TalkCard from './talk-card';
import React from 'react';
import LinkButton from './hms/LinkButton';
import Button from './hms/Button';
import ServiceSessionCard from './service-session-card';

function StageRow({ stage }: { stage: Stage }) {
  // Group talks by the time block
  const timeBlocks = stage.schedule.reduce((allBlocks: any, talk) => {
    allBlocks[talk.start] = [...(allBlocks[talk.start] || []), talk];
    return allBlocks;
  }, {});

  return (
    <div key={stage.name} className={styles.row}>
      <h3 className={cn(styles['stage-name'], /*styles[stage.slug]*/)}>
        <span>{stage.name}</span>
      </h3>
      <div className={cn(styles.talks, /*styles[stage.slug]*/)}>
        {Object.keys(timeBlocks).map((startTime: string) => (
          <div key={startTime}>
            {timeBlocks[startTime].map((talk: Talk, index: number) => (
              <TalkCard key={talk.title} talk={talk} showTime={index === 0} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceSessionsRow({ sessions }: { sessions: Talk[] }) {
  // Group talks by the time block
  const timeBlocks = sessions.reduce((allBlocks: any, talk) => {
    allBlocks[talk.start] = [...(allBlocks[talk.start] || []), talk];
    return allBlocks;
  }
    , {});

  return (
    <div key={'General'} className={styles.service_row}>
      <h3 className={cn(styles['service-sessions-name'], /*styles[stage.slug]*/)}>
        <span>{'General'}</span>
      </h3>
      <div className={cn(styles.talks, /*styles[stage.slug]*/)}>
        {Object.keys(timeBlocks).map((startTime: string) => (
          <div key={startTime}>
            {timeBlocks[startTime].map((talk: Talk, index: number) => (
              <ServiceSessionCard key={talk.title} talk={talk} showTime={index === 0} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

type Props = {
  allStages: Stage[];
  serviceSessions: Talk[];
};

export default function Schedule({ allStages, serviceSessions }: Props) {
  const allDays = React.useMemo(() => {
    if (!allStages || allStages.length === 0) return [];

    const days = allStages.reduce((prev: Date[], curr: any) => {
      const collectedDays = curr.schedule.reduce((prev2: Date[], talk: any) => {
        const time = new Date(talk.start);
        const date = new Date(time.getFullYear(), time.getMonth(), time.getDate());
        return [...prev2, date];
      }, []);
      return [...prev, ...collectedDays];
    }, []).reduce((prev: Date[], curr: Date) => {
      const existingDay = prev.find((item: any) => item.toDateString() === curr.toDateString());
      if (!existingDay) {
        prev.push(curr);
      }
      return prev;
    }, []).sort((a: Date, b: Date) => a.getTime() - b.getTime());
    return days;
  }, [allStages]);

  const [currentDay, setCurrentDay] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (allDays.length > 0 && !currentDay) {
      setCurrentDay(allDays[0]);
    }
  }, [allDays, currentDay]);

  const currentStages = React.useMemo(() => {
    if (!currentDay || !allStages) return [];

    const stages = allStages.map((stage: any) => ({
      ...stage,
      schedule: stage.schedule.filter((talk: any) => {
        const talkDate = new Date(talk.start);
        return talkDate.toDateString() === currentDay.toDateString();
      })
    }));
    return stages;
  }, [allStages, currentDay]);

  const currentServiceSessions = React.useMemo(() => {
    if (!currentDay || !serviceSessions) return [];

    const sessions = serviceSessions.filter((talk: any) => {
      const talkDate = new Date(talk.start);
      return talkDate.toDateString() === currentDay.toDateString();
    });
    return sessions;
  }, [serviceSessions, currentDay]);

  if (!currentDay) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {/*
          Buttons to switch between days
        */}
      <div className="flex justify-start gap-4 my-8 px-8">
        {allDays.map((day: Date) => (
          <Button
            onClick={() => setCurrentDay(day)}
            key={day.toDateString()}
            rel="noopener noreferrer"
            type="button"
            className={cn(styles.button, styles['button-link'], {
              [styles['button-active']]: day.toDateString() === currentDay.toDateString()
            })}
          >
            {((string) => string[0].toUpperCase() + string.slice(1))(day.toLocaleDateString(new Intl.Locale('es-ES'), { weekday: 'long', day: 'numeric' }))}
          </Button>
        ))}
      </div>
      <div className={styles['row-wrapper']}>
        <ServiceSessionsRow key='service' sessions={currentServiceSessions} />
        {currentStages.filter(stage => stage.schedule.length > 0).map(stage => (
          <StageRow key={stage.name} stage={stage} />
        ))}
      </div>
    </div>
  );
}
