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

import cn from 'classnames';
import styleUtils from './utils.module.css';
import styles from './hero.module.css';
import { BRAND_NAME, DATE, SHORT_DATE, SITE_DESCRIPTION, SITE_NAME } from '@lib/constants';
import Logo from './logo';
import IconLogo from './icons/icon-logo';
import { GradientBackground } from './GradientBackground';

export default function Hero() {
  return (
    <div>
      <div className={cn(styles.wrapper)}>
        <h2
          className={cn(
            styleUtils.appear,
            styleUtils['appear-second'],
            styles.description
          ) + ' block md:hidden'}
        >
          {SITE_DESCRIPTION}
        </h2>
        <div className={cn(styleUtils.appear,
          styleUtils['appear-second'],
          styles.logo)}>
          <IconLogo />
        </div>
        <h1 className={cn(styleUtils.appear, styleUtils['appear-third'], /*styles.rainbow_text,*/ styles.hero)}>

          {/*<br className={styleUtils['show-on-desktop']} />*/}
          {SITE_NAME}
        </h1>
        <h2
          className={cn(
            styleUtils.appear,
            styleUtils['appear-third'],
            styles.description
          ) + ' hidden md:block'}
        >
          {SITE_DESCRIPTION}
        </h2>
        <div className={cn(styleUtils.appear, styleUtils['appear-fourth'], styles.info)}>
          <p className='block md:hidden text-center'>{SHORT_DATE}</p>
          <p className='hidden md:block text-center'>{DATE}</p>
        </div>
        <div className={cn(styleUtils.appear, styleUtils['appear-fourth'], styles.location)}>
          <p className='text-center px-8 normal-case'>
            <a className='block text-inherit' href='https://maps.app.goo.gl/GFdS8heX79PLecbj6'>Escuela Técnica Superior de Ingeniería, USC</a>
          </p>
        </div>
        <div className={cn(styleUtils.appear, styleUtils['appear-fifth'], styles.button_container)}>
          <a className={styles.button + " px-12"} href='https://gdg.community.dev/events/details/google-gdg-santiago-de-compostela-presents-devfest-santiago-de-compostela-2025/' target='_blank' rel='noopener noreferrer'>
            Reserva ya tu entrada
          </a>
        </div>
      </div>
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="fixed bottom-0 opacity-30 dark:opacity-10"
      />
    </div>
  );
}
