import React, { FunctionComponent, useCallback, useState, useEffect } from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { playAudio } from '@/helpers/utils';
import { Category, mainSelector } from '@/pages/Main/reducer';
import {
  setCorrectPercent,
  updateErrorClicks,
  updateSuccessClicks,
  updateTrainClicks,
} from '@/pages/Statistics/actions';
import { addStar } from '@/pages/Main/actions';
import { baseURL } from '@/api/api';
import styles from './Card-item.scss';

export interface ICardItemProps {
  id: string;
  categoryId: string;
  textRu: string;
  textEn: string;
  linkSound: string;
  linkImage: string;
}

let currentAudio: string | null;

export let index = 0;

export const CardItem: FunctionComponent<ICardItemProps> = ({
  id,
  categoryId,
  textRu,
  textEn,
  linkSound,
  linkImage,
}) => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  const dispatch = useDispatch();
  const path = window.location.pathname.slice(1);
  const [translateClassCard, setTranslateClassCard] = useState(false);
  // const { categories } = useSelector(mainSelector);
  // const arrayCategory: Category[] = Object.values(categories);
  // const result = arrayCategory.filter((categoryItem) => categoryItem.value === `${path}`);
  // const shuffleArray = result[0].shuffleCards;

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
  }, [path]);

  useEffect(() => {
    setObjCardsChecked(false);
  }, [isPlayMode]);

  const frontCardClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // currentAudio = shuffleArray[index];
    // if (event!.currentTarget) {
    //   if (!isPlayMode) {
    //     playAudio(isPlayMode, path, category);
    //     dispatch(updateTrainClicks(path, category));
    //   } else if (isPlayMode) {
    //     if (!isChecked) {
    //       if (category !== currentAudio) {
    //         dispatch(addStar(isChecked));
    //         setObjCardsChecked(false);
    //         dispatch(updateErrorClicks(path, category));
    //         if (index < shuffleArray.length) {
    //           playAudio(isPlayMode, null, null, false);
    //         }
    //       } else {
    //         playAudio(isPlayMode, null, null, true);
    //         dispatch(updateSuccessClicks(path, category));
    //         dispatch(addStar(!isChecked));
    //         index++;
    //         setObjCardsChecked(true);
    //         if (index < shuffleArray.length) {
    //           playAudio(isPlayMode, path, shuffleArray[index]);
    //         }
    //       }
    //     }
    //   }
    // }
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
        <img src={`${baseURL}${linkImage}`} alt={`${textRu} card`} />
        <span className={styles.cardName}>{textRu}</span>
      </div>

      <div className={styles.back}>
        <img src={linkImage} alt={`${textEn} category`} />
        <span className={styles.cardName}>{textEn}</span>
      </div>

      <button type="button" className={styles.cardButtonFlip} onClick={buttonFlipClickHandler}></button>
    </li>
  );
};
