import { Menu } from '@/components/Menu';
import { Switch } from '@/components/Switсh';
import { Toggle } from '@/components/Toggle';
import React, { FunctionComponent, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appHeaderViewSelector } from './reducers';
import { switchAuthorization, switchPlayMode } from './actions';
import styles from './AppHeaderView.scss';

export interface IAppHeaderViewProps {
  active: any;
  setActive?: any;
}

export const AppHeaderView: FunctionComponent<IAppHeaderViewProps> = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const [openClassToggle, setOpenClassToggle] = useState(true);
  const [openClassMenu, setOpenClassMenu] = useState(true);
  const [openClassOverlay, setOpenClassOverlay] = useState(true);
  const [playMode, setPlayMode] = useState(true);
  // const [authorizationOpen, setAuthorizationOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  // const { isAdminHere } = useSelector(appHeaderViewSelector);
  // const { isAuthorizationOpen } = useSelector(appHeaderViewSelector);
  // const { isAdminHere } = useSelector(appHeaderViewSelector);
  // const { isAuthorizationOpen } = useSelector(appHeaderViewSelector);

  const toggleClickHandler = useCallback(() => {
    // dispatch(switchAuthorization(false));
    setOpenClassToggle(!openClassToggle);
    setOpenClassMenu(!openClassMenu);
    setOpenClassOverlay(!openClassOverlay);
  }, [openClassToggle, openClassMenu]);

  const overlayClickHandler = useCallback(() => {
    setOpenClassToggle(!openClassToggle);
    setOpenClassMenu(!openClassMenu);
    setOpenClassOverlay(!openClassOverlay);
  }, [openClassToggle, openClassMenu, openClassOverlay]);

  const switchClickHandler = useCallback(() => {
    dispatch(switchPlayMode(playMode));
    setPlayMode((isPlayMode) => !isPlayMode);
  }, [playMode, switchPlayMode, dispatch]);

  // const handleOpenAuth = useCallback(() => {
  //   // setAuth(!isAuth);
  //   // dispatch(switchAuthorization(false));
  //   // console.log(authorizationOpen);
  // }, []);

  // useEffect(() => {
  //   if (isAdminHere) {
  //     setAdminIsHere((isAdmin) => !isAdmin);
  //   } else {
  //     setAdminIsHere((isAdmin) => isAdmin);
  //   }
  // }, [isAdminHere]);

  const statusCode = sessionStorage.getItem('status');

  return (
    <header className={styles.pageHeader}>
      <div className={styles['page-header__wrapper']}>
        <nav className={styles['page-header__navigation']}>
          <Toggle isInitialState={openClassToggle} onClick={toggleClickHandler} />
          <Menu isInitialState={openClassMenu} onClick={overlayClickHandler} />
        </nav>
        <Link to={'/admin-panel-categories'} className={cn(styles.button, styles.linkCategories)}>
          Categories
        </Link>
        <button
          className={cn(styles.login, styles.button)}
          onClick={() => {
            setActive(true);
            if (statusCode === '200') {
              sessionStorage.removeItem('status');
            }
          }}
        >
          {statusCode !== '200' ? 'Log in' : 'Log out'}
        </button>
        <Switch htmlType="checkbox" id="switch__input" tabindex={0} onClick={switchClickHandler} />
        <Link to={'/statistics'} className={cn(styles.pageHeaderLink, styles.button)}>
          stats
        </Link>
      </div>
      <div
        className={cn(styles.overlay, openClassOverlay ? null : styles.overlayOpen)}
        onClick={overlayClickHandler}
      ></div>
    </header>
  );
};
