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
    title: 'Información Legal',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Información Legal del DevFest Santiago de Compostela 2025" description="En esta página encontrarás información legal sobre el DevFest Santiago de Compostela 2025." />

        {/*
  Derechos de uso de imagen.
  Esta sección es importante, ya que se trata de un evento público y se van a tomar fotos y vídeos durante el mismo. Es importante que los asistentes sepan que pueden aparecer en fotos y vídeos que se van a publicar en Internet.
  */}
        <div className="m-8 shadow-md border rounded-lg border-white">

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Derechos de uso de imagen</h2>
            <p className="mb-4">
              En el marco del DevFest Santiago de Compostela 2025, nos gustaría informarte sobre los derechos de uso de imagen. Como evento público centrado en la tecnología, es probable que se capturen imágenes, fotografías y videos durante las diversas actividades y conferencias programadas. Queremos asegurarte que estos medios visuales pueden ser utilizados con propósitos promocionales y educativos, tanto durante el evento como en publicaciones posteriores en diversos canales en línea.
            </p>
            <p className="mb-4">
              1.1 Todos los asistentes al DevFest Santiago de Compostela 2025 comprenden y aceptan que las imágenes capturadas durante el evento pueden incluir sus rostros, atuendos y participación en actividades.
            </p>
            <p className="mb-4">
              1.2 Los organizadores del evento, GDG Santiago de Compostela, se reservan el derecho de utilizar estas imágenes con fines promocionales, publicitarios y educativos, ya sea en línea o fuera de línea, sin requerir consentimiento adicional.
            </p>
            <p className="mb-4">
              1.3 Cualquier objeción a la inclusión de la imagen de un asistente puede ser comunicada a la organización por escrito antes del evento.
            </p>
            <p className="mb-4">
              1.4 Al participar en el DevFest Santiago de Compostela 2025, los asistentes renuncian a cualquier reclamación por derechos de privacidad relacionados con la captura y uso de sus imágenes.
            </p>
            <p className="mb-4">
              1.5 La organización se compromete a manejar las imágenes con la debida sensibilidad y respeto a la privacidad de los asistentes, evitando cualquier uso indebido o difamatorio.
            </p>
          </section>

          {/*
  Política de privacidad
  */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Política de Privacidad</h2>
            <p className="mb-4">
              En GDG Santiago de Compostela, organizadores del DevFest Santiago de Compostela 2025, estamos comprometidos con la protección de tu privacidad. Esta política de privacidad detalla cómo recopilamos, usamos, divulgamos y protegemos la información personal que puedas proporcionarnos durante el evento y en relación con él.
            </p>
            <h3 className="text-lg font-semibold mb-4">1. Recopilación de Información</h3>
            <p className="mb-4">
              1.1 Durante el registro para el DevFest, solicitaremos cierta información personal, como tu nombre, dirección de correo electrónico y detalles de contacto. Esta información se utiliza para gestionar tu participación en el evento y enviarte comunicaciones relacionadas.
            </p>
            <p className="mb-4">
              1.2 También recopilamos datos de forma automática a través del uso de cookies y tecnologías similares en nuestro sitio web. Esto incluye información sobre tu dispositivo, tu navegador y tu comportamiento de navegación.
            </p>
            <p className="mb-4">
              1.3 Toda la información recopilada se trata con confidencialidad y se utiliza únicamente con el propósito de mejorar tu experiencia en el DevFest Santiago de Compostela 2025.
            </p>
            <h3 className="text-lg font-semibold mb-4">2. Uso de la Información</h3>
            <p className="mb-4">
              2.1 La información proporcionada durante el registro se utiliza para administrar tu participación en el evento, incluido el envío de detalles logísticos, actualizaciones y materiales relevantes.
            </p>
            <p className="mb-4">
              2.2 Los datos recopilados automáticamente se utilizan para mejorar nuestro sitio web, comprender las tendencias de los visitantes y personalizar la experiencia en línea.
            </p>
            <p className="mb-4">
              2.3 No compartiremos tu información personal con terceros sin tu consentimiento expreso, excepto cuando sea necesario para cumplir con obligaciones legales.
            </p>
            <h3 className="text-lg font-semibold mb-4">3. Seguridad de la Información</h3>
            <p className="mb-4">
              3.1 Implementamos medidas de seguridad para proteger la información personal recopilada, tanto en línea como fuera de línea, contra accesos no autorizados, pérdida, uso indebido o divulgación.
            </p>
            <p className="mb-4">
              3.2 Aunque hacemos todo lo posible para garantizar la seguridad de tus datos, no podemos garantizar la seguridad completa debido a la naturaleza de las transmisiones por Internet.
            </p>
            <h3 className="text-lg font-semibold mb-4">4. Actualizaciones de la Política</h3>
            <p className="mb-4">
              4.1 Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Las actualizaciones serán publicadas en nuestro sitio web y se te notificará por correo electrónico si hay cambios significativos.
            </p>
          </section>

          {/*
  Política de cookies
  */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Política de Cookies</h2>
            <p className="mb-4">


              La Política de Cookies del DevFest Santiago de Compostela 2025 describe cómo utilizamos las cookies y tecnologías similares en nuestro sitio web. Al utilizar nuestro sitio, aceptas el uso de cookies de acuerdo con esta política.
            </p>
            <h3 className="text-lg font-semibold mb-4">1. ¿Qué son las cookies?</h3>
            <p className="mb-4">
              1.1 Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. Estos archivos contienen información que se utiliza para mejorar tu experiencia de navegación y personalizar el contenido.
            </p>
            <h3 className="text-lg font-semibold mb-4">2. Tipos de Cookies</h3>
            <p className="mb-4">
              2.1 Utilizamos cookies esenciales para el funcionamiento del sitio y cookies analíticas para recopilar datos sobre el uso del sitio, ayudándonos a mejorar y personalizar la experiencia del usuario.
            </p>
            <p className="mb-4">
              2.2 También utilizamos cookies de terceros para integrar contenido de plataformas externas, como redes sociales, y para proporcionar funciones adicionales.
            </p>
            <h3 className="text-lg font-semibold mb-4">3. Control de Cookies</h3>
            <p className="mb-4">
              3.1 Puedes controlar y gestionar las cookies a través de la configuración de tu navegador. Sin embargo, deshabilitar ciertas cookies puede afectar la funcionalidad del sitio.
            </p>
            <p className="mb-4">
              3.2 Al continuar utilizando nuestro sitio sin cambiar la configuración de cookies, aceptas nuestro uso de cookies de acuerdo con esta política.
            </p>
          </section>

          {/*
  Descargo de responsabilidad
  */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Descargo de Responsabilidad</h2>
            <p className="mb-4">
              El DevFest Santiago de Compostela 2025, organizado por GDG Santiago de Compostela, se ofrece "tal cual" y "según disponibilidad". Nos esforzamos por proporcionar información precisa y actualizada, pero no garantizamos la precisión, integridad o idoneidad de la información y materiales ofrecidos en el evento para ningún propósito particular.
            </p>
            <p className="mb-4">
              Nos reservamos el derecho de realizar cambios en la programación, contenido y detalles logísticos del evento en cualquier momento sin previo aviso. Los asistentes asumen la responsabilidad de verificar la información actualizada en nuestro sitio web y comunicados oficiales.
            </p>
            <p className="mb-4">
              GDG Santiago de Compostela no será responsable de ningún daño directo, indirecto, incidental, consecuente o punitivo resultante de la participación en el DevFest Santiago de Compostela 2025, incluyendo pero no limitado a pérdida de datos, interrupciones de servicio o daños a la propiedad.
            </p>
            <p className="mb-4">
              Al registrarte y participar en el evento, aceptas liberar de responsabilidad a GDG Santiago de Compostela y a sus afiliados, patrocinadores, colaboradores y organizadores de cualquier reclamación o demanda relacionada con tu participación en el DevFest Santiago de Compostela 2025.
            </p>
            <p className="mb-4">
              Este descargo de responsabilidad se aplica a toda la información proporcionada en el evento, ya sea presentada por GDG Santiago de Compostela o por terceros.
            </p>
          </section>

        </div>
      </Layout>
    </Page>
  );
}
