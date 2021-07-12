// import { TEST_REQUEST_ENDPOINT } from '@/api/endpoints';
// import { IApiAction, IApiActionSuccess } from '@/api/ApiAction';

import { Category } from "@/models/models";
import { IApiAction } from "./ApiAction";
import { CATEGORIES_ENDPOINT } from "./endpoints";

// export const TEST_ACTION = 'TEST_ACTION';
// export const TEST_ACTION_SUCCESS = 'TEST_ACTION_SUCCESS';
export const CREATE_CATEGORY_ACTION = 'CREATE_CATEGORY_ACTION';

// export interface IGetData extends IApiAction {
//   type: typeof TEST_ACTION;
// }

// export interface IGetDataSuccess extends IApiActionSuccess {
//   type: typeof TEST_ACTION_SUCCESS;
// }

// export const getData = (): IGetData => ({
//   type: TEST_ACTION,
//   request: {
//     url: TEST_REQUEST_ENDPOINT,
//   },
// });

// export const testActionCreator: () => {
//   type: string;
// } = () => ({
//   type: 'TEST_ACTION',
// });

// export type IAppActions = IGetData | IGetDataSuccess;

export interface ICreateCategory extends IApiAction {
  type: typeof CREATE_CATEGORY_ACTION;
}

export const createCategory = (category: Category): ICreateCategory => ({
  type: CREATE_CATEGORY_ACTION,
  request: {
    url: CATEGORIES_ENDPOINT,
    method: 'POST',
    body: JSON.stringify(category),
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'formData',
  },
});