import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import { configureStore } from '@/store/store';
import { Main } from '@/pages/Main';
import { Fruits } from '@/pages/Categories/Fruits';
import { Animals } from '@/pages/Categories/Animals';
import { BodyParts } from '@/pages/Categories/Body-parts';
import { Clothes } from '@/pages/Categories/Clothes';
import { Colors } from '@/pages/Categories/Colors';
import { Profession } from '@/pages/Categories/Profession';
import { Emotion } from '@/pages/Categories/Emotion';
import { Numbers } from '@/pages/Categories/Numbers';
import { AppHeader } from './AppHedaer';

const store = configureStore();

export const App: () => JSX.Element = () => (
  <Provider store={store}>
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
        <Redirect from="/" to="/main" />
      </Switch>
    </BrowserRouter>
  </Provider>
);

//                 <Route path='/statistics' component={Statistics} />
