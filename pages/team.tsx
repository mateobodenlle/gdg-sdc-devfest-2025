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
import { Speaker, TeamMember } from '@lib/types';
import { META_DESCRIPTION, SITE_NAME } from '@lib/constants';
import TeamGrid from '@components/team-grid';
import { getAllTeamMembers } from '@lib/cms-providers/storyblok';

type Props = {
  teamMembers: TeamMember[];
};

export default function Team({ teamMembers }: Props) {
  const meta = {
    title: 'Equipo - ' + SITE_NAME,
    description: META_DESCRIPTION
  };
  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Equipo" description="Estos somos nosotros, los que hacemos posible este evento. ¡Conócenos!" />
        <TeamGrid teamMembers={teamMembers} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const teamMembers = await getAllTeamMembers().catch((e) => {
    console.error(e);
    return [];
  });

  return {
    props: {
      teamMembers
    },
    revalidate: 6000
  };
};
