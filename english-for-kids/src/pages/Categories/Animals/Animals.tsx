import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { CardList } from '@/components/CardList';
import styles from './Animals.scss';

export const Animals: () => JSX.Element = () => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);

  const [openClassButtonStart, changeOpenClassButtonStart] = useState(false);
  const [openClassOverlay, changeOpenClassOverlay] = useState(false);

  const onclickButtonStart = useCallback(() => {
    changeOpenClassButtonStart(!openClassButtonStart);
    changeOpenClassOverlay(!openClassOverlay);
  }, [openClassButtonStart, openClassOverlay]);

  console.log(isPlayMode);
  return (
    <main className={cn(styles.pageAnimals, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageAnimalsTitle}>Animals</h1>
      <CardList />
      <button
        className={cn(styles.pageAnimalsButtonStart, !isPlayMode ? null : openClassButtonStart ? null : styles.open)}
        onClick={onclickButtonStart}
      ></button>
      <div className={cn(styles.overlay, !isPlayMode ? null : openClassOverlay ? null : styles.overlayOpen)}></div>
    </main>
  );
};
