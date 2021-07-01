import React, { FunctionComponent, useEffect, useCallback, useState } from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import { playAudio } from '@/helpers/utils';
import { Category, mainSelector } from '@/pages/Main/reducer';
import styles from './Card-item.scss';

export interface ICardItemProps {
  category: string;
  translate: string;
}

interface CheckedCard {
  [key: string]: boolean;
}

let currentAudio: string | null;

export let index = 0;

export const CardItem: FunctionComponent<ICardItemProps> = ({ category, translate }) => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  const path = window.location.pathname.slice(1);
  const [translateClassCard, changeTranslateClassCard] = useState(false);
  const { categories } = useSelector(mainSelector);
  const arrayCategory: Category[] = Object.values(categories);
  const result = arrayCategory.filter((categoryItem) => categoryItem.value === `${path}`);
  const shuffleArray = result[0].shuffleCards;

  const onClickButtonFlip = useCallback(() => {
    changeTranslateClassCard(!translateClassCard);
  }, [translateClassCard]);

  const onMouseLeave = useCallback(() => {
    if (translateClassCard) {
      changeTranslateClassCard(!translateClassCard);
    }
  }, [translateClassCard]);

  const objCardsChecked = shuffleArray.reduce((acc: CheckedCard, item) => {
    acc[item] = false;
    return acc;
  }, {});

  const onClickFrontCard = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    currentAudio = shuffleArray[index];
    if (event!.currentTarget) {
      if (!isPlayMode) {
        event.preventDefault();
        playAudio(isPlayMode, path, category);
      } else if (isPlayMode) {
        if (!objCardsChecked[category]) {
          if (category !== currentAudio) {
            playAudio(isPlayMode, null, null, false);
          } else {
            playAudio(isPlayMode, null, null, true);
            index++;
            if (index < shuffleArray.length) {
              setTimeout(() => {
                playAudio(isPlayMode, path, shuffleArray[index]);
              }, 1000);
            }
            objCardsChecked[category] = true;
          }
        }
      }
    }
  };
  return (
    <li
      className={cn(
        styles.cardItem,
        { checked: objCardsChecked[category] === true },
        // objCardsChecked[category] ? styles.checked : null,
        isPlayMode ? styles.playMode : null,
        translateClassCard ? styles.translate : null
      )}
      onMouseLeave={onMouseLeave}
    >
      <div className={cn(styles.front)} onClick={(event) => onClickFrontCard(event)}>
        <img src={`./images/cards/${path}/${category}.png`} alt={`${category} category`} />
        <span className={styles.cardName}>{category}</span>
      </div>

      <div className={styles.back}>
        <img src={`./images/cards/${path}/${category}.png`} alt={`${category} category`} />
        <span className={styles.cardName}>{translate}</span>
      </div>

      <button type="button" className={styles.cardButtonFlip} onClick={onClickButtonFlip}></button>
    </li>
  );
};
