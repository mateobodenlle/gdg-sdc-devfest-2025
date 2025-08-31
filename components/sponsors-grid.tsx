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

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const getTierStyle = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'from-yellow-400/20 to-yellow-600/20 border-yellow-400/30 hover:border-yellow-400/60';
      case 'Gold':
        return 'from-yellow-600/20 to-orange-500/20 border-yellow-600/30 hover:border-yellow-600/60';
      case 'Silver':
        return 'from-slate-400/20 to-slate-600/20 border-slate-400/30 hover:border-slate-400/60';
      case 'Bronze':
        return 'from-orange-600/20 to-orange-700/20 border-orange-600/30 hover:border-orange-600/60';
      default:
        return 'from-gray-400/20 to-gray-600/20 border-gray-400/30 hover:border-gray-400/60';
    }
  };

  const getCardSize = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'min-h-[300px]';
      case 'Gold':
        return 'min-h-[250px]';
      case 'Silver':
        return 'min-h-[200px]';
      case 'Bronze':
        return 'min-h-[150px]';
      default:
        return 'min-h-[200px]';
    }
  };

  return (
    <Link legacyBehavior key={sponsor.name} href={sponsor.website}>
      <a
        role="button"
        tabIndex={0}
        className={`
          relative group cursor-pointer transition-all duration-300 
          bg-gradient-to-br ${getTierStyle(sponsor.tier)} 
          backdrop-filter backdrop-blur-lg 
          border border-solid rounded-3xl overflow-hidden 
          hover:transform hover:scale-105 hover:shadow-2xl 
          ${getCardSize(sponsor.tier)}
        `}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="relative w-full h-full p-6 flex flex-col justify-center items-center">
          <div className="w-full h-32 mb-4 flex items-center justify-center">
            <Image
              alt={sponsor.name}
              src={sponsor.logo.url}
              className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
              title={sponsor.name}
              width={300}
              height={120}
            />
          </div>
          
          {(sponsor.tier === 'Platinum' || sponsor.tier === 'Gold') && (
            <div className="text-center">
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors">
                {sponsor.name}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {sponsor.description.substring(0, 120)}...
              </p>
            </div>
          )}

          {sponsor.tier === 'Platinum' && (
            <div className="absolute top-3 right-3">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-1 rounded-full text-xs font-bold">
                ⭐ PLATINUM
              </div>
            </div>
          )}

          {sponsor.tier === 'Gold' && (
            <div className="absolute top-3 right-3">
              <div className="bg-gradient-to-r from-yellow-600 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                🥇 GOLD
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </a>
    </Link>
  );
}

type Props = {
  sponsors: Sponsor[];
};

export default function SponsorsGrid({ sponsors }: Props) {
  const platinumSponsors = sponsors.filter(s => s.tier === 'Platinum');
  const goldSponsors = sponsors.filter(s => s.tier === 'Gold');
  const silverSponsors = sponsors.filter(s => s.tier === 'Silver');
  const bronzeSponsors = sponsors.filter(s => s.tier === 'Bronze');

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      {/* Platinum Sponsors */}
      {platinumSponsors.length > 0 && (
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 mb-4">
              PLATINUM SPONSORS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {platinumSponsors.map(sponsor => (
              <SponsorCard key={sponsor.name} sponsor={sponsor} />
            ))}
          </div>
        </div>
      )}

      {/* Gold Sponsors */}
      {goldSponsors.length > 0 && (
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-yellow-500 to-orange-500 mb-4">
              GOLD SPONSORS
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-600 to-orange-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {goldSponsors.map(sponsor => (
              <SponsorCard key={sponsor.name} sponsor={sponsor} />
            ))}
          </div>
        </div>
      )}

      {/* Silver Sponsors */}
      {silverSponsors.length > 0 && (
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 mb-4">
              SILVER SPONSORS
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-slate-400 to-slate-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {silverSponsors.map(sponsor => (
              <SponsorCard key={sponsor.name} sponsor={sponsor} />
            ))}
          </div>
        </div>
      )}

      {/* Bronze Sponsors */}
      {bronzeSponsors.length > 0 && (
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 mb-4">
              BRONZE SPONSORS
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-orange-600 to-orange-700 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {bronzeSponsors.map(sponsor => (
              <SponsorCard key={sponsor.name} sponsor={sponsor} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
