import { IHeaderViewAction, PLAYMODE, SWITCH_ADMIN_HERE, SWITCH_AUTHORIZATION, SWITCH_PLAYMODE } from './actions';

export interface IHeaderViewState {
  isPlayMode: boolean;
  // isAuthorizationOpen: boolean;
  isAdminHere: boolean;
}

export const initialState: IHeaderViewState = {
  isPlayMode: false,
  // isAuthorizationOpen: false,
  isAdminHere: false,
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

    // case SWITCH_AUTHORIZATION: {
    //   const {
    //     payload: { isAuthorizationOpen },
    //   } = action;

    //   return {
    //     isAuthorizationOpen,
    //   };
    // }

    case SWITCH_ADMIN_HERE: {
      const {
        payload: { isAdminHere },
      } = action;

      return {
        isAdminHere,
      };
    }

    default:
      return state;
  }
}
