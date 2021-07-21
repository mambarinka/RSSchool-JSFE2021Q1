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

export const Auth: FunctionComponent<IAuthProps> = ({ children, active, setActive }) => {
  // const [auth, setAuth] = useState(isAuth);
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  // const { isAuthorizationOpen } = useSelector(appHeaderViewSelector);

  const handleOnAccept = useCallback(() => {
    // dispatch(switchAdminHere(auth));
    // if (login === 'admin' && password === 'admin') {
    //   setAuth(true);
    // } else {
    //   alert('Вы не админ');
    //   setAuth(false);
    //   dispatch(switchAuthorization(false));
    // }
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
