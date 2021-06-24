import React, { FunctionComponent } from 'react';
import cn from 'classnames';

import styles from './Menu-item.scss';

export interface IMenuItemProps {
  // onClick?: (value?: any) => void;
  // disabled?: boolean;
  // size?: 'small' | 'normal' | 'large';
  // close: boolean 
  mod: 'fruits' | 'animals' | 'body-parts' | 'clothes' | 'colors' | 'profession' | 'emotion' | 'numbers'
}

export const MenuItem: FunctionComponent<IMenuItemProps>   = (/* { onClick, close } */{mod}) => {
  const textContent = `${mod}`;
  return (    
      <li className={styles.menuItem} /* onClick={close ? undefined : onClick} */>
      <a className={cn(styles.menuLink, styles[`menu-link--${mod}`])}>{textContent}</a>
       </li>
  );
};
