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
import ScheduleGrid from '@components/schedule-grid';
import Layout from '@components/layout';
import Header from '@components/header';
import LinkButton from '@components/hms/LinkButton';

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
        <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/confetti.svg')] opacity-5"></div>
            <div className="relative z-10 px-8 py-6">
              <div className="text-center mb-6">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-2xl">
                  AGENDA
                </h1>
                <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Descubre todas las charlas y eventos del DevFest Santiago 2025
                </p>

                <div className="flex justify-center gap-8 mt-5">
                  <LinkButton
                    className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                    href="/speakers"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2.01.99L12 11l-1.99-2.01A2.5 2.5 0 0 0 8 8H5.46c-.8 0-1.3.63-1.42 1.37L1.5 16H4v6h4v-6h2v6h4v-6h2v6h4z"/>
                      </svg>
                      Ver Speakers
                    </span>
                  </LinkButton>
                </div>
              </div>

            </div>
          </div>

          <div className="relative -mt-16">
            <div className="bg-black/20 backdrop-blur-sm rounded-t-[40px] pt-8">
              <ScheduleGrid allStages={allStages} serviceSessions={serviceSessions} />
            </div>
          </div>
        </div>
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  console.log('🔍 Starting agenda data fetch...');
  
  let allSpeakers: any[] = [];
  
  try {
    const speakersResponse = await fetch('https://sessionize.com/api/v2/ac5px0ex/view/SpeakerWall');
    console.log('📡 Speakers API status:', speakersResponse.status);
    
    if (speakersResponse.ok) {
      const speakersData = await speakersResponse.json();
      console.log('👥 Speakers received:', speakersData?.length || 0);
      
      allSpeakers = speakersData.map((speaker: any) => ({
        name: speaker.fullName,
        title: speaker.tagLine,
        image: {
          url: speaker.profilePicture,
        },
        slug: speaker.id,
        isTopSpeaker: speaker.isTopSpeaker
      })).sort((a: any, b: any) => a.name.localeCompare(b.name))
        .sort((a: any, b: any) => b.isTopSpeaker - a.isTopSpeaker);
    }
  } catch (error) {
    console.error('❌ Error fetching speakers:', error);
  }

  let allTalks: any[] = [];
  
  try {
    const talksResponse = await fetch('https://sessionize.com/api/v2/ac5px0ex/view/GridSmart');
    console.log('📡 Talks API status:', talksResponse.status);
    
    if (talksResponse.ok) {
      const talksData = await talksResponse.json();
      console.log('📅 Talks data received:', talksData?.length || 0, 'items');
      
      if (Array.isArray(talksData) && talksData.length > 0) {
        allTalks = talksData.reduce((prevList: any[], date: any) => [
          ...prevList,
          ...date.rooms.reduce((prevRooms: any[], room: any) => [
            ...prevRooms,
            ...room.sessions.map((session: any) => ({
              title: session.title,
              description: session.description,
              start: session.startsAt,
              end: session.endsAt,
              speaker: session.speakers[0] ?
                session.speakers.map((speaker: any) => 
                  allSpeakers.find((s: any) => s.slug === speaker.id)
                ).sort((a: any, b: any) => a.name.localeCompare(b.name))
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
          ], [])
        ], []);
      }
    }
  } catch (error) {
    console.error('❌ Error fetching talks:', error);
  }

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
  }, []);

  console.log('📋 Final results:');
  console.log('  - Speakers:', allSpeakers.length);
  console.log('  - Stages:', allStages.length);
  console.log('  - Service sessions:', serviceSessions.length);

  return {
    props: {
      allStages,
      serviceSessions,
    },
    revalidate: 360
  };
};