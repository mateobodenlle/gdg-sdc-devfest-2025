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

import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/page';
import SpeakerSection from '@components/speaker-section';
import Layout from '@components/layout';

import { getAllSpeakers } from '@lib/cms-api';
import { Speaker, Talk } from '@lib/types';
import { META_DESCRIPTION, SITE_NAME } from '@lib/constants';
import TalkSection from '@components/talk-section';

type Props = {
  talk: Talk;
};

export default function SpeakerPage({ talk }: Props) {
  const meta = {
    title: 'Sesión - ' + SITE_NAME,
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <TalkSection talk={talk} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;

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

  const currentTalk = allTalks.find((t: any) => t.slug === slug) || null;

  if (!currentTalk) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      talk: currentTalk
    },
    revalidate: 60
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugs = await fetch('https://sessionize.com/api/v2/skykx1cq/view/GridSmart').then(res => res.json()).then((data: any[]) => data.reduce((prevList: any[], date: any) => (
    [
      ...prevList,
      ...date.rooms.reduce((prevRooms: any[], room: any) => (
        [
          ...prevRooms,
          ...room.sessions.map((session: any) => ({
            params: { slug: session.id },
          }))
        ]
      ), [])
    ]
  ), []))
    .catch((e) => {
      console.error(e);
      return []
    });

  return {
    paths: allSlugs,
    fallback: 'blocking'
  };
};
