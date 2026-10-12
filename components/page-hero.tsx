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

import React from 'react';

type Props = {
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
};

// Cabecera común de las páginas interiores: título, entradilla y acciones
export default function PageHero({ title, description, children }: Props) {
  return (
    <header className="px-6 pt-12 pb-10 text-center md:pt-16 md:pb-14">
      <h1 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
          {description}
        </p>
      )}
      {children && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">{children}</div>
      )}
    </header>
  );
}
