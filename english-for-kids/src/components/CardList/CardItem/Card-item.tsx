import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import styles from './Card-item.scss';

export interface ICardItemProps {
  category: string;
}

export const CardItem: FunctionComponent<ICardItemProps> = ({ category }) => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  const path = window.location.pathname.slice(1);
  return (
    <li className={cn(styles.cardItem, isPlayMode ? styles.playMode : null)}>
      <img src={`../images/cards/${path}/${category}.png`} alt={`${category} category`} />
      <span className={styles.cardName}>{category}</span>
    </li>
  );
};
