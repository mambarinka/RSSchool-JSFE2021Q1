import React, { FunctionComponent, PropsWithChildren, useCallback, useState } from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import { playAudio } from '@/helpers/utils';
import styles from './Card-item.scss';
import { ICardListProps } from '../CardList';

export interface ICardItemProps {
  category: string;
  translate: string;
  currentAudioCard?: PropsWithChildren<ICardListProps>;
}

export const CardItem: FunctionComponent<ICardItemProps> = ({ category, translate, currentAudioCard }) => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  const path = window.location.pathname.slice(1);
  const [translateClassCard, changeTranslateClassCard] = useState(false);

  const onClickButtonFlip = useCallback(() => {
    changeTranslateClassCard(!translateClassCard);
  }, [translateClassCard]);

  const onMouseLeave = useCallback(() => {
    if (translateClassCard) {
      changeTranslateClassCard(!translateClassCard);
    }
  }, [translateClassCard]);

  const onClickFrontCard = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event!.currentTarget) {
      if (!isPlayMode) {
        event.preventDefault();
        playAudio(path, category);
      } else {
        event.preventDefault();
        if (category !== currentAudioCard?.currentCard) {
          playAudio(null, null, false);
        } else {
          playAudio(null, null, true);
        }
      }
    }
  };

  return (
    <li
      className={cn(styles.cardItem, isPlayMode ? styles.playMode : null, translateClassCard ? styles.translate : null)}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.front} onClick={(event) => onClickFrontCard(event)}>
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
