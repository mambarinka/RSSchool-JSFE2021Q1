import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { Category, mainSelector } from '@/pages/Main/reducer';
import { getCategories } from '@/api/api';
import { switchAuthorization } from '@/App/AppHedaer/AppHeaderView/actions';
import { Link } from 'react-router-dom';
import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { MenuItem } from './Menu-item';
import styles from './Menu.scss';

export interface IMenuProps {
  isInitialState: boolean;
  onClick: () => void;
}

export const Menu: FunctionComponent<IMenuProps> = ({ isInitialState, onClick }) => {
  const dispatch = useDispatch();
  const [authorizationOpen, setAuthorizationOpen] = useState(false);
  const [adminIsHere, setAdminIsHere] = useState(false);
  const { categories } = useSelector(mainSelector);
  const arrayCategory: Category[] = Object.values(categories);
  const { isAdminHere } = useSelector(appHeaderViewSelector);

  useEffect(() => {
    if (isAdminHere) {
      setAdminIsHere((isAdmin) => !isAdmin);
    }
  }, [isAdminHere]);

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

  const handleSwitchAuthorization = useCallback(() => {
    dispatch(switchAuthorization(authorizationOpen));
    setAuthorizationOpen((isAuthorizationOpen) => !isAuthorizationOpen);
  }, [authorizationOpen, switchAuthorization, dispatch]);

  return (
    <>
      <ul className={cn(styles.menu, isInitialState ? null : styles.open)}>
        <MenuItem mod={'main'} onClick={onClick} />
        {arrayCategory.map((categoryItem: Category) => (
          <MenuItem mod={categoryItem.value} key={categoryItem.value} onClick={onClick} />
        ))}
        <li className={cn(styles.menuItem, !adminIsHere ? null : styles.hide)} onClick={onClick}>
          <Link to={'/admin-panel-categories'} className={cn(styles.menuLink)}>
            Categories
          </Link>
        </li>
      </ul>
      {/* <Link
        to={'/admin-panel-categories'}
        className={cn(styles.login, styles.button, isInitialState ? null : styles.loginOpen)}
        onClick={() => {
          handleSwitchAuthorization();
          onClick();
        }}
      >
        Log in
      </Link> */}
      <button
        className={cn(styles.login, styles.button, isInitialState ? null : styles.loginOpen)}
        onClick={handleSwitchAuthorization}
      >
        Log in
      </button>
    </>
  );
};
