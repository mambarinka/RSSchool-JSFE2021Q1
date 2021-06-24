import React, { FunctionComponent } from 'react';
import cn from 'classnames';

import styles from './Switch.scss';

export interface ISwitchProps {
  htmlType: 'checkbox';
  id: string,
  tabindex: number
}

export const Switch: FunctionComponent<ISwitchProps> = (/* { onClick, close } */{ htmlType, id, tabindex }) => {
  return (<>
    <input className={styles.switchInput} type={`${htmlType}`} id={`${id}`} />
    <label className={styles.switch} htmlFor={`${id}`} tabIndex={tabindex}>
      <span className={styles.switchHandle}></span>
      <span className={styles.switchTextTrain}>Train</span>
      <span className={styles.switchTextPlay}>Play</span>
    </label>
  </>
  );
};
