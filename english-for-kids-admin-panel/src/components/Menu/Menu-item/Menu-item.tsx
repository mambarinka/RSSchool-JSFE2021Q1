import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Menu-item.scss';

export interface IMenuItemProps {
  category: string | React.Key | null | undefined;
  src: string;
  onClick: () => void;
}

export const MenuItem: FunctionComponent<IMenuItemProps> = ({ category, src, onClick }) => {
  const textContent = `${category}`;
  return (
    <li className={styles.menuItem} onClick={onClick}>
      <Link to={src} className={cn(styles.menuLink, styles[`menu-link--${category}`])}>
        {textContent}
      </Link>
    </li>
  );
};
