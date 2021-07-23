import { IMainAction, ADD_STAR, CLEAR_ARRAY_STARS } from './actions';

export interface Category {
  value: string;
  cards: string[];
  translate: string[];
  shuffleCards: string[];
}

export interface IMainState {
  categories?: any;
  arrayStars: boolean[];
}

export const initialState: IMainState = {
  arrayStars: [],
};

export const mainSelector: (state: { main: IMainState }) => IMainState = (state: { main: IMainState }) => state.main;

export function main(state = initialState, action: IMainAction): IMainState {
  switch (action.type) {
    case ADD_STAR: {
      const { payload } = action;

      return {
        ...state,
        arrayStars: [...state.arrayStars, payload],
      };
    }
    case CLEAR_ARRAY_STARS: {
      return {
        ...state,
        arrayStars: [],
      };
    }

    default:
      return state;
  }
}
