import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { CardList } from '@/components/CardList';
import styles from './Fruits.scss';

export const Fruits: () => JSX.Element = () => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  const [openClassButtonStart, changeOpenClassButtonStart] = useState(false);
  const [openClassOverlay, changeOpenClassOverlay] = useState(false);

  const onclickButtonStart = useCallback(() => {
    changeOpenClassButtonStart(!openClassButtonStart);
    changeOpenClassOverlay(!openClassOverlay);
  }, [openClassButtonStart, openClassOverlay]);
  return (
    <main className={cn(styles.pageFruits, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageFruitsTitle}>Fruits</h1>
      <CardList />
      <button
        className={cn(styles.pageFruitsButtonStart, !isPlayMode ? null : openClassButtonStart ? null : styles.open)}
        onClick={onclickButtonStart}
      ></button>
      <div className={cn(styles.overlay, !isPlayMode ? null : openClassOverlay ? null : styles.overlayOpen)}></div>
    </main>
  );
};
