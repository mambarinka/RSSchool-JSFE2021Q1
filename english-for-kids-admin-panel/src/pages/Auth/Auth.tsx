import { switchAdminHere, switchAuthorization } from '@/App/AppHedaer/AppHeaderView/actions';
import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import React, { ReactNode, FunctionComponent, useCallback, useState } from 'react';
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
  const { isAuthorizationOpen } = useSelector(appHeaderViewSelector);
  const { isAdminHere } = useSelector(appHeaderViewSelector);

  const handleOnAccept = useCallback(() => {
    dispatch(switchAdminHere(auth));
    if (login === 'admin' && password === 'admin') {
      setAuth((isAdmin) => !isAdmin);
    } else {
      alert('Уходи с моей полянки');
      setAuth(isAdminHere);
    }
    dispatch(switchAuthorization(!isAuthorizationOpen));
  }, [login, password]);

  const handleChangeLogin = useCallback((value: string) => {
    // console.log(value);
    setLogin(value);
  }, []);

  const handleChangePassword = useCallback((value: string) => {
    setPassword(value);
    console.log(password);
  }, []);

  return (
    <>
      {!isAuthorizationOpen ? (
        children
      ) : (
        <AuthView onAccept={handleOnAccept} onChangeLogin={handleChangeLogin} onChangePassword={handleChangePassword} />
      )}
    </>
  );
  // return <>{children}</>;
};
