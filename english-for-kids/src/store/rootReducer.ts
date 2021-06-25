
import { combineReducers } from 'redux';

import { app } from '@/App/reducers';
import { main } from '@/pages/Main/reducer';

export default combineReducers({
  app,
  main
});