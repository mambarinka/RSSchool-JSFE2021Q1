import React, { FunctionComponent } from 'react';
import cn from 'classnames';

import styles from './Menu.scss';
import { MenuItem } from '../Menu-item';

export interface IToggleProps {
  // onClick?: (value?: any) => void;
  // disabled?: boolean;
  // size?: 'small' | 'normal' | 'large';
  // close: boolean
}

export const Menu/* : FunctionComponent<IToggleProps>  */ = (/* { onClick, close } */) => {
  return (    
      <ul className={styles.menu} /* onClick={close ? undefined : onClick} */>
      <MenuItem mod='fruits'/>
      <MenuItem mod='animals'/>
      <MenuItem mod='body-parts'/>
      <MenuItem mod='clothes'/>
      <MenuItem mod='colors'/>
      <MenuItem mod='profession'/>
      <MenuItem mod='emotion'/>
      <MenuItem mod='numbers'/>
       </ul>
  );
};
