import { Menu } from '@/components/Menu';
import { Switch } from '@/components/Switсh';
import { Toggle } from '@/components/Toggle';
import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './AppHeaderView.scss';
import { Link } from 'react-router-dom';


export const AppHeaderView = (/* {onClick}: IAppHeaderViewProps */) => {
  const [openClassToggle, changeOpenClassToggle] = useState(true);
  const [openClassMenu, changeOpenClassMenu] = useState(true);
  const [openClassOverlay, changeOpenClassOverlay] = useState(true);
  const [playMode, changePlayMode] = useState(false);

  const onClickToggle = useCallback(() => {
    changeOpenClassToggle(!openClassToggle);
    changeOpenClassMenu(!openClassMenu);
    changeOpenClassOverlay(!openClassOverlay);
  }, [openClassToggle, openClassMenu]);

  const onclickOverlay = useCallback(() => {
    changeOpenClassToggle(!openClassToggle);
    changeOpenClassMenu(!openClassMenu);
    changeOpenClassOverlay(!openClassOverlay);
  }, [openClassToggle, openClassMenu, openClassOverlay])

  const onclickSwitch = useCallback(() => {
    changePlayMode(playMode);   
  }, [playMode]) //нужно при клике на switch добавлялся/удалялся класс "play-mode" для Main, как это можно сделать? как свзяать два компонента, которые не вложены друг в друга?

  return (
    <header className={styles.pageHeader}>
      <div className={styles['page-header__wrapper']}>
        <nav className={styles['page-header__navigation']}>
          <Toggle isInitialState={openClassToggle} onClick={onClickToggle} />
          <Menu isInitialState={openClassMenu} />
        </nav>
        <Switch htmlType='checkbox' id='switch__input' tabindex={0} onClick={onclickSwitch} />
        <Link to={`/statistics`} className={cn(styles.pageHeaderLink, styles.button)}>stats</Link>
      </div>
      <div className={cn(styles.overlay, openClassOverlay ? null : styles.overlayOpen)} onClick={onclickOverlay}></div>
    </header>
  );
};