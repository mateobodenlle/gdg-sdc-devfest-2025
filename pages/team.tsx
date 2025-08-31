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
import LinkButton from '@components/hms/LinkButton';
import styles from '@components/contact.module.css';
import cn from 'classnames';

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
        <Header hero="Equipo" description="Estos somos nosotros, los que hacemos posible este evento 👋😉" />
        <div className='flex justify-center gap-6 flex-wrap mt-8 mb-12'>
          <LinkButton className={cn(styles.button_small, styles.register,) + " px-8 py-3"} href="mailto:devfest@gdg-sdc.org">
            📧 Escríbenos por email
          </LinkButton>
          <LinkButton className={cn(styles.button_small, styles.register,) + " px-8 py-3"} href="https://calendar.app.google/6a9udHPABjrCgmQP9">
            📅 Agenda una reunión
          </LinkButton>
        </div>
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
    revalidate: 600
  };
};
