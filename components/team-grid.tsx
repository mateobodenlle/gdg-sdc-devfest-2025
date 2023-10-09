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

import Link from 'next/link';
import Image from 'next/image';
import { Speaker, TeamMember } from '@lib/types';
import styles from './team-grid.module.css';

type Props = {
  teamMembers: TeamMember[];
};

export default function TeamGrid({ teamMembers }: Props) {
  return (
    <div className={styles.grid}>
      {teamMembers.map(teamMember => (
        <Link legacyBehavior key={teamMember.name} href={`/speakers/${teamMember.slug}`}>
          <a role="button" tabIndex={0} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                alt={teamMember.name}
                src={teamMember.image.url}
                className={styles.image}
                loading="lazy"
                quality="50"
                title={teamMember.name}
                placeholder={teamMember.image.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={teamMember.image.blurDataURL}
                width={300}
                height={300}
              />
            </div>
            <div className={styles.cardBody}>
              <div>
                <h2 className={styles.name}>{teamMember.name}</h2>
                <p className={styles.title}>
                  {`${teamMember.role} @ `}
                  <span className={styles.company}>{teamMember.currentAffiliation}</span>
                </p>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
