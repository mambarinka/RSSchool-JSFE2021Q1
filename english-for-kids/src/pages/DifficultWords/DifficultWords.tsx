import React, { useCallback, useState, useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { mainSelector } from '@/pages/Main/reducer';
import { playAudio } from '@/helpers/utils';
import { PointStarsBlock } from '@/components/PointStarsBlock';
import { clearArrayStars } from '@/pages/Main/actions';
import { useHistory } from 'react-router-dom';
import { CardItemDifficult } from '@/components/CardList/CardItemDifficult';
import { index } from '@/components/CardList/CardItemDifficult/CardItemDifficult';
import styles from './DifficultWords.scss';
import { repeatArrayCards } from '../Statistics/Statistics';

export const DifficultWords: () => JSX.Element = () => {
  const arrayValuesShuffle: string[] = [];
  const dispatch = useDispatch();

  const { arrayStars } = useSelector(mainSelector);
  const history = useHistory();

  const { isPlayMode } = useSelector(appHeaderViewSelector);
  const [openClassButtonStart, setOpenClassButtonStart] = useState(false);
  const [openClassOverlay, setOpenClassOverlay] = useState(true);
  const [openClassPointStarsBlock, setOpenClassPointStarsBlock] = useState(true);
  const [isWin, setIsWin] = useState(false);
  const audio = new Audio();
  audio.currentTime = 0;
  repeatArrayCards.map((categoryItem) => arrayValuesShuffle.push(categoryItem.value));
  useEffect(() => {
    if (openClassButtonStart) {
      setOpenClassButtonStart((openClass) => !openClass);
      setOpenClassOverlay((openClass) => !openClass);
    }
  }, [isPlayMode]);

  useEffect(() => {
    dispatch(clearArrayStars());
  }, [dispatch, clearArrayStars]);

  const arrayFilterStars = arrayStars.filter((item) => item === true);
  const errors = arrayStars.filter((item) => item === false).length;

  useEffect(() => {
    if (arrayFilterStars.length === 8) {
      if (errors === 0) {
        setIsWin(!isWin);
        audio.src = '../audio/win.mp3';
      } else {
        setIsWin(isWin);
        audio.src = '../audio/lose.mp3';
      }
      audio.play();
      setTimeout(() => {
        dispatch(clearArrayStars());
        history.push('main');
      }, 4000);
    }
  }, [arrayStars]);

  const categoryValue = repeatArrayCards.find((item) => item.value === arrayValuesShuffle[0]);
  console.log('arrayValuesShuffle71', arrayValuesShuffle);
  const ButtonStartHandler = useCallback(() => {
    setOpenClassOverlay((openClass) => !openClass);
    setOpenClassButtonStart((openClass) => !openClass);
    setOpenClassPointStarsBlock((openClass) => !openClass);
    if (categoryValue) {
      playAudio(true, categoryValue.name, arrayValuesShuffle[0]);
    }
  }, [openClassOverlay, repeatArrayCards, arrayValuesShuffle]);

  const ButtonRepeatHandler = useCallback(() => {
    const currentPath = repeatArrayCards.find((item) => item.value === arrayValuesShuffle[index]);
    if (categoryValue) {
      playAudio(isPlayMode, currentPath.name, arrayValuesShuffle[index]);
    }
  }, [repeatArrayCards, arrayValuesShuffle]);

  return (
    <main className={cn(styles.pageDifficultWords, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageDifficultWordsTitle}>Difficult Words</h1>
      <PointStarsBlock isInitialState={openClassPointStarsBlock} />
      <ul className={cn(styles.cardList)} key={666}>
        {repeatArrayCards.map((categoryItem) => (
          <CardItemDifficult
            path={categoryItem.name}
            category={categoryItem.value}
            translate={categoryItem.translate}
            arrshuffle={arrayValuesShuffle}
          />
        ))}
      </ul>
      <button
        className={cn(
          styles.pageDifficultWordsButtonStart,
          !isPlayMode ? null : openClassButtonStart ? null : styles.open
        )}
        onClick={ButtonStartHandler}
      ></button>
      <button
        className={cn(
          styles.pageDifficultWordsButtonRepeat,
          !isPlayMode ? null : openClassButtonStart ? styles.repeat : null
        )}
        onClick={ButtonRepeatHandler}
      ></button>

      <div className={cn(styles.overlay, !isPlayMode ? null : openClassOverlay ? styles.overlayOpen : null)}></div>
      <div className={cn(arrayFilterStars.length === 8 ? styles.gameIsOver : null)}>
        <img
          className={cn(arrayFilterStars.length === 8 ? (!isWin ? styles.openImage : styles.hide) : styles.hide)}
          src={'./images/lose.png'}
        />
        <p className={cn(arrayFilterStars.length === 8 ? (!isWin ? styles.gameIsOverText : styles.hide) : styles.hide)}>
          O no...
        </p>
        <p className={cn(arrayFilterStars.length === 8 ? (!isWin ? styles.gameIsOverText : styles.hide) : styles.hide)}>
          You had {errors} errors...
        </p>
        <img
          className={cn(arrayFilterStars.length === 8 ? (isWin ? styles.openImage : styles.hide) : styles.hide)}
          src={'./images/win.png'}
        />
        <p className={cn(arrayFilterStars.length === 8 ? (isWin ? styles.gameIsOverText : styles.hide) : styles.hide)}>
          Congratulations! You won!!!
        </p>
      </div>
    </main>
  );
};
