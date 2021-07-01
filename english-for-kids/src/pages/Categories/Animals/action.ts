import { AnyAction } from 'redux';

export const SET_SUCCESS_CLICK = 'SET_SUCCESS_CLICKS';
export const SET_ERROR_CLICK = 'SET_ERROR_CLICKS';

export interface ISetSuccessClicks extends AnyAction {
  type: typeof SET_SUCCESS_CLICK;
  payload: {
    category: string;
    card: string;
    trainMode?: {
      clicks?: number;
    };
    playMode?: {
      successClicks?: number;
      errorClicks?: number;
    };
  };
}

export const updateSuccessClicks = (category: string, card: string): ISetSuccessClicks => ({
  type: SET_SUCCESS_CLICK,
  payload: {
    category,
    card,
    playMode: {
      successClicks: 1,
    },
  },
});

export type IAnimalAction = ISetSuccessClicks;
