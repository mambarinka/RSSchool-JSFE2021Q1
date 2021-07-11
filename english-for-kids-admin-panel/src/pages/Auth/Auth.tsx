import { switchAuthorization } from '@/App/AppHedaer/AppHeaderView/actions';
import React, { ReactNode, FunctionComponent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './Auth.scss';

import { AuthView } from './AuthView';
import { useAuth } from './hooks';

export interface IAuthProps {
  children: ReactNode;
  isOpen: boolean;
}

export const Auth: FunctionComponent<IAuthProps> = ({ children, isOpen }) => {
  const [auth, setAuth] = useState(false);
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleOnAccept = useCallback(() => {
    dispatch(switchAuthorization(auth));
    if (login === 'admin' && password === 'admin') {
      setAuth(true);
      return;
    }
    alert('Уходи с моей полянки');
  }, [login, password]);

  const handleChangeLogin = useCallback((value: string) => {
    setLogin(value);
  }, []);

  const handleChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  return (
    <>
      {isOpen ? (
        children
      ) : (
        <AuthView onAccept={handleOnAccept} onChangeLogin={handleChangeLogin} onChangePassword={handleChangePassword} />
      )}
    </>
  );
  // return <>{children}</>;
};
