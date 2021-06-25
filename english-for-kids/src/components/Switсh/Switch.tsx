import React, { FunctionComponent } from 'react';
import cn from 'classnames';

import styles from './Switch.scss';

export interface ISwitchProps {
  htmlType: 'checkbox';
  id: string,
  tabindex: number,
  onClick: (value?: any) => void;
}

export const Switch: FunctionComponent<ISwitchProps> = ({ htmlType, id, tabindex, onClick }) => {
  return (<>
    <input className={styles.switchInput} type={`${htmlType}`} id={`${id}`} />
    <label className={styles.switch} htmlFor={`${id}`} tabIndex={tabindex} onClick={onClick}>
      <span className={styles.switchHandle}></span>
      <span className={styles.switchTextTrain}>Train</span>
      <span className={styles.switchTextPlay}>Play</span>
    </label>
  </>
  );
};
