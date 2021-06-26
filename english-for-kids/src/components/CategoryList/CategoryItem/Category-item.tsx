import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import styles from './Category-item.scss';

export interface ICategoryItemProps {
  category: string;
}

export const CategoryItem: FunctionComponent<ICategoryItemProps> = ({ category }) => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  return (
    <li className={cn(styles.categoryItem, isPlayMode ? styles.playMode : null)}>
      <Link to={`/${category}`} className={styles.categoryLink}>
        <img src={`../images/categories/${category}.png`} alt={`${category} category`} />
        <span className={styles.categoryName}>{category}</span>
      </Link>
    </li>
  );
};
