import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { Category, mainSelector } from '@/pages/Main/reducer';
import { switchAuthorization } from '@/App/AppHedaer/AppHeaderView/actions';
import { Link } from 'react-router-dom';
import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
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
  // const { isAdminHere } = useSelector(appHeaderViewSelector);
  const [adminIsHere, setAdminIsHere] = useState(false);
  const { categories } = useSelector(apiSelector);
  // const { categories } = useSelector(mainSelector);
  // const arrayCategory: Category[] = Object.values(categories);

  // const { isAuthorizationOpen } = useSelector(appHeaderViewSelector);
  const [arrayCategoryApi, setArrayCategoryApi] = useState([] as any[]);

  // useEffect(() => {
  //   if (isAdminHere) {
  //     setAdminIsHere((isAdmin) => !isAdmin);
  //   } else {
  //     setAdminIsHere((isAdmin) => isAdmin);
  //   }
  // }, [isAdminHere]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setArrayCategoryApi(categories);
  }, [categories]);

  return (
    <>
      <ul className={cn(styles.menu, isInitialState ? null : styles.open)}>
        <li
          className={cn(styles.menuItem, !adminIsHere ? null : styles.hide, styles.menuItemCategories)}
          onClick={onClick}
        >
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
