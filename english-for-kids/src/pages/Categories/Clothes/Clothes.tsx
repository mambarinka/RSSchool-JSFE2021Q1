import React from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import { CardList } from '@/components/CardList';
import styles from './Clothes.scss';

export const Clothes: () => JSX.Element = () => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  return (
    <main className={cn(styles.pageClothes, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageClothesTitle}>Clothes</h1>
      <CardList />
    </main>
  );
};
