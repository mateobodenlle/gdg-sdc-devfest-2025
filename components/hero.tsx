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
import { BRAND_NAME, DATE, SHORT_DATE, SITE_DESCRIPTION } from '@lib/constants';
import Logo from './logo';
import IconLogo from './icons/icon-logo';

export default function Hero() {
  return (
    <div className={styles.wrapper}>
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils['appear-second'],
          styleUtils['show-on-mobile'],
          styles.description
        )}
      >
        {SITE_DESCRIPTION}
      </h2>
      <div className={cn(styleUtils.appear,
        styleUtils['appear-second'],
        styles.logo)}>
        <IconLogo />
      </div>
      <h1 className={cn(styleUtils.appear, styleUtils['appear-third'], styles.hero)}>

        {/*<br className={styleUtils['show-on-desktop']} />*/}
        {BRAND_NAME}
      </h1>
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils['appear-third'],
          styleUtils['show-on-tablet'],
          styles.description
        )}
      >
        {SITE_DESCRIPTION}
      </h2>
      <div className={cn(styleUtils.appear, styleUtils['appear-fourth'], styles.info)}>
        <p className='hidden md:block text-right'>{DATE}</p>
        <p className='block md:hidden text-right'>{SHORT_DATE}</p>
        <div className={styles['description-separator']} />
        <p>
          <strong>Presencial</strong>
        </p>
      </div>
    </div>
  );
}
