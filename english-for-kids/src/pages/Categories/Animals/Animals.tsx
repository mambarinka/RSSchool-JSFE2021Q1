import { CategoryList } from '@/components/CategoryList';
import React from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import { CardList } from '@/components/CardList';
import styles from './Animals.scss';

export const Animals: () => JSX.Element = () => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  return (
    <main className={cn(styles.pageAnimals, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageAnimalsTitle}>Animals</h1>
      <CardList />
    </main>
  );
};
