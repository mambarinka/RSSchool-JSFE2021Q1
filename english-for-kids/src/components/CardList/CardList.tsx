import React from 'react';
import cn from 'classnames';

import { Category, mainSelector } from '@/pages/Main/reducer';
import { useSelector } from 'react-redux';
import styles from './CardList.scss';
import { CardItem } from './CardItem';

export const CardList: () => JSX.Element = () => {
  const { categories } = useSelector(mainSelector);
  const arrayCategory: Category[] = Object.values(categories);
  const path = window.location.pathname.slice(1);
  const result = arrayCategory.filter((categoryItem) => categoryItem.value === `${path}`);

  // Object.values(categories).forEach((v) => console.log(v));
  console.log(result[0].cards);
  return (
    <ul className={cn(styles.cardList)}>
      {result[0].cards.map((categoryItem) => (
        <CardItem category={categoryItem} key={categoryItem} />
      ))}
    </ul>
  );
};
