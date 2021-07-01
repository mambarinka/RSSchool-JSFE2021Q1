import React, { useCallback, useState, useEffect } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { CardList } from '@/components/CardList';
import { Category, mainSelector } from '@/pages/Main/reducer';
import { playAudio } from '@/helpers/utils';
import { index } from '@/components/CardList/CardItem/Card-item';
import styles from './Animals.scss';

let isStartNewGame = false;

export const Animals: () => JSX.Element = () => {
  const { categories } = useSelector(mainSelector);
  const arrayCategory: Category[] = Object.values(categories);
  const path = window.location.pathname.slice(1);
  const result = arrayCategory.filter((categoryItem) => categoryItem.value === `${path}`);
  const shuffleArray = result[0].shuffleCards;

  const { isPlayMode } = useSelector(appHeaderViewSelector);
  const [openClassButtonStart, setOpenClassButtonStart] = useState(false);
  const [openClassOverlay, setOpenClassOverlay] = useState(false);

  useEffect(() => {
    if (isStartNewGame === false) {
      isStartNewGame = true;
      setOpenClassButtonStart(!openClassButtonStart);
      setOpenClassOverlay(!openClassOverlay);
    } else {
      isStartNewGame = false;
    }
  }, [isPlayMode]);

  const ButtonStartHandler = useCallback(() => {
    setOpenClassOverlay(!openClassOverlay);
    setOpenClassButtonStart(!openClassButtonStart);
    playAudio(true, path, shuffleArray[0]);
  }, [openClassButtonStart, openClassOverlay]);

  return (
    <main className={cn(styles.pageAnimals, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageAnimalsTitle}>Animals</h1>
      <CardList />
      <button
        className={cn(
          styles.pageAnimalsButtonStart,
          !isPlayMode ? null : openClassButtonStart ? styles.open : isStartNewGame ? styles.open : null
        )}
        onClick={ButtonStartHandler}
      ></button>
      <button
        className={cn(
          styles.pageAnimalsButtonRepeat,
          !isPlayMode ? null : openClassButtonStart ? null : isStartNewGame ? null : styles.repeat
        )}
        onClick={() => playAudio(isPlayMode, path, shuffleArray[index])}
      ></button>

      <div
        className={cn(
          styles.overlay,
          !isPlayMode ? null : openClassOverlay ? styles.overlayOpen : isStartNewGame ? styles.overlayOpen : null
        )}
      ></div>
    </main>
  );
};
