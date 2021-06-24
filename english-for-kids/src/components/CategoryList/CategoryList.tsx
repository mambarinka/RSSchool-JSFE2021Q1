import React, { FunctionComponent } from 'react';
import cn from 'classnames';

import styles from './CategoryList.scss';
import { MenuItem } from '../Menu-item';
import { CategoryItem } from '../CategoryItem';

export interface IToggleProps {
  // onClick?: (value?: any) => void;
  // disabled?: boolean;
  // size?: 'small' | 'normal' | 'large';
  // close: boolean
}

export const CategoryList/* : FunctionComponent<IToggleProps>  */ = (/* { onClick, close } */) => {
  return (
    <ul className={styles.category} /* onClick={close ? undefined : onClick} */>
      <CategoryItem category='fruits' />
      <CategoryItem category='animals' />
      <CategoryItem category='body-parts' />
      <CategoryItem category='clothes' />
      <CategoryItem category='colors' />
      <CategoryItem category='profession' />
      <CategoryItem category='emotion' />
      <CategoryItem category='numbers' />
    </ul>
  );
};
