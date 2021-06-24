
import { IAppActions, TEST_ACTION_SUCCESS, testActionCreator } from './actions';


export interface IAppState {
  data: any;
}

export const initialState: IAppState = {
  data: []
};

export const appSelector = (state: { app: IAppState }) => state.app;

export function app(state = initialState, action: IAppActions) {
  switch (action.type) {
    case TEST_ACTION_SUCCESS: {
      const { response: { data } } = action;
      const actions = [testActionCreator()];
      return {
        ...state,
        data,
        actions,
      }
    }

    default:
      return state;
  }
}