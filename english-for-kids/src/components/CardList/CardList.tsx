import React from 'react';
import cn from 'classnames';

import { Category, mainSelector } from '@/pages/Main/reducer';
import { useSelector } from 'react-redux';
import styles from './CategoryList.scss';
import { CardItem } from './CardItem';

export const CardList: () => JSX.Element = () => {
  const { categories } = useSelector(mainSelector);
  return (
    <ul className={cn(styles.category)}>
      {categories.map((categoryItem: Category) => (
        <CardItem category={categoryItem.value} key={categoryItem.value} />
      ))}
    </ul>
  );
};
