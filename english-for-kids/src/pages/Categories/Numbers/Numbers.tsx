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
import { useHistory } from 'react-router-dom';
import styles from './Numbers.scss';

export const Numbers: () => JSX.Element = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(mainSelector);
  const arrayCategory: Category[] = Object.values(categories);
  const path = window.location.pathname.slice(1);
  const result = arrayCategory.filter((categoryItem) => categoryItem.value === `${path}`);
  const shuffleArray = result[0].shuffleCards;
  const { arrayStars } = useSelector(mainSelector);
  const history = useHistory();

  const { isPlayMode } = useSelector(appHeaderViewSelector);
  const [openClassButtonStart, setOpenClassButtonStart] = useState(false);
  const [openClassOverlay, setOpenClassOverlay] = useState(true);
  const [openClassPointStarsBlock, setOpenClassPointStarsBlock] = useState(true);
  const [isWin, setIsWin] = useState(false);
  const audio = new Audio();
  audio.currentTime = 0;

  useEffect(() => {
    if (openClassButtonStart) {
      setOpenClassButtonStart((openClass) => !openClass);
      setOpenClassOverlay((openClass) => !openClass);
    }
  }, [isPlayMode, path]);

  useEffect(() => {
    dispatch(clearArrayStars());
  }, [dispatch, clearArrayStars]);

  const arrayFilterStars = arrayStars.filter((item) => item === true);
  const errors = arrayStars.filter((item) => item === false).length;

  useEffect(() => {
    console.log(errors);
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
      }, 5000);
    }
  }, [arrayStars]);

  const ButtonStartHandler = useCallback(() => {
    setOpenClassOverlay((openClass) => !openClass);
    setOpenClassButtonStart((openClass) => !openClass);
    setOpenClassPointStarsBlock((openClass) => !openClass);
    playAudio(true, path, shuffleArray[0]);
  }, [openClassOverlay]);

  return (
    <main className={cn(styles.pageNumbers, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageNumbersTitle}>Numbers</h1>
      <PointStarsBlock path={path} isInitialState={openClassPointStarsBlock} />
      <CardList />
      <button
        className={cn(styles.pageNumbersButtonStart, !isPlayMode ? null : openClassButtonStart ? null : styles.open)}
        onClick={ButtonStartHandler}
      ></button>
      <button
        className={cn(styles.pageNumbersButtonRepeat, !isPlayMode ? null : openClassButtonStart ? styles.repeat : null)}
        onClick={() => playAudio(isPlayMode, path, shuffleArray[index])}
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
