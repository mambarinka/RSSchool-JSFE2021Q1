import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { configureStore, persistor } from '@/store/store';
import { Main } from '@/pages/Main';
import { Auth } from '@/pages/Auth/Auth';
import { Fruits } from '@/pages/Categories/Fruits';
import { Animals } from '@/pages/Categories/Animals';
import { BodyParts } from '@/pages/Categories/Body-parts';
import { Clothes } from '@/pages/Categories/Clothes';
import { Colors } from '@/pages/Categories/Colors';
import { Profession } from '@/pages/Categories/Profession';
import { Emotion } from '@/pages/Categories/Emotion';
import { Numbers } from '@/pages/Categories/Numbers';
import { DifficultWords } from '@/pages/DifficultWords';
import { Statistics } from '@/pages/Statistics';
import { Categories } from '@/pages/Admin-panel/Categories';
import { appHeaderViewSelector } from './AppHedaer/AppHeaderView/reducers';
import { AppHeader } from './AppHedaer';
import { AppFooter } from './AppFooter';

const store = configureStore();

export const App: () => JSX.Element = () => (
  /* {
  const { isAuthorizationOpen } = useSelector(appHeaderViewSelector);
  return */ <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <AppHeader />
        <Switch>
          <Route path="/main" component={Main} />
          <Route path="/fruits" component={Fruits} />
          <Route path="/animals" component={Animals} />
          <Route path="/body-parts" component={BodyParts} />
          <Route path="/clothes" component={Clothes} />
          <Route path="/colors" component={Colors} />
          <Route path="/profession" component={Profession} />
          <Route path="/emotion" component={Emotion} />
          <Route path="/numbers" component={Numbers} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/difficult-words" component={DifficultWords} />
          <Route path="/admin-panel-categories" component={Categories} />
          {/* <Auth isOpen={isAuthorizationOpen}>
            <Route path="/admin-panel-categories" component={Categories} />
          </Auth> */}
          <Redirect from="/" to="/main" />
        </Switch>
        <AppFooter />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
/* }; */
