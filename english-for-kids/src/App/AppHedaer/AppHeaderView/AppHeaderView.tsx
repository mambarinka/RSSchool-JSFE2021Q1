import { Menu } from "@/components/Menu";
import { Switch } from "@/components/Switсh";
import { Toggle } from "@/components/Toggle";
import React, { useCallback, useState } from "react";
import cn from "classnames";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./AppHeaderView.scss";
import { switchPlayMode } from "./actions";

export const AppHeaderView: () => JSX.Element =
  (/* {onClick}: IAppHeaderViewProps */) => {
    const dispatch = useDispatch();
    const [openClassToggle, changeOpenClassToggle] = useState(true);
    const [openClassMenu, changeOpenClassMenu] = useState(true);
    const [openClassOverlay, changeOpenClassOverlay] = useState(true);
    const [playMode, changePlayMode] = useState(true);

    const onClickToggle = useCallback(() => {
      changeOpenClassToggle(!openClassToggle);
      changeOpenClassMenu(!openClassMenu);
      changeOpenClassOverlay(!openClassOverlay);
    }, [openClassToggle, openClassMenu]);

    const onclickOverlay = useCallback(() => {
      changeOpenClassToggle(!openClassToggle);
      changeOpenClassMenu(!openClassMenu);
      changeOpenClassOverlay(!openClassOverlay);
    }, [openClassToggle, openClassMenu, openClassOverlay]);

    const onclickSwitch = useCallback(() => {
      dispatch(switchPlayMode(playMode));
      changePlayMode(!playMode);
    }, [playMode, switchPlayMode, dispatch]);

    return (
      <header className={styles.pageHeader}>
        <div className={styles["page-header__wrapper"]}>
          <nav className={styles["page-header__navigation"]}>
            <Toggle isInitialState={openClassToggle} onClick={onClickToggle} />
            <Menu isInitialState={openClassMenu} />
          </nav>
          <Switch
            htmlType="checkbox"
            id="switch__input"
            tabindex={0}
            onClick={onclickSwitch}
          />
          <Link
            to={`/statistics`}
            className={cn(styles.pageHeaderLink, styles.button)}
          >
            stats
          </Link>
        </div>
        <div
          className={cn(
            styles.overlay,
            openClassOverlay ? null : styles.overlayOpen
          )}
          onClick={onclickOverlay}
        ></div>
      </header>
    );
  };
