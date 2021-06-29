import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { CardList } from '@/components/CardList';
import { Category, mainSelector } from '@/pages/Main/reducer';
import { playAudio } from '@/helpers/utils';
import styles from './Animals.scss';

export const Animals: () => JSX.Element = () => {
  const { categories } = useSelector(mainSelector);
  const arrayCategory: Category[] = Object.values(categories);
  const path = window.location.pathname.slice(1);
  const result = arrayCategory.filter((categoryItem) => categoryItem.value === `${path}`);
  const shuffleArray = result[0].shuffleCards;

  const { isPlayMode } = useSelector(appHeaderViewSelector);
  const [openClassButtonStart, changeOpenClassButtonStart] = useState(false);
  const [openClassOverlay, changeOpenClassOverlay] = useState(false);

  const onclickButtonStart = useCallback(() => {
    changeOpenClassButtonStart(!openClassButtonStart);
    changeOpenClassOverlay(!openClassOverlay);

    const srcValue = `../audio/cards/${path}/${shuffleArray[0]}.mp3`;
    playAudio(srcValue);
    shuffleArray.splice(0, 1);
  }, [openClassButtonStart, openClassOverlay]);

  console.log(result);

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
