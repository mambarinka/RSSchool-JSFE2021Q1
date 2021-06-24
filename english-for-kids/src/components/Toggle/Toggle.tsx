import React, { FunctionComponent } from 'react';
import cn from 'classnames';

import styles from './Toggle.scss';

export interface IToggleProps {
  onClick?: (value?: any) => void;
  // disabled?: boolean;
  // size?: 'small' | 'normal' | 'large';
  close: boolean
}

export const Toggle/* : FunctionComponent<IToggleProps>  */ = (/* { onClick, close } */) => {
  return (    
      <button className={cn(styles.toggle/* , styles['toggle--open']: */)} /* onClick={close ? undefined : onClick} */>
       <span></span>
       <span></span>
       <span></span>
       <span></span>
       <span></span>
       <span></span>
       </button>
  );
};
