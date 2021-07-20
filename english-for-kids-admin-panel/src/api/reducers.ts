import {
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  getCategories,
  getCategoriesActionCreator,
  GET_CATEGORIES_SUCCESS,
  IApiActions,
  updateCategoryActionCreator,
  UPDATE_CATEGORY_SUCCESS,
} from './actions';

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

    case UPDATE_CATEGORY_SUCCESS: {
      const {
        response: { data },
      } = action;
      console.log('data', data);
      const actions = [updateCategoryActionCreator()];
      return {
        ...state,
        data: state.data.map((item: { id: any }) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        }),
        // data: state.data.filter((category: { id: any }) => category.id !== data.id).concat(data),
        actions,
      };
    }

    case DELETE_CATEGORY_SUCCESS: {
      const {
        response: { data },
      } = action;

      return {
        ...state,
        data: state.data.filter((category: { id: any }) => category.id !== data),
      };
    }

    case CREATE_CATEGORY_SUCCESS: {
      const {
        response: { data },
      } = action;

      return {
        ...state,
        data: [...state.data, data],
      };
    }

    default:
      return state;
  }
}
