import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import { configureStore } from "@/store/store";
import { Main } from "@/pages/Main";
import { Fruits } from "@/pages/Categories/Fruits";
import { AppHeader } from "./AppHedaer";

const store = configureStore();

export const App: () => JSX.Element = () => (
  <Provider store={store}>
    <BrowserRouter>
      {/* <div className={styles.content}> */}
      <AppHeader />
      {/* <div className={styles.contentCenter}> */}
      <Switch>
        <Route path="/main" component={Main} />
        <Route path="/fruits" component={Fruits} />
        <Redirect from="/" to="/main" />
      </Switch>
      {/* </div> */}
      {/* </div> */}
    </BrowserRouter>
  </Provider>
);

// <Route path='/animals' component={CategoryAnimals} />
//                 <Route path='/body-parts' component={CategoryBodyParts} />
//                 <Route path='/clothes' component={CategoryClothes} />
//                 <Route path='/colors' component={CategoryColors} />
//                 <Route path='/profession' component={CategoryProfession} />
//                 <Route path='/emotion' component={CategoryEmotion} />
//                 <Route path='/numbers' component={CategoryNumbers} />
//                 <Route path='/statistics' component={Statistics} />
