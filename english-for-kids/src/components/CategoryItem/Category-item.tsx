import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './Category-item.scss';

export interface IMenuItemProps {
  category: string
}

export const CategoryItem: FunctionComponent<IMenuItemProps> = ({ category }) => {
  return (
    <li className={styles.categoryItem} >
      <Link to={`/${category}`} className={styles.categoryLink}>
        <img src={`../images/categories/${category}.png`} alt={`${category} category`} />
        <span className={styles.categoryName}></span>
      </Link>
    </li>
  );
};
