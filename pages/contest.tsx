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
    title: 'Concurso',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Condiciones Legales de Participación en el Concurso #DevFestSdC" description="¡Participa en el concurso #DevFestSdC de Google Developers Group Santiago de Compostela! Simplemente comparte una foto en tu perfil de Instagram, Twitter o LinkedIn que capture tu experiencia en el DevFest Santiago de Compostela 2025, usando el hashtag #DevFestSdC. También puedes subir la foto a tus historias en Instagram. ¡Sé creativo! Entre las mejores fotos, sortearemos tres licencias de 1 año para los IDE de JetBrains. Asegúrate de revisar las condiciones legales para participar. ¡Buena suerte a todos los participantes!" />

        <div className="container md:mx-auto my-8 p-8 shadow-md border rounded-lg border-white">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Elegibilidad:</h2>
            <ul className="list-disc pl-6">
              <li>El concurso está abierto a cualquier individuo mayor de 18 años al momento de la participación, registrado en el evento y con el check-in realizado.</li>
              <li>Los miembros de GDG Santiago de Compostela, así como sus familiares directos, no son elegibles para participar.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Duración del Concurso:</h2>
            <ul className="list-disc pl-6">
              <li>El concurso comenzará con la apertura del DevFest Santiago de Compostela 2025 y finalizará con su cierre.</li>
              <li>Las participaciones enviadas fuera de este período podrán no ser consideradas.</li>
              <li>El fallo del concurso podrá ser realizado de forma posterior al cierre del plazo de participación.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Cómo Participar:</h2>
            <ul className="list-disc pl-6">
              <li>Los participantes deben publicar una foto en su perfil personal en Instagram, Twitter o LinkedIn con el hashtag #DevFestSdC.</li>
              <li>En Instagram, también se aceptarán publicaciones en las historias (stories).</li>
              <li>La foto debe reflejar la experiencia del participante en el DevFest Santiago de Compostela 2025.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Premios:</h2>
            <ul className="list-disc pl-6">
              <li>Se sortearán tres licencias de 1 año para los IDE de JetBrains entre las mejores fotos seleccionadas por GDG Santiago de Compostela.</li>
              <li>Los premios son intransferibles y no pueden ser canjeados por su valor en efectivo u otro premio.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Selección de Ganadores:</h2>
            <ul className="list-disc pl-6">
              <li>Los ganadores serán seleccionados de manera subjetiva por el equipo organizador de GDG Santiago de Compostela.</li>
              <li>La decisión del equipo organizador es final y vinculante.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Notificación de Ganadores:</h2>
            <ul className="list-disc pl-6">
              <li>Los ganadores serán notificados a través de mensaje directo en la red social donde hayan realizado la participación.</li>
              <li>Los ganadores deberán responder dentro de 3 días para reclamar su premio. En caso contrario, se seleccionará a un nuevo ganador.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Responsabilidades del Participante:</h2>
            <ul className="list-disc pl-6">
              <li>Al participar, los usuarios garantizan que la foto es de su autoría y que tienen todos los derechos necesarios para compartirla.</li>
              <li>No se permiten contenidos ofensivos, inapropiados o que infrinjan derechos de terceros.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Descargo de Responsabilidad:</h2>
            <ul className="list-disc pl-6">
              <li>GDG Santiago de Compostela y sus socios no se hacen responsables de problemas técnicos, pérdida de datos, o cualquier otro inconveniente que pueda surgir durante la participación o la entrega de premios.</li>
              <li>Las licencias de JetBrains son proporcionadas por el partner y cualquier problema relacionado con las mismas debe ser tratado directamente con JetBrains.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Modificación o Cancelación del Concurso:</h2>
            <p>GDG Santiago de Compostela se reserva el derecho de modificar, suspender o cancelar el concurso en cualquier momento sin previo aviso.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">10. Aceptación de las Condiciones:</h2>
            <p>La participación en el concurso implica la aceptación total de estas condiciones legales.</p>
          </section>
        </div>
      </Layout>
    </Page>
  );
}
