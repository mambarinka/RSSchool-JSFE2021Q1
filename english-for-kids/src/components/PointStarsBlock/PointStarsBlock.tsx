import React, { FunctionComponent } from 'react';
import cn from 'classnames';

import { Card, Category, statisticsSelector } from '@/pages/Statistics/reducers';
import { useSelector } from 'react-redux';
import { StarBlock } from './StarBlock';
import styles from './PointStarsBlock.scss';

export interface IPointStarsBlockProps {
  path: string;
  isInitialState: boolean;
}

export const arrayStars: boolean[] = [];

export const PointStarsBlock: FunctionComponent<IPointStarsBlockProps> = ({ path, isInitialState }) => {
  const { categoriesStat } = useSelector(statisticsSelector);

  // console.log(path);
  // console.log(categoriesStat[path]);
  // console.log(arrayStars);

  return (
    <div className={cn(styles.pointsStarsBlock, isInitialState ? styles.pointsStarsBlockHide : null)}>
      {arrayStars.map((star, index) => (
        <StarBlock isStar={star} key={index} />
      ))}
    </div>
  );
};
