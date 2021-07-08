import React, { FunctionComponent, useCallback } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Menu-item.scss';

export interface IMenuItemProps {
  mod: string;
  onClick: () => void;
}

export const MenuItem: FunctionComponent<IMenuItemProps> = ({ mod, onClick }) => {
  const textContent = `${mod}`;
  return (
    <li className={styles.menuItem} onClick={onClick}>
      <Link to={`/${mod}`} className={cn(styles.menuLink, styles[`menu-link--${mod}`])}>
        {textContent}
      </Link>
    </li>
  );
};
