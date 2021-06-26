import React, { FunctionComponent } from 'react';
import cn from 'classnames';

import { useSelector } from 'react-redux';
import { Category, mainSelector } from '@/pages/Main/reducer';
import styles from './Menu.scss';
import { MenuItem } from './Menu-item';

export interface IMenuProps {
  isInitialState: boolean;
}

export const Menu: FunctionComponent<IMenuProps> = ({ isInitialState }) => {
  const { categories } = useSelector(mainSelector);
  const arrayCategory: Category[] = Object.values(categories);

  return (
    <ul className={cn(styles.menu, isInitialState ? null : styles.open)}>
      <MenuItem mod={'main'} />
      {arrayCategory.map((categoryItem: Category) => (
        <MenuItem mod={categoryItem.value} key={categoryItem.value} />
      ))}
    </ul>
  );
};
