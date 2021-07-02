import React, { FunctionComponent } from 'react';
import cn from 'classnames';

import { Category, mainSelector } from '@/pages/Main/reducer';
import { useSelector } from 'react-redux';
import styles from './CardList.scss';
import { CardItem } from './CardItem';

export const CardList = () => {
  const { categories } = useSelector(mainSelector);
  const arrayCategory: Category[] = Object.values(categories);

  const path = window.location.pathname.slice(1);
  const result = arrayCategory.filter((categoryItem) => categoryItem.value === `${path}`);

  return (
    <ul className={cn(styles.cardList)}>
      {result[0].cards.map((categoryItem, index) => (
        <CardItem category={categoryItem} key={categoryItem} translate={result[0].translate[index]} />
      ))}
    </ul>
  );
};
