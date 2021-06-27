import React from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import { CardList } from '@/components/CardList';
import styles from './Colors.scss';

export const Colors: () => JSX.Element = () => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  return (
    <main className={cn(styles.pageColors, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageColorsTitle}>Colors</h1>
      <CardList />
    </main>
  );
};
