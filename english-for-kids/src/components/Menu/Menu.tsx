import React, { FunctionComponent, useCallback, useState } from 'react';
import cn from 'classnames';

import styles from './Menu.scss';
import { MenuItem } from '../Menu-item';
import { useSelector } from 'react-redux';
import { Category, mainSelector } from '@/pages/Main/reducer';


export interface IMenuProps {
  isInitialState: boolean
}

export const Menu: FunctionComponent<IMenuProps> = ({ isInitialState }) => {

  const { categories } = useSelector(mainSelector);
  return (
    <ul className={cn(styles.menu, isInitialState ? null : styles.open)}>
      {
        categories.map((category: Category) => (
          <MenuItem mod={category.value}  key={category.value}/>
        ))
      }
    </ul>
  );
};