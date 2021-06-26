import { CategoryList } from '@/components/CategoryList';
import React from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import styles from './Fruits.scss';

export const Fruits: () => JSX.Element = () => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);

  return (
    <main className={cn(styles.pageFruits, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageFruitsTitle}>Fruits</h1>
      <CategoryList />
    </main>
  );
};
