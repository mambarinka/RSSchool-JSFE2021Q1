import { Menu } from '@/components/Menu';
import { Switch } from '@/components/Switсh';
import { Toggle } from '@/components/Toggle';
import React, { useCallback, useState } from 'react';
import cn from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import styles from './Statistics.scss';
import { mainSelector } from '../Main/reducer';

export const Statistics: () => JSX.Element = () => {
  const { categories } = useSelector(mainSelector);
  const dispatch = useDispatch();
  console.log(categories);
  return (
    <>
      <div></div>
    </>
  );
};
