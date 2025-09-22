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
import SponsorsGrid from '@components/sponsors-grid';
import Layout from '@components/layout';
import LinkButton from '@components/hms/LinkButton';

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types';
import { META_DESCRIPTION, SITE_NAME } from '@lib/constants';

// Real sponsor data for DevFest Santiago 2025
const REAL_SPONSORS: Sponsor[] = [
  // Platinum Tier
  {
    name: 'OSIX Tech',
    description: 'Empresa tecnológica especializada en soluciones innovadoras de desarrollo de software y servicios digitales.',
    slug: 'osixtech',
    website: 'https://osix.tech',
    callToAction: 'Conoce más',
    callToActionLink: 'https://osix.tech',
    links: [],
    discord: '',
    tier: 'Platinum',
    cardImage: { url: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&h=600&fit=crop' },
    logo: { url: '/osixtech.png' },
    youtubeSlug: ''
  },
  // Gold Tier
  {
    name: 'dinahosting',
    description: 'Proveedor líder de servicios de hosting y dominios en España, ofreciendo soluciones confiables para empresas y desarrolladores.',
    slug: 'dinahosting',
    website: 'https://dinahosting.com',
    callToAction: 'Descubre servicios',
    callToActionLink: 'https://dinahosting.com',
    links: [],
    discord: '',
    tier: 'Gold',
    cardImage: { url: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&h=600&fit=crop' },
    logo: { url: '/dinahosting.png' },
    youtubeSlug: ''
  },
  // Silver Tier
  {
    name: 'Raiola Networks',
    description: 'Empresa gallega especializada en hosting web, servidores dedicados y soluciones de infraestructura cloud.',
    slug: 'raiola-networks',
    website: 'https://raiolanetworks.es',
    callToAction: 'Ver servicios',
    callToActionLink: 'https://raiolanetworks.es',
    links: [],
    discord: '',
    tier: 'Silver',
    cardImage: { url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&fit=crop' },
    logo: { url: '/logo-Raiola-Networks-Plata.jpg' },
    youtubeSlug: ''
  },
  {
    name: 'EthicHub',
    description: 'Plataforma blockchain que conecta inversores con agricultores de países en desarrollo, promoviendo la inclusión financiera y el comercio ético.',
    slug: 'ethichub',
    website: 'https://www.ethichub.com/es',
    callToAction: 'Descubre EthicHub',
    callToActionLink: 'https://www.ethichub.com/es',
    links: [],
    discord: '',
    tier: 'Gold',
    cardImage: { url: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=800&h=600&fit=crop' },
    logo: { url: 'https://cdn.prod.website-files.com/63f56f54bbc14aab5dd1a315/63fe1e37c205fa5a16df7f40_Vectors-Wrapper.svg' },
    youtubeSlug: ''
  }
];

// Collaborators and Partners
const COLLABORATORS: Sponsor[] = [
  {
    name: 'Universidad de Santiago de Compostela',
    description: 'Universidad pública gallega de referencia, comprometida con la excelencia académica y la investigación de vanguardia.',
    slug: 'usc',
    website: 'https://www.usc.gal',
    callToAction: 'Visitar USC',
    callToActionLink: 'https://www.usc.gal',
    links: [],
    discord: '',
    tier: 'Colaborador',
    cardImage: { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop' },
    logo: { url: 'https://assets.usc.gal/sites/default/files/logos/2022/06/logo-neg.svg' },
    youtubeSlug: ''
  },
  {
    name: 'Escola Técnica Superior de Enxeñería',
    description: 'Centro de la USC dedicado a la formación integral de ingenieros comprometidos con el desarrollo de la sociedad bajo principios éticos.',
    slug: 'etse',
    website: 'https://www.usc.gal/en/center/higher-technical-engineering-school',
    callToAction: 'Conoce ETSE',
    callToActionLink: 'https://www.usc.gal/en/center/higher-technical-engineering-school',
    links: [],
    discord: '',
    tier: 'Colaborador',
    cardImage: { url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop' },
    logo: { url: 'https://assets.usc.gal/sites/default/files/logos/2022/06/logo-neg.svg' },
    youtubeSlug: ''
  }
];

type Props = {
  sponsors: Sponsor[];
};

export default function PartnersPage({ sponsors }: Props) {
  const meta = {
    title: 'Sponsors - ' + SITE_NAME,
    description: 'Conoce a las empresas que hacen posible DevFest Santiago 2025. Únete a nosotros y forma parte del futuro de la tecnología.'
  };

  // Combine sponsors and collaborators
  const allSponsors = [...REAL_SPONSORS, ...COLLABORATORS];
  console.log('Partners page - CMS sponsors:', sponsors.length);
  console.log('Partners page - Real sponsors:', REAL_SPONSORS.length);
  console.log('Partners page - Collaborators:', COLLABORATORS.length);
  console.log('Partners page - Total data:', allSponsors.length);

  return (
    <Page meta={meta}>
      <Layout>
        <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/confetti.svg')] opacity-5"></div>
            <div className="relative z-10 px-8 py-12">
              <div className="text-center mb-10">
                <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
                  SPONSORS & PARTNERS
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Las empresas e instituciones que hacen posible DevFest Santiago 2025
                </p>

                <div className="flex justify-center gap-8 mt-8">
                  <LinkButton
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                    href="mailto:devfest@gdg-sdc.org"
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Become a Sponsor
                    </span>
                  </LinkButton>

                  <span
                    className="group relative px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full text-white font-semibold shadow-2xl opacity-50 cursor-not-allowed inline-block"
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                      </svg>
                      Sponsorship Kit
                    </span>
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div className="relative -mt-16">
            <div className="bg-black/20 backdrop-blur-sm rounded-t-[40px] pt-8">
              <SponsorsGrid sponsors={allSponsors} />
            </div>
          </div>
        </div>
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const sponsors = await getAllSponsors().catch(() => []);

  return {
    props: {
      sponsors
    },
    revalidate: 60
  };
};