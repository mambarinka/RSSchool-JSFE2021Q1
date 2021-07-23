import React, { FunctionComponent, useEffect, useState } from 'react';
import cn from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from '@/api/actions';
import { apiSelector } from '@/api/reducers';
import { MenuItem } from './Menu-item';
import styles from './Menu.scss';

export interface IMenuProps {
  isInitialState: boolean;
  onClick: () => void;
}

export const Menu: FunctionComponent<IMenuProps> = ({ isInitialState, onClick }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector(apiSelector);
  const [arrayCategoryApi, setArrayCategoryApi] = useState([] as any[]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setArrayCategoryApi(categories);
  }, [categories]);

  return (
    <>
      <ul className={cn(styles.menu, isInitialState ? null : styles.open)}>
        <li className={cn(styles.menuItem, styles.menuItemCategories)} onClick={onClick}>
          <Link to={'/main'} className={cn(styles.menuLink, styles.menuLinkCategories)} onClick={onClick}>
            Main
          </Link>
        </li>
        {arrayCategoryApi.map((item: { text: React.Key | null | undefined; link: string; id: string }) => (
          <MenuItem category={item.text} key={item.id} onClick={onClick} src={`/${item.text}`} />
        ))}
      </ul>
    </>
  );
};
