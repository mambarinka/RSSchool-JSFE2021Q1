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
                {/* <Route path="/fruits" component={CategoryFruits} />
                <Route path="/animals" component={CategoryAnimals} />
                <Route path="/body-parts" component={CategoryBodyParts} />
                <Route path="/clothes" component={CategoryClothes} />
                <Route path="/colors" component={CategoryColors} />
                <Route path="/profession" component={CategoryProfession} />
                <Route path="/emotion" component={CategoryEmotion} />
                <Route path="/numbers" component={CategoryNumbers} /> 
                <Route path="/statistics" component={Statistics} />  */}
                <Redirect from="/" to="/main" />
              </Switch>
            {/* </div> */}
          {/* </div> */}
      </BrowserRouter>
    </Provider>
  );
};
