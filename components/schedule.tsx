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
  // Check if there's no data available
  if (!allStages || allStages.length === 0) {
    return (
      <div className={styles.container}>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-center max-w-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Agenda en construcción</h3>
            <p className="text-gray-600 mb-6">
              Estamos trabajando en la agenda del DevFest Santiago de Compostela 2025.
              ¡Pronto tendrás disponible todo el programa con las charlas y speakers confirmados!
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                <path d="M11 6H9v5l4.25 2.52.77-1.28L11 10.5z"/>
              </svg>
              Próximamente
            </div>
          </div>
        </div>
      </div>
    );
  }

  const allDays = React.useMemo(() => {
    const days = allStages.reduce((prev: Date[], curr: any) => {
      const collectedDays = curr.schedule.reduce((prev2: Date[], talk: any) => {
        const time = new Date(talk.start);
        const date = new Date(time.getFullYear(), time.getMonth(), time.getDate());
        return [...prev2, date];
      }, []);
      return [...prev, ...collectedDays];
    }
      , []).reduce((prev: Date[], curr: Date) => {
        const existingDay = prev.find((item: any) => item.toDateString() === curr.toDateString());
        if (!existingDay) {
          prev.push(curr);
        }
        return prev;
      }
        , []).sort((a: Date, b: Date) => a.getTime() - b.getTime());
    return days;
  }
    , [allStages]);

    console.log(allDays);

  const [currentDay, setCurrentDay] = React.useState(allDays[0]);

  const currentStages = React.useMemo(() => {
    // Filter talks inside stages by day
    const stages = allStages.map((stage: any) => ({
      ...stage,
      schedule: stage.schedule.filter((talk: any) => {
        const talkDate = new Date(talk.start);
        return talkDate.toDateString() === currentDay.toDateString();
      })
    }));
    return stages;
  }
    , [allStages, currentDay]);

  const currentServiceSessions = React.useMemo(() => {
    // Filter talks inside stages by day
    const sessions = serviceSessions.filter((talk: any) => {
      const talkDate = new Date(talk.start);
      return talkDate.toDateString() === currentDay.toDateString();
    });
    return sessions;
  }
    , [serviceSessions, currentDay]);

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
