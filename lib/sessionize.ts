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

import { SESSIONIZE_ID } from '@lib/constants';

// Only public fields are mapped here: the Sessionize endpoint also exposes speakers'
// answers (dietary restrictions, origin city) that must never reach the page props.

export type SessionizeSpeaker = {
  name: string;
  title: string;
  bio: string;
  image: { url: string };
  slug: string;
  isTopSpeaker: boolean;
};

export type SessionizeTalk = {
  slug: string;
  title: string;
  description: string;
  level: string | null;
  duration: number | null;
  speakers: SessionizeSpeaker[];
};

const DURATION_QUESTION = 'Duration';
const LEVEL_CATEGORY = 'Technical level';

export async function getSessionizeData(): Promise<{
  speakers: SessionizeSpeaker[];
  talks: SessionizeTalk[];
}> {
  try {
    const res = await fetch(`https://sessionize.com/api/v2/${SESSIONIZE_ID}/view/All`);
    if (!res.ok) throw new Error(`Sessionize responded ${res.status}`);
    const data = await res.json();

    const durationId = data.questions.find((q: any) => q.question === DURATION_QUESTION)?.id;
    const levels = new Map<number, string>();
    data.categories
      .filter((c: any) => c.title === LEVEL_CATEGORY)
      .forEach((c: any) => c.items.forEach((i: any) => levels.set(i.id, i.name)));

    const speakers: SessionizeSpeaker[] = data.speakers
      .map((s: any) => ({
        name: s.fullName,
        title: s.tagLine ?? '',
        bio: s.bio ?? '',
        image: { url: s.profilePicture },
        slug: s.id,
        isTopSpeaker: Boolean(s.isTopSpeaker)
      }))
      .sort((a: SessionizeSpeaker, b: SessionizeSpeaker) => a.name.localeCompare(b.name))
      .sort((a: SessionizeSpeaker, b: SessionizeSpeaker) => Number(b.isTopSpeaker) - Number(a.isTopSpeaker));

    const talks: SessionizeTalk[] = data.sessions
      .filter((s: any) => !s.isServiceSession && s.status === 'Accepted')
      .map((s: any) => {
        const duration = s.questionAnswers.find((a: any) => a.questionId === durationId)?.answerValue;
        return {
          slug: s.id,
          title: s.title,
          description: s.description ?? '',
          level: s.categoryItems.map((id: number) => levels.get(id)).find(Boolean) ?? null,
          duration: duration ? parseInt(duration, 10) : null,
          speakers: s.speakers
            .map((id: string) => speakers.find(sp => sp.slug === id))
            .filter(Boolean)
        };
      })
      .sort((a: SessionizeTalk, b: SessionizeTalk) => a.title.localeCompare(b.title));

    return { speakers, talks };
  } catch (error) {
    console.error('Error fetching Sessionize data:', error);
    return { speakers: [], talks: [] };
  }
}
