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
import SpeakersGrid from '@components/speakers-grid';
import Layout from '@components/layout';
import Header from '@components/header';

import { getAllSpeakers } from '@lib/cms-api';
import { Speaker } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';

type Props = {
  speakers: Speaker[];
};

export default function Speakers({ speakers }: Props) {
  const meta = {
    title: 'Speakers - DevFest Santiago de Compostela 2025',
    description: META_DESCRIPTION
  };
  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Speakers" description={<>Estos son los speakers que han participado en el DevFest Santiago de Compostela 2025.</>} />
        <SpeakersGrid speakers={speakers} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const speakers = await fetch('https://sessionize.com/api/v2/ac5px0ex/view/Speakers').then(res => res.json()).then(data => data.map((speaker: any) => {
    const sessionizeLink = speaker.links?.find((link: any) => link.linkType === 'Sessionize');

    return {
      name: speaker.fullName,
      title: speaker.tagLine,
      image: {
        url: speaker.profilePicture,
      },
      slug: speaker.id,
      isTopSpeaker: speaker.isTopSpeaker,
      sessionizeUrl: sessionizeLink?.url || null
    };
  }))
    .catch(() => []);


  const topSpeakers = speakers.filter((speaker: any) => speaker.isTopSpeaker).sort((a: any, b: any) => a.name.localeCompare(b.name));
  const otherSpeakers = speakers.filter((speaker: any) => !speaker.isTopSpeaker);
  // Shuffle the other speakers
  otherSpeakers.sort(() => Math.random() - 0.5);
    
  const allSpeakers = [...topSpeakers, ...otherSpeakers];

  return {
    props: {
      speakers: allSpeakers,
    },
    revalidate: 360
  };
};
