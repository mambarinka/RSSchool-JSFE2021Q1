import { AnyAction } from 'redux';

export const ADD_STAR = 'ADD_STAR';
export const CLEAR_ARRAY_STARS = 'CLEAR_ARRAY_STARS';

export interface IAddStar extends AnyAction {
  type: typeof ADD_STAR;
  payload: boolean;
}

export const addStar = (value: boolean): IAddStar => ({
  type: ADD_STAR,
  payload: value,
});

export interface IClearArrayStars extends AnyAction {
  type: typeof CLEAR_ARRAY_STARS;
}

export const clearArrayStars = (): IClearArrayStars => ({
  type: CLEAR_ARRAY_STARS,
});

export type IMainAction = IAddStar | IClearArrayStars;
