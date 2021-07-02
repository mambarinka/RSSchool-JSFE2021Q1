import React, { FunctionComponent } from 'react';
import cn from 'classnames';

import styles from './StarBlock.scss';

export interface IMenuItemProps {
  isStar: boolean;
}

export const StarBlock: FunctionComponent<IMenuItemProps> = ({ isStar }) => (
  <div className={cn(isStar ? styles.star : styles.noStar)}></div>
);
