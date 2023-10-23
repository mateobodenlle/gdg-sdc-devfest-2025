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

import { GetStaticProps } from 'next';

import Page from '@components/page';
import Schedule from '@components/schedule';
import Layout from '@components/layout';
import Header from '@components/header';

import { getAllStages } from '@lib/cms-api';
import { Stage } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';
import React from 'react';

type Props = {
  allStages: Stage[];
};

export default function SchedulePage({ allStages }: Props) {
  const meta = {
    title: 'Schedule - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header
          hero="Agenda"
          description="Estas son las charlas que podrás disfrutar en el DevFest Santiago de Compostela 2023. ¡No te las pierdas!"
        />
        <Schedule allStages={allStages} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allSpeakers = await fetch('https://sessionize.com/api/v2/skykx1cq/view/SpeakerWall').then(res => res.json()).then(data => data.map((speaker: any) => ({
    name: speaker.fullName,
    title: speaker.tagLine,
    image: {
      url: speaker.profilePicture,
    },
    slug: speaker.id,
    isTopSpeaker: speaker.isTopSpeaker
  })).sort((a: any, b: any) => a.name.localeCompare(b.name))
    .sort((a: any, b: any) => b.isTopSpeaker - a.isTopSpeaker)
  )
    .catch((e) => {
      console.error(e);
      return []
    }
    );

  const allTalks = await fetch('https://sessionize.com/api/v2/skykx1cq/view/GridSmart').then(res => res.json()).then((data: any[]) => data.reduce((prevList: any[], date: any) => (
    [
      ...prevList,
      ...date.rooms.reduce((prevRooms: any[], room: any) => (
        [
          ...prevRooms,
          ...room.sessions.map((session: any) => ({
            title: session.title,
            description: session.description,
            start: session.startsAt,
            end: session.endsAt,
            speaker: session.speakers[0] ?
              session.speakers.map((speaker: any) => (
                // Get the full speaker details from the list
                allSpeakers.find((s: any) => s.slug === speaker.id)
              )).sort((a: any, b: any) => a.name.localeCompare(b.name))
                .sort((a: any, b: any) => b.isTopSpeaker - a.isTopSpeaker)
              : null,
            stage: {
              name: room.name
            },
            slug: session.id,
            isServiceSession: session.isServiceSession,
            isPlenumSession: session.isPlenumSession
          }))
        ]
      ), [])
    ]
  ), []))
    .catch((e) => {
      console.error(e);
      return []
    });

  const serviceSessions = allTalks.filter((talk: any) => talk.isServiceSession);
  const plenumSessions = allTalks.filter((talk: any) => talk.isPlenumSession);
  const regularTalks = allTalks.filter((talk: any) => !talk.isServiceSession && !talk.isPlenumSession);

  // Group all talks by stage
  const allStages = regularTalks.reduce((prev: any[], curr: any) => {
    const existingStage = prev.find((item: any) => item.name === curr.stage.name);
    if (existingStage) {
      existingStage.schedule.push(curr);
    } else {
      prev.push({
        name: curr.stage.name,
        slug: null,
        schedule: [curr]
      });
    }
    return prev;
  }
    , []);

  return {
    props: {
      allStages
    },
    revalidate: 60
  };
};
