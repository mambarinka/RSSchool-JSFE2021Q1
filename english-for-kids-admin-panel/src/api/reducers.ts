import {
  CREATE_CATEGORY_SUCCESS,
  CREATE_WORD_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  DELETE_WORD_SUCCESS,
  GET_CATEGORIES_SUCCESS,
  GET_WORDS_SUCCESS,
  IApiActions,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_WORD_SUCCESS,
} from './actions';

export interface IApiState {
  categories: any[];
  words: any[];
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
      return {
        ...state,
        categories: data,
      };
    }

    case UPDATE_CATEGORY_SUCCESS: {
      const {
        response: { data },
      } = action;
      return {
        ...state,
        categories: state.categories.map((item: { id: any }) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        }),
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

    case UPDATE_WORD_SUCCESS: {
      const {
        response: { data },
      } = action;
      return {
        ...state,
        words: state.words.map((item: { id: any }) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        }),
      };
    }

    default:
      return state;
  }
}
