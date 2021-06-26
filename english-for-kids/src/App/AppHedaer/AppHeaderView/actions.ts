import { AnyAction } from "redux";

export const SWITCH_PLAYMODE = "SWITCH_PLAYMODE";

export interface PLAYMODE {
  isPlayMode: boolean;
}

export interface ISwitchMode extends AnyAction {
  type: typeof SWITCH_PLAYMODE;
  payload: {
    isPlayMode: boolean;
  };
}

export const switchPlayMode = (playModeValue: boolean): ISwitchMode => ({
  type: SWITCH_PLAYMODE,
  payload: {
    isPlayMode: playModeValue,
  },
});

export type IMainAction = ISwitchMode;
