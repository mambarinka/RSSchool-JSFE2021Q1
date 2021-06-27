import React from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import { CardList } from '@/components/CardList';
import styles from './Numbers.scss';

export const Numbers: () => JSX.Element = () => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  return (
    <main className={cn(styles.pageNumbers, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageNumbersTitle}>Numbers</h1>
      <CardList />
    </main>
  );
};
