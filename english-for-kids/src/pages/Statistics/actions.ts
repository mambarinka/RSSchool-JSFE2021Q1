import { AnyAction } from 'redux';

export const SET_SUCCESS_CLICK = 'SET_SUCCESS_CLICKS';
export const SET_ERROR_CLICK = 'SET_ERROR_CLICKS';
export const SET_TRAIN_CLICK = 'SET_TRAIN_CLICK';

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

export interface ISetErrorClicks extends AnyAction {
  type: typeof SET_ERROR_CLICK;
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

export const updateErrorClicks = (category: string, card: string): ISetErrorClicks => ({
  type: SET_ERROR_CLICK,
  payload: {
    category,
    card,
    playMode: {
      errorClicks: 1,
    },
  },
});

export interface ISetTrainClicks extends AnyAction {
  type: typeof SET_TRAIN_CLICK;
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

export const updateTrainClicks = (category: string, card: string): ISetTrainClicks => ({
  type: SET_TRAIN_CLICK,
  payload: {
    category,
    card,
    trainMode: {
      clicks: 1,
    },
  },
});

export type IAnimalAction = ISetSuccessClicks | ISetErrorClicks | ISetTrainClicks;
