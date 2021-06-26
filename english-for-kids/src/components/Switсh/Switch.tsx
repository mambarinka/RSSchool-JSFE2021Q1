import React, { FunctionComponent } from "react";

import styles from "./Switch.scss";

export interface ISwitchProps {
  htmlType: "checkbox";
  id: string;
  tabindex: number;
  onClick: () => void;
}

export const Switch: FunctionComponent<ISwitchProps> = ({
  htmlType,
  id,
  tabindex,
  onClick,
}) => (
  <>
    <input className={styles.switchInput} type={`${htmlType}`} id={`${id}`} />
    <label
      className={styles.switch}
      htmlFor={`${id}`}
      tabIndex={tabindex}
      onClick={onClick}
    >
      <span className={styles.switchHandle}></span>
      <span className={styles.switchTextTrain}>Train</span>
      <span className={styles.switchTextPlay}>Play</span>
    </label>
  </>
);
