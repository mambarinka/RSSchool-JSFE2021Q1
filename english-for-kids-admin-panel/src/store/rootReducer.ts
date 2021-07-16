import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { api } from '@/api/reducers';
import { app } from '@/App/reducers';
import { main } from '@/pages/Main/reducer';
import { statistics } from '@/pages/Statistics/reducers';
import { appHeaderView } from '@/App/AppHedaer/AppHeaderView/reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  api,
  app,
  main,
  appHeaderView,
  statistics,
});

export default persistReducer(persistConfig, rootReducer);
