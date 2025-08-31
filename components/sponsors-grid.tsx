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

function SponsorCard({ sponsor, tier }: { sponsor: Sponsor; tier: string }) {
  const getTierGradient = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'from-yellow-300 via-yellow-100 to-yellow-300';
      case 'Gold':
        return 'from-yellow-500 via-yellow-400 to-yellow-600';
      case 'Silver':
        return 'from-slate-300 via-slate-200 to-slate-400';
      case 'Bronze':
        return 'from-orange-400 via-orange-300 to-orange-500';
      default:
        return 'from-gray-300 via-gray-200 to-gray-400';
    }
  };

  const getTierBorder = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'linear-gradient(135deg, #fbbf24, #f59e0b)';
      case 'Gold':
        return 'linear-gradient(135deg, #f59e0b, #d97706)';
      case 'Silver':
        return 'linear-gradient(135deg, #94a3b8, #64748b)';
      case 'Bronze':
        return 'linear-gradient(135deg, #fb923c, #ea580c)';
      default:
        return 'linear-gradient(135deg, #6b7280, #4b5563)';
    }
  };

  const getCardHeight = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'min-h-[24em]';
      case 'Gold':
        return 'min-h-[20em]';
      case 'Silver':
        return 'min-h-[16em]';
      case 'Bronze':
        return 'min-h-[14em]';
      default:
        return 'min-h-[16em]';
    }
  };

  return (
    <a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group cursor-pointer transition-all duration-400 cubic-bezier(0.175, 0.885, 0.32, 1.275)
        ${getCardHeight(tier)}
        block relative overflow-hidden
      `}
    >
      <div 
        className="
          h-full
          backdrop-blur-xl
          border border-white/10
          p-1
          transition-all duration-300 ease-out
          group-hover:scale-105
          group-hover:-translate-y-2
        "
        style={{
          borderRadius: '32px',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          boxShadow: `
            0 20px 40px rgba(0,0,0,0.1),
            0 8px 16px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.1)
          `
        }}
      >
        {/* Tier indicator border */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 rounded-t-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: getTierBorder(tier) }}
        />
        
        {/* Card content */}
        <div 
          className="h-full p-8 flex flex-col justify-center items-center text-center backdrop-blur-sm"
          style={{
            borderRadius: '28px',
            background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)'
          }}
        >
          {/* Logo container */}
          <div className={`mb-6 flex items-center justify-center ${
            tier === 'Platinum' ? 'h-24' : 
            tier === 'Gold' ? 'h-20' :
            tier === 'Silver' ? 'h-16' : 'h-14'
          }`}>
            <img
              alt={sponsor.name}
              src={sponsor.logo.url}
              className="max-w-full max-h-full object-contain filter brightness-0 invert transition-all duration-300 group-hover:scale-110"
              loading="lazy"
              title={sponsor.name}
            />
          </div>
          
          {/* Company name */}
          <h3 
            className={`font-extrabold mb-4 ${
              tier === 'Platinum' ? 'text-2xl' :
              tier === 'Gold' ? 'text-xl' :
              tier === 'Silver' ? 'text-lg' : 'text-base'
            }`}
            style={{
              background: `linear-gradient(135deg, ${getTierGradient(tier)})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            {sponsor.name}
          </h3>
          
          {/* Description for premium tiers */}
          {(tier === 'Platinum' || tier === 'Gold') && (
            <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              {sponsor.description.length > 120 ? 
                `${sponsor.description.substring(0, 120)}...` : 
                sponsor.description
              }
            </p>
          )}
          
          {/* Tier badge */}
          <div className="absolute top-4 right-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <div 
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ 
                background: getTierBorder(tier),
                color: tier === 'Platinum' ? '#000' : '#fff'
              }}
            >
              {tier === 'Platinum' && '👑'}
              {tier === 'Gold' && '🥇'} 
              {tier === 'Silver' && '🥈'}
              {tier === 'Bronze' && '🥉'}
              <span className="ml-1">{tier.toUpperCase()}</span>
            </div>
          </div>
          
          {/* Hover shine effect */}
          <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
               style={{
                 background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)'
               }} />
          
          {/* Animated gradient border on hover */}
          <div 
            className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            style={{
              background: `linear-gradient(45deg, ${getTierBorder(tier)})`,
              padding: '1px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}
          />
        </div>
      </div>
    </a>
  );
}

type Props = {
  sponsors: Sponsor[];
};

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
  const getTierGradient = () => {
    switch (tier) {
      case 'Platinum':
        return 'from-yellow-200 via-yellow-100 to-yellow-300';
      case 'Gold':
        return 'from-yellow-500 via-yellow-400 to-orange-400';
      case 'Silver':
        return 'from-slate-300 via-slate-200 to-slate-400';
      case 'Bronze':
        return 'from-orange-400 via-orange-300 to-orange-500';
      default:
        return 'from-gray-300 via-gray-200 to-gray-400';
    }
  };

  const getTitleSize = () => {
    switch (tier) {
      case 'Platinum':
        return 'text-5xl md:text-6xl';
      case 'Gold':
        return 'text-4xl md:text-5xl';
      case 'Silver':
        return 'text-3xl md:text-4xl';
      case 'Bronze':
        return 'text-2xl md:text-3xl';
      default:
        return 'text-3xl md:text-4xl';
    }
  };

  if (sponsors.length === 0) return null;

  return (
    <div className="mb-24">
      <div className="text-center mb-16">
        <h2 
          className={`font-black mb-8 leading-tight ${getTitleSize()}`}
          style={{
            background: `linear-gradient(135deg, ${getTierGradient()})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          {title}
        </h2>
        <div 
          className="h-2 mx-auto rounded-full"
          style={{ 
            width: tier === 'Platinum' ? '120px' : 
                   tier === 'Gold' ? '100px' : 
                   tier === 'Silver' ? '80px' : '60px',
            background: `linear-gradient(90deg, ${getTierGradient()})`
          }}
        />
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
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center text-white">
          <p className="text-xl">No hay sponsors disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-20">
      <TierSection
        tier="Platinum"
        sponsors={platinumSponsors}
        title="PLATINUM PARTNERS"
        gridClass="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto"
      />
      
      <TierSection
        tier="Gold"
        sponsors={goldSponsors}
        title="GOLD SPONSORS"
        gridClass="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
      />
      
      <TierSection
        tier="Silver"
        sponsors={silverSponsors}
        title="SILVER SUPPORTERS"
        gridClass="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
      />
      
      <TierSection
        tier="Bronze"
        sponsors={bronzeSponsors}
        title="BRONZE CONTRIBUTORS"
        gridClass="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8"
      />
    </div>
  );
}
