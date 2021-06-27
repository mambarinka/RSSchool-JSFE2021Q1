import React, { FunctionComponent, useCallback, useState } from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import styles from './Card-item.scss';

export interface ICardItemProps {
  category: string;
  translate: string;
  // isInitialState: boolean;
}

export const CardItem: FunctionComponent<ICardItemProps> = ({ category, translate }) => {
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

  return (
    <li
      className={cn(styles.cardItem, isPlayMode ? styles.playMode : null, translateClassCard ? styles.translate : null)}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.front}>
        <img src={`../images/cards/${path}/${category}.png`} alt={`${category} category`} />
        <span className={styles.cardName}>{category}</span>
      </div>

      <div className={styles.back}>
        <img src={`../images/cards/${path}/${category}.png`} alt={`${category} category`} />
        <span className={styles.cardName}>{translate}</span>
      </div>

      <button type="button" className={styles.cardButtonFlip} onClick={onClickButtonFlip}></button>
    </li>
  );
};
