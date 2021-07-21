import {
  CREATE_CATEGORY_SUCCESS,
  CREATE_WORD_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  DELETE_WORD_SUCCESS,
  getCategories,
  getCategoriesActionCreator,
  GET_CATEGORIES_SUCCESS,
  GET_WORDS_SUCCESS,
  IApiActions,
  updateCategoryActionCreator,
  UPDATE_CATEGORY_SUCCESS,
} from './actions';

export interface IApiState {
  categories: any;
  words: any;
  error: any;
}

export const initialState: IApiState = {
  categories: [],
  words: [],
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
        categories: data,
        actions,
      };
    }

    case UPDATE_CATEGORY_SUCCESS: {
      const {
        response: { data },
      } = action;
      // console.log('data', data);
      const actions = [updateCategoryActionCreator()];
      return {
        ...state,
        categories: state.categories.map((item: { id: any }) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        }),
        actions,
      };
    }

    case DELETE_CATEGORY_SUCCESS: {
      const {
        response: { data },
      } = action;

      return {
        ...state,
        categories: state.categories.filter((category: { id: any }) => category.id !== data),
      };
    }

    case CREATE_CATEGORY_SUCCESS: {
      const {
        response: { data },
      } = action;

      return {
        ...state,
        categories: [...state.categories, data],
      };
    }

    case GET_WORDS_SUCCESS: {
      const {
        response: { data },
      } = action;
      return {
        ...state,
        words: data,
      };
    }

    case CREATE_WORD_SUCCESS: {
      const {
        response: { data },
      } = action;
      state.words.push(data);
      return {
        ...state,
        // data,
        words: state.words,
      };
    }

    case DELETE_WORD_SUCCESS: {
      const {
        response: { data },
      } = action;

      return {
        ...state,
        words: state.words.filter((word: { id: any }) => word.id !== data),
      };
    }

    default:
      return state;
  }
}
