import { CategoryList } from '@/components/CategoryList';
import React from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import { CardList } from '@/components/CardList';
import styles from './Fruits.scss';

export const Fruits: () => JSX.Element = () => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  const path = window.location.pathname.slice(1);
  console.log(path);
  return (
    <main className={cn(styles.pageFruits, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageFruitsTitle}>Fruits</h1>
      <CardList />
    </main>
  );
};
