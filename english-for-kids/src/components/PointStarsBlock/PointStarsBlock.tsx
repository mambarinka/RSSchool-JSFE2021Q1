import React, { FunctionComponent, useEffect, useCallback } from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import { mainSelector } from '@/pages/Main/reducer';
import { StarBlock } from './StarBlock';
import styles from './PointStarsBlock.scss';

export interface IPointStarsBlockProps {
  path: string;
  isInitialState: boolean;
}

export const PointStarsBlock: FunctionComponent<IPointStarsBlockProps> = ({ path, isInitialState }) => {
  const { arrayStars } = useSelector(mainSelector);

  return (
    <div className={cn(styles.pointsStarsBlock, isInitialState ? styles.pointsStarsBlockHide : null)}>
      {arrayStars.map((star, index) => (
        <StarBlock isStar={star} key={index} />
      ))}
    </div>
  );
};
