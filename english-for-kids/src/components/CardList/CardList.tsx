import React, { ReactNode } from 'react';
import cn from 'classnames';

import { Category, IMainState, mainSelector } from '@/pages/Main/reducer';
import { useSelector } from 'react-redux';
import styles from './CardList.scss';
import { CardItem } from './CardItem';

export const CardList: () => JSX.Element = () => {
  const { categories } = useSelector(mainSelector);
  const arrayCategory: Category[] = Object.values(categories);

  const path = window.location.pathname.slice(1);
  const result = arrayCategory.filter((categoryItem) => categoryItem.value === `${path}`);

  // console.log(result[0]);
  // Object.values(result[0]).forEach((v) => {
  //   for (let i = 0; i < v.length; i++) {
  //     console.log(v[i]);
  //   }
  // });

  // result[0].cards.forEach((lol) => {});

  // const abc: string[] = Object.values(result[0])[1];
  // const def = Object.values(result[0])[2];
  // console.log(abc);
  // console.log(def);

  return (
    <ul className={cn(styles.cardList)}>
      {result[0].cards.map((categoryItem, index) => (
        <CardItem category={categoryItem} key={categoryItem} translate={result[0].translate[index]} />
      ))}
    </ul>
  );
};

// {result[0].cards.map((categoryItem) => (
//   <CardItem category={categoryItem} key={categoryItem} />
// ))}
