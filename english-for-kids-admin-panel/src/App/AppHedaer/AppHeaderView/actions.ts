import { AnyAction } from 'redux';

export const SWITCH_PLAYMODE = 'SWITCH_PLAYMODE';
export const SWITCH_AUTHORIZATION = 'SWITCH_AUTHORIZATION';
export const SWITCH_ADMIN_HERE = 'SWITCH_ADMIN_HERE';

export interface PLAYMODE {
  isPlayMode: boolean;
}

export interface AUTHORIZATION {
  isAuthorizationOpen: boolean;
}

export interface ADMINHERE {
  isAdminHere: boolean;
}

export interface ISwitchPlayMode extends AnyAction {
  type: typeof SWITCH_PLAYMODE;
  payload: {
    isPlayMode: boolean;
  };
}

export const switchPlayMode = (playModeValue: boolean): ISwitchPlayMode => ({
  type: SWITCH_PLAYMODE,
  payload: {
    isPlayMode: playModeValue,
  },
});

export interface ISwitchAuthorization extends AnyAction {
  type: typeof SWITCH_AUTHORIZATION;
  payload: {
    isAuthorizationOpen: boolean;
  };
}

export const switchAuthorization = (AuthorizationValue: boolean): ISwitchAuthorization => ({
  type: SWITCH_AUTHORIZATION,
  payload: {
    isAuthorizationOpen: AuthorizationValue,
  },
});

// export interface ISwitchAdminHere extends AnyAction {
//   type: typeof SWITCH_ADMIN_HERE;
//   payload: {
//     isAdminHere: boolean;
//   };
// }

// export const switchAdminHere = (AdminHere: boolean): ISwitchAdminHere => ({
//   type: SWITCH_ADMIN_HERE,
//   payload: {
//     isAdminHere: AdminHere,
//   },
// });

export type IHeaderViewAction = ISwitchPlayMode | ISwitchAuthorization /* ISwitchAdminHere */;
