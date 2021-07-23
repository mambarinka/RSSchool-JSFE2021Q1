import { switchAuthorization } from '@/App/AppHedaer/AppHeaderView/actions';
import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import React, { ReactNode, FunctionComponent, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import styles from './Auth.scss';

import { AuthView } from './AuthView';
import { useAuth } from './hooks';

export interface IAuthProps {
  children: ReactNode;
  active: boolean;
  setActive?: any;
}
export let statusResponse: number;

export const Auth: FunctionComponent<IAuthProps> = ({ children, active, setActive }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleOnAccept = useCallback(async () => {
    if (login && password) {
      const hash = Buffer.from(`${encodeURIComponent(login)}:${encodeURIComponent(password)}`).toString('base64');

      // await fetch('http://localhost:3000/api/auth', {
      await fetch('https://server-english-for-kids.herokuapp.com/api/auth', {
        method: 'POST',
        headers: new Headers({
          Authorization: `Basic ${hash}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
        .then((response) => {
          console.log('File sent successful');
          // console.log(new Error(`${response.status}: ${response.statusText}`));
          sessionStorage.setItem('status', JSON.stringify(response.status));
        })
        .catch((e) => {
          console.log(e.message);
        });

      sessionStorage.setItem('login', JSON.stringify(login));
      sessionStorage.setItem('password', JSON.stringify(password));
      setActive(false);
    } else {
      alert('please fill in all fields');
    }
  }, [login, password]);

  const handleChangeLogin = useCallback((value: string) => {
    setLogin(value);
  }, []);

  const handleChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  //   const overlayClickHandler = useCallback(() => {
  //   setOpenClassOverlay(!openClassOverlay);
  // }, [openClassOverlay]);

  const statusCode = sessionStorage.getItem('status');
  // let openAuth;
  // useEffect(() => {
  //   openAuth = active;
  // }, [statusCode, active, setActive]);

  return (
    <>
      {!active ? (
        children
      ) : (
        <div className={cn(styles.overlay, active ? styles.active : null)} onClick={() => setActive(false)}>
          <div onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}>
            <AuthView
              onAccept={handleOnAccept}
              onChangeLogin={handleChangeLogin}
              onChangePassword={handleChangePassword}
            />
          </div>
        </div>
      )}
    </>
  );
  // return <>{children}</>;
};
