import React, { FunctionComponent, useCallback, useState, useEffect } from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { playAudio } from '@/helpers/utils';
import { addStar } from '@/pages/Main/actions';
import { repeatArrayCards } from '@/pages/Statistics/Statistics';
import styles from './CardItemDifficult.scss';

export interface ICardItemDifficultProps {
  path: string;
  category: string;
  translate: string;
  arrshuffle: string[];
}

let currentAudio: string | null;

export let index = 0;

export const CardItemDifficult: FunctionComponent<ICardItemDifficultProps> = ({
  path,
  category,
  translate,
  arrshuffle,
}) => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  const dispatch = useDispatch();
  const [translateClassCard, setTranslateClassCard] = useState(false);

  const buttonFlipClickHandler = useCallback(() => {
    setTranslateClassCard(!translateClassCard);
  }, [translateClassCard]);

  const mouseLeaveHandler = useCallback(() => {
    if (translateClassCard) {
      setTranslateClassCard(!translateClassCard);
    }
  }, [translateClassCard]);

  const [isChecked, setObjCardsChecked] = useState(false);

  useEffect(() => {
    index = 0;
  }, []);

  useEffect(() => {
    setObjCardsChecked(false);
  }, [isPlayMode]);

  const frontCardClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    currentAudio = arrshuffle[index];
    if (event!.currentTarget) {
      if (!isPlayMode) {
        playAudio(isPlayMode, path, category);
      } else if (isPlayMode) {
        if (!isChecked) {
          if (category !== currentAudio) {
            dispatch(addStar(isChecked));
            setObjCardsChecked(false);
            if (index < arrshuffle.length) {
              playAudio(isPlayMode, null, null, false);
            }
          } else {
            playAudio(isPlayMode, null, null, true);
            dispatch(addStar(!isChecked));
            index++;
            setObjCardsChecked(true);
            if (index < arrshuffle.length) {
              const pathNext = repeatArrayCards.find((item, i) => item.value === arrshuffle[index]);
              playAudio(isPlayMode, pathNext.name, arrshuffle[index]);
            }
          }
        }
      }
    }
  };

  return (
    <li
      className={cn(
        styles.cardItem,
        isChecked ? styles.checked : null,
        isPlayMode ? styles.playMode : null,
        translateClassCard ? styles.translate : null
      )}
      onMouseLeave={mouseLeaveHandler}
    >
      <div className={cn(styles.front)} onClick={(event) => frontCardClickHandler(event)}>
        <img src={`./images/cards/${path}/${category}.png`} alt={`${category} category`} />
        <span className={styles.cardName}>{category}</span>
      </div>

      <div className={styles.back}>
        <img src={`./images/cards/${path}/${category}.png`} alt={`${category} category`} />
        <span className={styles.cardName}>{translate}</span>
      </div>

      <button type="button" className={styles.cardButtonFlip} onClick={buttonFlipClickHandler}></button>
    </li>
  );
};
