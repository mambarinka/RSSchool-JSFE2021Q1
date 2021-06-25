import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Menu-item.scss';

export interface IMenuItemProps {
  mod: string
}

export const MenuItem: FunctionComponent<IMenuItemProps>   = ({mod}) => {
  const textContent = `${mod}`;
  return (    
      <li className={styles.menuItem} >
      <Link to={`/${mod}`} className={cn(styles.menuLink, styles[`menu-link--${mod}`])}>{textContent}</Link>
       </li>
  );
};
