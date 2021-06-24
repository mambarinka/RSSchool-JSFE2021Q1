import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './Category-item.scss';

export interface IMenuItemProps {
  // onClick?: (value?: any) => void;
  // disabled?: boolean;
  // size?: 'small' | 'normal' | 'large';
  // close: boolean 
  category: 'fruits' | 'animals' | 'body-parts' | 'clothes' | 'colors' | 'profession' | 'emotion' | 'numbers'
}

export const CategoryItem: FunctionComponent<IMenuItemProps> = (/* { onClick, close } */{ category }) => {
  return (
    <li className={styles.categoryItem} /* onClick={close ? undefined : onClick} */>
      <Link to={`/${category}`} className={styles.categoryLink}>
        <img src={`../images/categories/${category}.png`} alt={`${category} category`} />
        <span className={styles.categoryName}></span>
      </Link>
    </li>
  );
};
