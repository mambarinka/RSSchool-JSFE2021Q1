import React, { useEffect } from 'react';
import cn from 'classnames';

import { Category, mainSelector } from '@/pages/Main/reducer';
import { useSelector } from 'react-redux';
import { getCategories } from '@/api/api';
import { CategoryItem } from './CategoryItem';
import styles from './CategoryList.scss';

export const CategoryList: () => JSX.Element = () => {
  const { categories } = useSelector(mainSelector);
  const arrayCategory: Category[] = Object.values(categories);

  useEffect(() => {
    const cats = getCategories();
    console.log(cats);
  });

  return (
    <ul className={cn(styles.category)}>
      {arrayCategory.map((categoryItem: Category) => (
        <CategoryItem category={categoryItem.value} key={categoryItem.value} />
      ))}
    </ul>
  );
};
