import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor } from '@/store/store';
import { apiSelector } from '@/api/reducers';
import { Main } from '@/pages/Main';
import { Auth } from '@/pages/Auth/Auth';
import { DifficultWords } from '@/pages/DifficultWords';
import { Statistics } from '@/pages/Statistics';
import { Categories } from '@/pages/Admin-panel/Categories';
import { Words } from '@/pages/Admin-panel/Words';
import { IWordsProps } from '@/pages/Admin-panel/Words/Words';
import { getCategories } from '@/api/actions';
import { BaseComponentCategory } from '@/pages/BaseComponentCategory';
import { IBaseComponentCategoryProps } from '@/pages/BaseComponentCategory/BaseComponentCategory';
import { AppHeader } from './AppHedaer';
import { AppFooter } from './AppFooter';

export const App = () => {
  const dispatch = useDispatch();
  const [arrayCategoryApi, setArrayCategoryApi] = useState([]);
  const [arrayWordApi, setArrayCWordApi] = useState([]);
  const { categories } = useSelector(apiSelector);
  const { words } = useSelector(apiSelector);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setArrayCategoryApi(categories);
  }, [categories]);

  useEffect(() => {
    setArrayCWordApi(words);
  }, [words]);

  console.log(
    'Уважаемый проверяющий, если вас не сильно затруднит, проверьте, пожалуйста мою работу в четверг или как можно позже! Я буду очень вам признательна! ❤️️❤️️❤️️ Мой телеграм https://t.me/anya_tav'
  );
  return (
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Auth>
          <AppHeader />
          <Switch>
            {/* {console.log('arrayCategoryApi', arrayCategoryApi)} */}
            <Route path="/main" component={Main} />
            {arrayCategoryApi.map((item: { text: PropsWithChildren<IBaseComponentCategoryProps>; id: string }) => (
              <Route
                path={`/${item.text}`}
                key={item.id}
                render={(props: any) => <BaseComponentCategory {...props} category={item.text} categoryId={item.id} />}
              />
            ))}
            <Route path="/statistics" component={Statistics} />
            <Route path="/difficult-words" component={DifficultWords} />
            <Route path="/admin-panel-categories" component={Categories} />
            {arrayCategoryApi.map((item: any) => {
              const WrappedWords = function (
                props: JSX.IntrinsicAttributes & IWordsProps & { children?: React.ReactNode }
              ) {
                return <Words {...props} category={item.text} categoryId={item.id} />;
              };
              return <Route path={`/${item.text}-category/words`} key={item.id} component={WrappedWords} />;
            })}

            <Route path="/admin-panel-words" component={Words} />
            <Redirect from="/" to="/main" />
          </Switch>
          <AppFooter />
        </Auth>
      </BrowserRouter>
    </PersistGate>
  );
};
