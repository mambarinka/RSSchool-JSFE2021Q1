import { IMainAction, PLAYMODE, SWITCH_PLAYMODE } from './actions';

export const initialState: PLAYMODE = {
  isPlayMode: false,
};

export const appHeaderViewSelector: (state: { appHeaderView: PLAYMODE }) => PLAYMODE = (state: {
  appHeaderView: PLAYMODE;
}) => state.appHeaderView;

export function appHeaderView(state = initialState, action: IMainAction): PLAYMODE {
  switch (action.type) {
    case SWITCH_PLAYMODE: {
      const {
        payload: { isPlayMode },
      } = action;

      return {
        isPlayMode,
      };
    }
    default:
      return state;
  }
}
