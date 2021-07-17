import 'isomorphic-fetch';
import { createStore, applyMiddleware, compose } from 'redux';
import { createActionsEnhancer } from 'redux-reducer-actions';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/fetch';
import { createLogger } from 'redux-logger';

import { persistStore } from 'redux-persist';
import rootReducer from './rootReducer';

const { requestsMiddleware } = handleRequests({
  driver: createDriver(window.fetch, {
    // baseURL: 'http://localhost:3000/',
    baseURL: 'https://server-english-for-kids.herokuapp.com/',
  }),
});

const logger = createLogger({
  collapsed: true,
  diff: true,
});

const isDev = process.env.NODE_ENV !== 'production';

const middlewares = [];

middlewares.push(...requestsMiddleware);

if (isDev) {
  middlewares.push(logger);
}

const enhancer = applyMiddleware(...middlewares);

const actionEnchancer = createActionsEnhancer({});

export const store = createStore(rootReducer, compose(actionEnchancer, enhancer));

export const persistor = persistStore(store);

export function configureStore() {
  return {
    ...store,
    ...persistStore,
  };
}
