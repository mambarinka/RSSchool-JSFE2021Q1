import { getCategoriesActionCreator, GET_CATEGORIES_SUCCESS, IApiActions } from './actions';

export interface IApiState {
  data: any;
  error: any;
}

export const initialState: IApiState = {
  data: [],
  error: [],
};

export const apiSelector: (state: { api: IApiState }) => IApiState = (state: { api: IApiState }) => state.api;

export function api(
  state = initialState,
  action: IApiActions
):
  | IApiState
  | {
      data: any;
      actions: {
        type: string;
      }[];
    } {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS: {
      const {
        response: { data },
      } = action;
      const actions = [getCategoriesActionCreator()];
      return {
        ...state,
        data,
        actions,
      };
    }

    default:
      return state;
  }
}
