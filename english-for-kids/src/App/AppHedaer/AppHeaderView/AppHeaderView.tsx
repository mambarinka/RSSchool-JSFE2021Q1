import { Menu } from '@/components/Menu';
import { Switch } from '@/components/Switсh';
import { Toggle } from '@/components/Toggle';
import React from 'react';
import cn from 'classnames';

import styles from './AppHeaderView.scss';

export const AppHeaderView = () => {
  return (
    <header className={styles.pageHeader}>
      <div className={styles['page-header__wrapper']}>
        <nav className={styles['page-header__navigation']}>
          <Toggle/>
          <Menu/>
        </nav>
        <Switch htmlType='checkbox' id='switch__input' tabindex={0} />
        <a href="#/statistics" className={cn(styles.pageHeaderLink, styles.button)}>stats</a>
      </div>
    </header>
  );
};