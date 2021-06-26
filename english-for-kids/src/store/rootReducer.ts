import { combineReducers } from 'redux';

import { app } from '@/App/reducers';
import { main } from '@/pages/Main/reducer';
import { appHeaderView } from '@/App/AppHedaer/AppHeaderView/reducers';

export default combineReducers({
  app,
  main,
  appHeaderView,
});
