import { Caption } from '@/components/Caption/Caption';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import React, { FunctionComponent } from 'react';

import styles from './AuthView.scss';

// import { Modal, Input, Button, Caption } from '@/components';

export interface IAuthViewProps {
  onAccept: () => void;
  onChangeLogin: (value: string) => void;
  onChangePassword: (value: string) => void;
}

export const AuthView: FunctionComponent<IAuthViewProps> = ({ onAccept, onChangeLogin, onChangePassword }) => (
  <Modal zIndex={100} overlay>
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.label}>Authorization</div>
      </div>
      <div className={styles.main}>
        <div className={styles.inputArea}>
          <Caption className={styles.caption}>Login</Caption>
          <Input onChange={onChangeLogin} />
        </div>
        <div className={styles.inputArea}>
          <Caption className={styles.caption}>Password</Caption>
          <Input onChange={onChangePassword} htmlType="password" isShowEyeCloseUp />
        </div>
      </div>
      <div className={styles.footer}>
        <button onClick={onAccept}>Log in</button>
      </div>
    </div>
  </Modal>
);
