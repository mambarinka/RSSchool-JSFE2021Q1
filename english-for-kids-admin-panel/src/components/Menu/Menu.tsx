import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { useSelector } from 'react-redux';
import { Category, mainSelector } from '@/pages/Main/reducer';
import { getCategories } from '@/api/api';
import styles from './Menu.scss';
import { MenuItem } from './Menu-item';

export interface IMenuProps {
  isInitialState: boolean;
  onClick: () => void;
}

export const Menu: FunctionComponent<IMenuProps> = ({ isInitialState, onClick }) => {
  const { categories } = useSelector(mainSelector);
  const arrayCategory: Category[] = Object.values(categories);

  // const [data, dataSet] = useState<any>(null);

  // const fetchMyAPI = useCallback(async () => {
  //   const response = await (await fetch('http://localhost:3000/api/categories')).json();
  //   dataSet(response);
  // }, []);
  // useEffect(() => {
  //   fetchMyAPI();
  // }, [fetchMyAPI]);

  // if (data) {
  //   console.log(data);
  //   console.log(data[0].image);
  // }
  return (
    <>
      <ul className={cn(styles.menu, isInitialState ? null : styles.open)}>
        <MenuItem mod={'main'} onClick={onClick} />
        {arrayCategory.map((categoryItem: Category) => (
          <MenuItem mod={categoryItem.value} key={categoryItem.value} onClick={onClick} />
        ))}
      </ul>
      <button>Log in</button>
    </>
  );
};
