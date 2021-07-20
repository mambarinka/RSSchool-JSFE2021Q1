// import { TEST_REQUEST_ENDPOINT } from "@/api/endpoints";
import { IApiAction, IApiActionError, IApiActionSuccess } from '@/api/ApiAction';

import { Category } from '@/models/models';
import { CATEGORIES_ENDPOINT } from './endpoints';

// export const TEST_ACTION = "TEST_ACTION";
export const TEST_ACTION_SUCCESS = 'TEST_ACTION_SUCCESS';
export const TEST_ACTION_ERROR = 'TEST_ACTION_ERROR';
// export const CREATE_CATEGORY_ACTION = 'CREATE_CATEGORY_ACTION';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';

// export interface IGetData extends IApiAction {
//   type: typeof TEST_ACTION;
// }

export interface IGetDataSuccess extends IApiActionSuccess {
  type: typeof TEST_ACTION_SUCCESS;
}

export interface IGetDataError extends IApiActionError {
  type: typeof TEST_ACTION_ERROR;
}

// export const getData = (): IGetData => ({
//   type: TEST_ACTION,
//   request: {
//     url: TEST_REQUEST_ENDPOINT,
//   },
// });

// export const testActionCreator: () => {
//   type: string;
// } = () => ({
//   type: "TEST_ACTION",
// });

export interface IGetCategories extends IApiAction {
  type: typeof GET_CATEGORIES;
}
export interface IGetCategoriesSuccess extends IApiActionSuccess {
  type: typeof GET_CATEGORIES_SUCCESS;
}

export const getCategories = (): IGetCategories => ({
  type: GET_CATEGORIES,
  request: {
    url: CATEGORIES_ENDPOINT,
    method: 'GET',
  },
});

export const getCategoriesActionCreator: () => {
  type: string;
} = () => ({
  type: 'GET_CATEGORIES',
});

export interface IUpdateCategory extends IApiAction {
  type: typeof UPDATE_CATEGORY;
}
export interface IUpdateCategorySuccess extends IApiAction {
  type: typeof UPDATE_CATEGORY_SUCCESS;
}

export const updateCategory = (data: FormData): IUpdateCategory => ({
  type: UPDATE_CATEGORY,
  request: {
    url: CATEGORIES_ENDPOINT,
    method: 'PUT',
    body: data,
  },
});

export const updateCategoryActionCreator: () => {
  type: string;
} = () => ({
  type: 'UPDATE_CATEGORY',
});

export interface IDeleteCategory extends IApiAction {
  type: typeof DELETE_CATEGORY;
}
export interface IDeleteCategorySuccess extends IApiAction {
  type: typeof DELETE_CATEGORY_SUCCESS;
}

export const deleteCategory = (id: string): IDeleteCategory => ({
  type: DELETE_CATEGORY,
  request: {
    url: `${CATEGORIES_ENDPOINT}/${id}`,
    method: 'DELETE',
  },
});

export interface ICreateCategory extends IApiAction {
  type: typeof CREATE_CATEGORY;
}
export interface ICreateCategorySuccess extends IApiAction {
  type: typeof CREATE_CATEGORY_SUCCESS;
}

export const createCategory = (data: FormData): ICreateCategory => ({
  type: CREATE_CATEGORY,
  request: {
    url: CATEGORIES_ENDPOINT,
    method: 'POST',
    body: data,
  },
});

export type IApiActions =
  | IGetDataSuccess
  | IGetDataError
  | IGetCategories
  | IGetCategoriesSuccess
  | IUpdateCategory
  | IUpdateCategorySuccess
  | IDeleteCategory
  | IDeleteCategorySuccess
  | ICreateCategory
  | ICreateCategorySuccess;
