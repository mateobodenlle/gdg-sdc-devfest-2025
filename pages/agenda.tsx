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
import { Stage, Talk } from '@lib/types';
import { META_DESCRIPTION, SITE_NAME } from '@lib/constants';
import React from 'react';

const TOPIC_CATEGORY_ID = 62477;

type Props = {
  allStages: Stage[];
  serviceSessions: Talk[];
};

export default function SchedulePage({ allStages, serviceSessions }: Props) {
  const meta = {
    title: 'Agenda - ' + SITE_NAME,
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header
          hero="Agenda"
          description="Estas han sido las charlas que los asistentes han podido disfrutar en el DevFest Santiago de Compostela 2025. ¡Un evento de primer nivel!"
        />
        <Schedule allStages={allStages} serviceSessions={serviceSessions} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allSpeakers = await fetch('https://sessionize.com/api/v2/ac5px0ex/view/SpeakerWall').then(res => res.json()).then(data => data.map((speaker: any) => ({
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

  const allTalks = await fetch('https://sessionize.com/api/v2/ac5px0ex/view/GridSmart').then(res => res.json()).then((data: any[]) => data.reduce((prevList: any[], date: any) => (
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
            isPlenumSession: session.isPlenumSession,
            topic: session.categories?.find((category: any) => category.id === TOPIC_CATEGORY_ID)?.categoryItems[0].id ?? null
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
      allStages,
      serviceSessions,
    },
    revalidate: 360
  };
};
