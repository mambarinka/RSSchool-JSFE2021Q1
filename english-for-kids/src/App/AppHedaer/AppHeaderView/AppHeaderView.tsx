import { Menu } from '@/components/Menu';
import { Switch } from '@/components/Switсh';
import { Toggle } from '@/components/Toggle';
import React, { useCallback, useState } from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './AppHeaderView.scss';
import { switchPlayMode } from './actions';

export const AppHeaderView: () => JSX.Element = () => {
  const dispatch = useDispatch();
  const [openClassToggle, setOpenClassToggle] = useState(true);
  const [openClassMenu, setOpenClassMenu] = useState(true);
  const [openClassOverlay, setOpenClassOverlay] = useState(true);
  const [playMode, setPlayMode] = useState(true);

  const toggleClickHandler = useCallback(() => {
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

  return (
    <header className={styles.pageHeader}>
      <div className={styles['page-header__wrapper']}>
        <nav className={styles['page-header__navigation']}>
          <Toggle isInitialState={openClassToggle} onClick={toggleClickHandler} />
          <Menu isInitialState={openClassMenu} onClick={overlayClickHandler} />
        </nav>
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
