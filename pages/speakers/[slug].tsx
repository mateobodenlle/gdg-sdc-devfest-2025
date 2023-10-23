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
import { Speaker } from '@lib/types';
import { META_DESCRIPTION, SITE_NAME } from '@lib/constants';

type Props = {
  speaker: Speaker;
};

export default function SpeakerPage({ speaker }: Props) {
  const meta = {
    title: 'Speakers - ' + SITE_NAME,
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <SpeakerSection speaker={speaker} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;

  const speakers = await fetch('https://sessionize.com/api/v2/skykx1cq/view/Speakers').then(res => res.json()).then(data => data.map((speaker: any) => ({
    name: speaker.fullName,
    title: speaker.tagLine,
    image: {
      url: speaker.profilePicture,
    },
    slug: speaker.id,
    isTopSpeaker: speaker.isTopSpeaker,
    bio: speaker.bio,
  })).sort((a: any, b: any) => a.name.localeCompare(b.name))
    .sort((a: any, b: any) => b.isTopSpeaker - a.isTopSpeaker)
  )
    .catch(() => [])

  const currentSpeaker = speakers.find((s: Speaker) => s.slug === slug) || null;

  if (!currentSpeaker) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      speaker: currentSpeaker
    },
    revalidate: 60
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await fetch('https://sessionize.com/api/v2/skykx1cq/view/Speakers').then(res => res.json()).then(data => data.map((speaker: any) => (
    { params: { slug: speaker.id } }
  )));

  return {
    paths: slugs,
    fallback: 'blocking'
  };
};
