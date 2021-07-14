import { createCategoryActionCreator, IAppActions, TEST_ACTION_ERROR, TEST_ACTION_SUCCESS } from './actions';

export interface IApiState {
  data: any;
  error: any;
}

export const initialState: IApiState = {
  data: [],
  error: [],
};

export const appSelector: (state: { app: IApiState }) => IApiState = (state: { app: IApiState }) => state.app;

export function app(
  state = initialState,
  action: IAppActions
):
  | IApiState
  | {
      data: any;
      actions: {
        type: string;
      }[];
    } {
  switch (action.type) {
    case TEST_ACTION_SUCCESS: {
      const {
        response: { data },
      } = action;
      const actions = [createCategoryActionCreator()];
      return {
        ...state,
        data,
        actions,
      };
    }
    case TEST_ACTION_ERROR: {
      const {
        response: { error },
      } = action;
      const actions = [createCategoryActionCreator()];
      return {
        ...state,
        error,
        actions,
      };
    }

    default:
      return state;
  }
}
