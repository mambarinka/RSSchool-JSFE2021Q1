import React from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import { CardList } from '@/components/CardList';
import styles from './Body-parts.scss';

export const BodyParts: () => JSX.Element = () => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  return (
    <main className={cn(styles.pageBodyParts, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageBodyPartsTitle}>Body parts</h1>
      <CardList />
    </main>
  );
};
