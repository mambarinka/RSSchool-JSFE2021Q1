import React from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import { CardList } from '@/components/CardList';
import styles from './Profession.scss';

export const Profession: () => JSX.Element = () => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  return (
    <main className={cn(styles.pageProfession, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageProfessionTitle}>Profession</h1>
      <CardList />
    </main>
  );
};
