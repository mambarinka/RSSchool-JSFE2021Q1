import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor } from '@/store/store';
import { Main } from '@/pages/Main';
import { Auth } from '@/pages/Auth/Auth';
import { DifficultWords } from '@/pages/DifficultWords';
import { Statistics } from '@/pages/Statistics';
import { Categories } from '@/pages/Admin-panel/Categories';
import { getCategories } from '@/api/actions';
import { BaseComponentCategory } from '@/pages/BaseComponentCategory';
import { IBaseComponentCategoryProps } from '@/pages/BaseComponentCategory/BaseComponentCategory';
import { AppHeader } from './AppHedaer';
import { AppFooter } from './AppFooter';

export const App = () => {
  const dispatch = useDispatch();
  const [arrayCategoryApi, setArrayCategoryApi] = useState([]);

  useEffect(() => {
    dispatch(getCategories()).then((arr: any) => setArrayCategoryApi(arr.data));
  }, [dispatch]);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Auth>
          <AppHeader />
          <Switch>
            <Route path="/main" component={Main} />
            {arrayCategoryApi!.map((item: { text: PropsWithChildren<IBaseComponentCategoryProps>; id: string }) => (
              <Route
                path={`/${item.text}`}
                key={item.id}
                render={(props: any) => <BaseComponentCategory {...props} category={item.text} />}
              />
            ))}
            <Route path="/statistics" component={Statistics} />
            <Route path="/difficult-words" component={DifficultWords} />
            <Route path="/admin-panel-categories" component={Categories} />
            <Redirect from="/" to="/main" />
          </Switch>
          <AppFooter />
        </Auth>
      </BrowserRouter>
    </PersistGate>
  );
};
