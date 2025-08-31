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
import cn from 'classnames';
import { Sponsor } from '@lib/types';
import styles from './sponsors-grid.module.css';

type Props = {
  sponsors: Sponsor[];
};

function SponsorCard({ sponsor, tier }: { sponsor: Sponsor; tier: string }) {
  const getCardClass = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'platinum-card';
      case 'Gold':
        return 'gold-card';
      case 'Silver':
        return 'silver-card';
      case 'Bronze':
        return 'bronze-card';
      default:
        return 'default-card';
    }
  };

  return (
    <a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(styles.card, styles[getCardClass(tier)])}
    >
      <div className={styles.cardInner}>
        <div className={styles.logoContainer}>
          <img
            alt={sponsor.name}
            src={sponsor.logo.url}
            className={styles.logo}
            loading="lazy"
            title={sponsor.name}
          />
        </div>
        
        <div className={styles.content}>
          <h3 className={styles.name}>{sponsor.name}</h3>
          
          {(tier === 'Platinum' || tier === 'Gold') && (
            <p className={styles.description}>
              {sponsor.description.length > 120 
                ? `${sponsor.description.substring(0, 120)}...` 
                : sponsor.description
              }
            </p>
          )}
        </div>

        <div className={cn(styles.tierBadge, styles[tier.toLowerCase()])}>
          {tier === 'Platinum' && '👑'}
          {tier === 'Gold' && '🥇'}
          {tier === 'Silver' && '🥈'}
          {tier === 'Bronze' && '🥉'}
        </div>
      </div>
    </a>
  );
}

const TierSection = ({ 
  tier, 
  sponsors, 
  title, 
  gridClass 
}: { 
  tier: string;
  sponsors: Sponsor[];
  title: string;
  gridClass: string;
}) => {
  if (sponsors.length === 0) return null;

  return (
    <div className={styles.tierSection}>
      <div className={styles.tierHeader}>
        <h2 className={cn(styles.tierTitle, styles[tier.toLowerCase()])}>{title}</h2>
      </div>
      
      <div className={gridClass}>
        {sponsors.map(sponsor => (
          <SponsorCard 
            key={sponsor.slug || sponsor.name} 
            sponsor={sponsor} 
            tier={tier}
          />
        ))}
      </div>
    </div>
  );
};

export default function SponsorsGrid({ sponsors }: Props) {
  const platinumSponsors = sponsors.filter(s => s.tier === 'Platinum');
  const goldSponsors = sponsors.filter(s => s.tier === 'Gold');
  const silverSponsors = sponsors.filter(s => s.tier === 'Silver');
  const bronzeSponsors = sponsors.filter(s => s.tier === 'Bronze');

  if (sponsors.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Próximamente anunciaremos nuestros partners</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      <TierSection
        tier="Platinum"
        sponsors={platinumSponsors}
        title="PLATINUM PARTNERS"
        gridClass={styles.platinumGrid}
      />
      
      <TierSection
        tier="Gold"
        sponsors={goldSponsors}
        title="GOLD SPONSORS"
        gridClass={styles.goldGrid}
      />
      
      <TierSection
        tier="Silver"
        sponsors={silverSponsors}
        title="SILVER SUPPORTERS"
        gridClass={styles.silverGrid}
      />
      
      <TierSection
        tier="Bronze"
        sponsors={bronzeSponsors}
        title="COMMUNITY PARTNERS"
        gridClass={styles.bronzeGrid}
      />
    </div>
  );
}