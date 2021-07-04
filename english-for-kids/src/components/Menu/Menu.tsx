import React, { FunctionComponent, useCallback } from 'react';
import cn from 'classnames';

import { useSelector } from 'react-redux';
import { Category, mainSelector } from '@/pages/Main/reducer';
import styles from './Menu.scss';
import { MenuItem } from './Menu-item';

export interface IMenuProps {
  isInitialState: boolean;
  onClick: () => void;
}

export const Menu: FunctionComponent<IMenuProps> = ({ isInitialState, onClick }) => {
  const { categories } = useSelector(mainSelector);
  const arrayCategory: Category[] = Object.values(categories);

  return (
    <ul className={cn(styles.menu, isInitialState ? null : styles.open)}>
      <MenuItem mod={'main'} onClick={onClick} />
      {arrayCategory.map((categoryItem: Category) => (
        <MenuItem mod={categoryItem.value} key={categoryItem.value} onClick={onClick} />
      ))}
    </ul>
  );
};
