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

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types';
import { META_DESCRIPTION, SITE_NAME } from '@lib/constants';

// Sample sponsor data for different tiers
const SAMPLE_SPONSORS: Sponsor[] = [
  // Platinum Tier
  {
    name: 'Google',
    description: 'Tecnología que conecta el mundo. Desde búsquedas hasta inteligencia artificial, Google impulsa la innovación digital global.',
    slug: 'google',
    website: 'https://google.com',
    callToAction: 'Explorar carreras',
    callToActionLink: 'https://careers.google.com',
    links: [],
    discord: '',
    tier: 'Platinum',
    cardImage: { url: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&h=600&fit=crop' },
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png' },
    youtubeSlug: ''
  },
  {
    name: 'Microsoft',
    description: 'Empoderando a cada persona y organización del planeta para lograr más. Líderes en productividad y servicios en la nube.',
    slug: 'microsoft', 
    website: 'https://microsoft.com',
    callToAction: 'Ver oportunidades',
    callToActionLink: 'https://careers.microsoft.com',
    links: [],
    discord: '',
    tier: 'Platinum',
    cardImage: { url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop' },
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png' },
    youtubeSlug: ''
  },
  // Gold Tier
  {
    name: 'Amazon Web Services',
    description: 'La plataforma de servicios en la nube más adoptada y completa del mundo, ofreciendo más de 200 servicios integrales.',
    slug: 'aws',
    website: 'https://aws.amazon.com',
    callToAction: 'Únete al equipo',
    callToActionLink: 'https://amazon.jobs/aws',
    links: [],
    discord: '',
    tier: 'Gold',
    cardImage: { url: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&h=600&fit=crop' },
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png' },
    youtubeSlug: ''
  },
  {
    name: 'Meta',
    description: 'Construyendo tecnologías que ayudan a las personas a conectar, encontrar comunidades y hacer crecer los negocios.',
    slug: 'meta',
    website: 'https://meta.com',
    callToAction: 'Descubre más',
    callToActionLink: 'https://careers.meta.com',
    links: [],
    discord: '',
    tier: 'Gold',
    cardImage: { url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop' },
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png' },
    youtubeSlug: ''
  },
  {
    name: 'JetBrains',
    description: 'Herramientas esenciales para desarrolladores de software y equipos. Creadores de IntelliJ IDEA, PyCharm, y muchos más IDEs.',
    slug: 'jetbrains',
    website: 'https://jetbrains.com',
    callToAction: 'Prueba gratis',
    callToActionLink: 'https://jetbrains.com/products/',
    links: [],
    discord: '',
    tier: 'Gold',
    cardImage: { url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop' },
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/JetBrains_Logo_2016.svg/512px-JetBrains_Logo_2016.svg.png' },
    youtubeSlug: ''
  },
  // Silver Tier
  {
    name: 'GitHub',
    description: 'La plataforma de desarrollo colaborativo donde millones de desarrolladores crean, comparten y construyen software juntos.',
    slug: 'github',
    website: 'https://github.com',
    callToAction: 'Únete',
    callToActionLink: 'https://github.com/about/careers',
    links: [],
    discord: '',
    tier: 'Silver',
    cardImage: { url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&fit=crop' },
    logo: { url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
    youtubeSlug: ''
  },
  {
    name: 'Vercel',
    description: 'La plataforma frontend para desarrolladores, proporcionando velocidad y confiabilidad que los equipos necesitan para crear en la web.',
    slug: 'vercel',
    website: 'https://vercel.com',
    callToAction: 'Deploy ahora',
    callToActionLink: 'https://vercel.com/signup',
    links: [],
    discord: '',
    tier: 'Silver',
    cardImage: { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop' },
    logo: { url: 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png' },
    youtubeSlug: ''
  },
  {
    name: 'MongoDB',
    description: 'La base de datos para aplicaciones modernas. Potencia aplicaciones innovadoras con una plataforma de datos flexible.',
    slug: 'mongodb',
    website: 'https://mongodb.com',
    callToAction: 'Comienza gratis',
    callToActionLink: 'https://mongodb.com/cloud/atlas/register',
    links: [],
    discord: '',
    tier: 'Silver',
    cardImage: { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop' },
    logo: { url: 'https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png' },
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

  // Force use of sample data for testing
  const sponsorData = SAMPLE_SPONSORS;
  console.log('Partners page - CMS sponsors:', sponsors.length);
  console.log('Partners page - Sample sponsors:', SAMPLE_SPONSORS.length);
  console.log('Partners page - Using data:', sponsorData.length);

  return (
    <Page meta={meta}>
      <Layout>
        <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/confetti.svg')] opacity-5"></div>
            <div className="relative z-10 px-8 py-20">
              <div className="text-center mb-16">
                <h1 className="text-6xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl">
                  SPONSORS
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Las empresas que hacen posible DevFest Santiago 2025 ✨
                </p>
                
                <div className="flex justify-center gap-8 mt-12">
                  <a 
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 inline-block"
                    href="mailto:sponsors@gdg-sdc.org"
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Become a Sponsor
                    </span>
                  </a>
                  
                  <a 
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 inline-block"
                    href="/sponsorship-kit.pdf"
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-5 h-5 group-hover:bounce" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                      </svg>
                      Sponsorship Kit
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative -mt-20">
            <div className="bg-black/20 backdrop-blur-sm rounded-t-[40px] pt-12">
              <SponsorsGrid sponsors={sponsorData} />
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