import React from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import { CardList } from '@/components/CardList';
import styles from './Emotion.scss';

export const Emotion: () => JSX.Element = () => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  return (
    <main className={cn(styles.pageEmotion, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageEmotionTitle}>Emotion</h1>
      <CardList />
    </main>
  );
};
