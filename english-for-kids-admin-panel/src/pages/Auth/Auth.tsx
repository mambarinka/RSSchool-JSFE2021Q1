import { switchAdminHere, switchAuthorization } from '@/App/AppHedaer/AppHeaderView/actions';
import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import React, { ReactNode, FunctionComponent, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Auth.scss';

import { AuthView } from './AuthView';
import { useAuth } from './hooks';

export interface IAuthProps {
  children: ReactNode;
}

export const Auth: FunctionComponent<IAuthProps> = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [authorizationOpen, setAuthorizationOpen] = useState(false);
  // const { isAuthorizationOpen } = useSelector(appHeaderViewSelector);
  // const { isAdminHere } = useSelector(appHeaderViewSelector);

  useEffect(() => {
    setAuthorizationOpen(authorizationOpen);
    dispatch(switchAuthorization(authorizationOpen));
    // console.log('isAuthorizationOpen useeff', isAuthorizationOpen);
  }, [dispatch]);

  // console.log('isAuthorizationOpen', isAuthorizationOpen);
  const handleOnAccept = useCallback(() => {
    dispatch(switchAdminHere(auth));
    if (login === 'admin' && password === 'admin') {
      setAuth(true);
    } else {
      alert('Вы не админ');
      setAuth(false);
      dispatch(switchAuthorization(false));
    }
  }, [login, password]);

  const handleChangeLogin = useCallback((value: string) => {
    setLogin(value);
  }, []);

  const handleChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  return (
    <>
      {!auth ? (
        children
      ) : (
        <AuthView onAccept={handleOnAccept} onChangeLogin={handleChangeLogin} onChangePassword={handleChangePassword} />
      )}
    </>
  );
  // return <>{children}</>;
};
