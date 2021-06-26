import React from 'react';
import cn from 'classnames';

import { Category, mainSelector } from '@/pages/Main/reducer';
import { useSelector } from 'react-redux';
import styles from './CategoryList.scss';
import { CategoryItem } from './CategoryItem';

export const CategoryList: () => JSX.Element = () => {
  const { categories } = useSelector(mainSelector);
  const arrayCategory: Category[] = Object.values(categories);

  return (
    <ul className={cn(styles.category)}>
      {arrayCategory.map((categoryItem: Category) => (
        <CategoryItem category={categoryItem.value} key={categoryItem.value} />
      ))}
    </ul>
  );
};
