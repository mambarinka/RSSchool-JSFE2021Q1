import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import styles from 'App.scss';

import { configureStore } from '@/store/store';
import { AppHeader } from './AppHedaer';
import { Main } from '@/pages/Main';

const store = configureStore();

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
          {/* <div className={styles.content}> */}
            <AppHeader />
            {/* <div className={styles.contentCenter}> */}
              <Switch>
                <Route path="/main" component={Main} />
                <Redirect from="/" to="/main" />
              </Switch>
            {/* </div> */}
          {/* </div> */}
      </BrowserRouter>
    </Provider>
  );
};
