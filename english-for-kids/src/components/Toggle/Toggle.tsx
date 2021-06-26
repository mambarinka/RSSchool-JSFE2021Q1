import React, { FunctionComponent } from 'react';
import cn from 'classnames';

import styles from './Toggle.scss';

export interface IToggleProps {
  onClick?: (value?: any) => void;
  isInitialState: boolean;
}

export const Toggle: FunctionComponent<IToggleProps> = ({ onClick, isInitialState }) => (
  <button className={cn(styles.toggle, isInitialState ? null : styles.toggleOpen)} onClick={onClick}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </button>
);
