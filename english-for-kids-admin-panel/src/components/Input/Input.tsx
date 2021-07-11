import React, { FunctionComponent, useState, useCallback } from 'react';

import styles from './Input.scss';

import { Icon } from '../Icon';

export interface IInputProps {
  htmlType?: 'text' | 'password' | 'email' | 'number';
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onChange?: (text: string) => void;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  isShowEyeCloseUp?: boolean;
}

export const Input: FunctionComponent<IInputProps> = ({
  htmlType = 'text',
  onClick,
  onFocus,
  onChange,
  placeholder,
  value,
  defaultValue,
  disabled = false,
  min,
  max,
  maxLength,
  isShowEyeCloseUp,
}) => {
  const [toggleEye, setToggleEye] = useState(false);

  const onClickEye = useCallback(() => {
    setToggleEye(!toggleEye);
  }, [toggleEye]);

  const onChangeInputValue = ({ target }: any) => {
    const { valueTarget } = target;

    if (onChange) {
      onChange(valueTarget);
    }
  };

  return (
    <div className={styles.content}>
      <input
        className={styles.input}
        type={isShowEyeCloseUp && toggleEye ? 'text' : htmlType}
        onClick={onClick}
        onFocus={onFocus}
        onChange={onChangeInputValue}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        min={min}
        max={max}
        maxLength={maxLength}
      />
      {isShowEyeCloseUp && toggleEye && !disabled && (
        <Icon type="EyeCloseUp" className={styles.eyeCloseUp} onClick={onClickEye} />
      )}
      {isShowEyeCloseUp && !toggleEye && !disabled && (
        <Icon type="EyeCloseUpClosed" className={styles.eyeCloseUp} onClick={onClickEye} />
      )}
    </div>
  );
};
