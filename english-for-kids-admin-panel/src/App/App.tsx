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

  // useEffect( async () => {
  //   // dispatch(getCategories()).then((arr: any) => {
  //   //   setArrayCategoryApi(arr.data);
  //   //   console.log('arr.data', arr.data);

  //   // });
  //   const arrCat=await getCategories();
  //   // dispatch( getCategories());
  //   // console.log(dispatch(getCategories()));
  //   // console.log(data);
  //   setArrayCategoryApi([]);
  // }, [dispatch, getCategories]);

  useEffect(() => {
    (async () => {
      const arrCat = await dispatch(await getCategories());
      console.log('arrCat', arrCat);
      // here i'm using the location from the first function
      setArrayCategoryApi(arrCat.data);

      // arrCat.data.map((item: { text: React.Key | null | undefined; id: React.Key | null | undefined }) => {
      //   console.log('item.text in APP', item.text);
      //   return item;
      // });
    })();
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
            {arrayCategoryApi!.map((item: any) => {
              console.log(item);
              const WrappedWords = function (
                props: JSX.IntrinsicAttributes & IWordsProps & { children?: React.ReactNode }
              ) {
                // Конструкция "{...props}" нужна, чтобы не потерять
                // параметры, переданные от компонента Route
                return <Words {...props} category={item.text} />;
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
