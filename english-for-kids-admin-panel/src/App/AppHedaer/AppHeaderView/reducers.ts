import { IHeaderViewAction, SWITCH_AUTHORIZATION, SWITCH_PLAYMODE } from './actions';

export interface IHeaderViewState {
  isPlayMode: boolean;
  isAuthorizationOpen: boolean;
}

export const initialState: IHeaderViewState = {
  isPlayMode: false,
  isAuthorizationOpen: false,
};

export const appHeaderViewSelector = (state: { appHeaderView: IHeaderViewState }) => state.appHeaderView;

export function appHeaderView(state = initialState, action: IHeaderViewAction) {
  switch (action.type) {
    case SWITCH_PLAYMODE: {
      const {
        payload: { isPlayMode },
      } = action;

      return {
        isPlayMode,
      };
    }

    case SWITCH_AUTHORIZATION: {
      const {
        payload: { isAuthorizationOpen },
      } = action;

      return {
        isAuthorizationOpen,
      };
    }

    default:
      return state;
  }
}
