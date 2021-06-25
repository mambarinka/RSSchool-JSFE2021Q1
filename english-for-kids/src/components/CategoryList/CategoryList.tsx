import React, { FunctionComponent } from 'react';
import cn from 'classnames';

import styles from './CategoryList.scss';
import { MenuItem } from '../Menu-item';
import { CategoryItem } from '../CategoryItem';
import { Category, mainSelector } from '@/pages/Main/reducer';
import { useSelector } from 'react-redux';

export interface IToggleProps {
}

export const CategoryList = () => {
  
  const { categories } = useSelector(mainSelector);
  return (
    <ul className={cn(styles.category)} >
          {
        categories.map((categoryItem: Category) => (
          <CategoryItem category={categoryItem.value} key={categoryItem.value} />
        ))
      }
    </ul>
  );
};