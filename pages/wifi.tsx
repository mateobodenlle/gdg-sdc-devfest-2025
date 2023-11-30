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
import JobsGrid from '@components/jobs-grid';
import Layout from '@components/layout';
import Header from '@components/header';

import { getAllJobs } from '@lib/cms-api';
import { Job } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';

type Props = {
  jobs: Job[];
};

export default function Jobs({ jobs }: Props) {
  const meta = {
    title: 'WiFi',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Datos de acceso a la red WiFi" description="Conéctate a la red de acceso abierto del evento!" />

        <div className="container md:mx-auto my-8 p-8 shadow-md border rounded-lg border-white">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">SSID: Devfest2023</h2>
            <h2 className="text-xl font-semibold mb-4">Login: Devfest2023</h2>
            <h2 className="text-xl font-semibold mb-4">Password: Mp7rAwL3*5j=</h2>
          </section>
        </div>
      </Layout>
    </Page>
  );
}
