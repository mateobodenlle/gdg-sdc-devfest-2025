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

type Props = {
  allStages: Stage[];
};

export default function Schedule({ allStages }: Props) {
  const allDays = React.useMemo(() => {
    const days = allStages.reduce((prev: Date[], curr: any) => {
      const time = new Date(curr.schedule[0].start);
      const date = new Date(time.getFullYear(), time.getMonth(), time.getDate());
      const existingDay = prev.find((item: any) => item.toDateString() === date.toDateString());
      if (!existingDay) {
        prev.push(date);
      }
      return prev;
    }
      , []);
    return days;
  }
    , [allStages]);

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
        {currentStages.map(stage => (
          <StageRow key={stage.slug} stage={stage} />
        ))}
      </div>
    </div>
  );
}
