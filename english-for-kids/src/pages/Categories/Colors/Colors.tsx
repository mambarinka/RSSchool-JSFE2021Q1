import React, { useCallback, useState, useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { CardList } from '@/components/CardList';
import { Category, mainSelector } from '@/pages/Main/reducer';
import { playAudio } from '@/helpers/utils';
import { index } from '@/components/CardList/CardItem/Card-item';
import { PointStarsBlock } from '@/components/PointStarsBlock';
import { clearArrayStars } from '@/pages/Main/actions';
import styles from './Colors.scss';

export const Colors: () => JSX.Element = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(mainSelector);
  const arrayCategory: Category[] = Object.values(categories);
  const path = window.location.pathname.slice(1);
  const result = arrayCategory.filter((categoryItem) => categoryItem.value === `${path}`);
  const shuffleArray = result[0].shuffleCards;

  const { isPlayMode } = useSelector(appHeaderViewSelector);
  const [openClassButtonStart, setOpenClassButtonStart] = useState(false);
  const [openClassOverlay, setOpenClassOverlay] = useState(true);
  const [openClassPointStarsBlock, setOpenClassPointStarsBlock] = useState(true);

  useEffect(() => {
    if (openClassButtonStart) {
      setOpenClassButtonStart((openClass) => !openClass);
      setOpenClassOverlay((openClass) => !openClass);
    }
  }, [isPlayMode, path]);

  useEffect(() => {
    dispatch(clearArrayStars());
  }, [dispatch, clearArrayStars]);

  const ButtonStartHandler = useCallback(() => {
    console.log('isPlayMode', isPlayMode);
    setOpenClassOverlay((openClass) => !openClass);
    setOpenClassButtonStart((openClass) => !openClass);
    setOpenClassPointStarsBlock((openClass) => !openClass);
    playAudio(true, path, shuffleArray[0]);
  }, [openClassOverlay]);

  return (
    <main className={cn(styles.pageColors, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageColorsTitle}>Colors</h1>
      <PointStarsBlock path={path} isInitialState={openClassPointStarsBlock} />
      <CardList />
      <button
        className={cn(styles.pageColorsButtonStart, !isPlayMode ? null : openClassButtonStart ? null : styles.open)}
        onClick={ButtonStartHandler}
      ></button>
      <button
        className={cn(styles.pageColorsButtonRepeat, !isPlayMode ? null : openClassButtonStart ? styles.repeat : null)}
        onClick={() => playAudio(isPlayMode, path, shuffleArray[index])}
      ></button>

      <div className={cn(styles.overlay, !isPlayMode ? null : openClassOverlay ? styles.overlayOpen : null)}></div>
    </main>
  );
};
