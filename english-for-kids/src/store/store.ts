import 'isomorphic-fetch';
import { createStore, applyMiddleware, compose } from 'redux';
//@ts-ignore
import { createActionsEnhancer } from 'redux-reducer-actions';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/fetch';
import { createLogger } from 'redux-logger';

import rootReducer from './rootReducer';

const { requestsMiddleware } = handleRequests({
  driver: createDriver(window.fetch, {
    baseURL: 'http://localhost:3000',
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

const store = createStore(rootReducer, compose(actionEnchancer, enhancer));

export function configureStore() {
  return {
    ...store,
  };
}