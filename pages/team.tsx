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
        <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/confetti.svg')] opacity-5"></div>
            <div className="relative z-10 px-8 py-20">
              <div className="text-center mb-16">
                <h1 className="text-6xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl">
                  EQUIPO
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Los visionarios y hacedores que dan vida a DevFest Santiago 2025
                </p>
                
                <div className="flex justify-center gap-8 mt-12">
                  <LinkButton 
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                    href="mailto:devfest@gdg-sdc.org"
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      Contáctanos
                    </span>
                  </LinkButton>
                  
                  <LinkButton 
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                    href="https://calendar.app.google/6a9udHPABjrCgmQP9"
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-5 h-5 group-hover:bounce" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                      </svg>
                      Agenda reunión
                    </span>
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative -mt-10">
            <div className="bg-black/20 backdrop-blur-sm">
              <TeamGrid teamMembers={teamMembers} />
            </div>
          </div>
        </div>
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
