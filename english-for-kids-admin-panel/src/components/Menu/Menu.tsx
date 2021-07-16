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
  const { isAuthorizationOpen } = useSelector(appHeaderViewSelector);

  useEffect(() => {
    if (isAdminHere) {
      setAdminIsHere((isAdmin) => !isAdmin);
    } else {
      setAdminIsHere((isAdmin) => isAdmin);
    }
  }, [isAdminHere]);
  console.log('isAdminHere', isAdminHere);
  const handleSwitchAuthorization = useCallback(() => {
    dispatch(switchAuthorization(authorizationOpen));
    setAuthorizationOpen((isAuth) => !isAuth);
    // console.log(authorizationOpen);
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
      <button
        className={cn(styles.login, styles.button, isInitialState ? null : styles.loginOpen)}
        onClick={handleSwitchAuthorization}
      >
        {isAdminHere ? 'Log out' : 'Log in'}
      </button>
    </>
  );
};
