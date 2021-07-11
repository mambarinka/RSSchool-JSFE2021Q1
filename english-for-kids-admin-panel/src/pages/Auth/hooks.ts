import { useState, useCallback } from 'react';

export const useAuth = () => {
  const [auth, setAuth] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleOnAccept = useCallback(() => {
    if (login === 'admin' && password === 'admin') {
      setAuth(true);
      return;
    }
    alert('Уходи с моей полянки');
  }, [login, password]);

  const onChangeLogin = useCallback((value: string) => {
    setLogin(value);
  }, []);

  const onChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  return {
    auth,
    handleOnAccept,
    onChangeLogin,
    onChangePassword,
  };
};
