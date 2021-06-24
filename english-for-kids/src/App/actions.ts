
import { TEST_REQUEST_ENDPOINT } from '@/api/endpoints';
import { IApiAction, IApiActionSuccess } from '@/api/ApiAction';

export const TEST_ACTION = 'TEST_ACTION';
export const TEST_ACTION_SUCCESS = 'TEST_ACTION_SUCCESS';

export interface IGetData extends IApiAction {
  type: typeof TEST_ACTION;
}

export interface IGetDataSuccess extends IApiActionSuccess {
  type: typeof TEST_ACTION_SUCCESS;
}

export const getData = (): IGetData => {
  return {
    type: TEST_ACTION,
    request: {
      url: TEST_REQUEST_ENDPOINT,
    },
  };
};

export const testActionCreator = () => {
  return {
    type: 'TEST_ACTION',
  };
}

export type IAppActions = 
  | IGetData
  | IGetDataSuccess
;