import { IApiAction, IApiActionSuccess } from '@/api/ApiAction';

import { CATEGORIES_ENDPOINT, WORDS_ENDPOINT } from './endpoints';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_WORD = 'CREATE_WORD';
export const CREATE_WORD_SUCCESS = 'CREATE_WORD_SUCCESS';
export const GET_WORDS = 'GET_WORDS';
export const GET_WORDS_SUCCESS = 'GET_WORDS_SUCCESS';
export const DELETE_WORD = 'DELETE_WORD';
export const DELETE_WORD_SUCCESS = 'DELETE_WORD_SUCCESS';
export const UPDATE_WORD = 'UPDATE_WORD';
export const UPDATE_WORD_SUCCESS = 'UPDATE_WORD_SUCCESS';

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
    mode: 'cors',
  },
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

export interface ICreateWord extends IApiAction {
  type: typeof CREATE_WORD;
}
export interface ICreateWordSuccess extends IApiAction {
  type: typeof CREATE_WORD_SUCCESS;
}

export const createWord = (data: FormData): ICreateWord => ({
  type: CREATE_WORD,
  request: {
    url: WORDS_ENDPOINT,
    method: 'POST',
    body: data,
  },
});

export interface IGetWords extends IApiAction {
  type: typeof GET_WORDS;
}
export interface IGetWordsSuccess extends IApiActionSuccess {
  type: typeof GET_WORDS_SUCCESS;
}

export const getWords = (): IGetWords => ({
  type: GET_WORDS,
  request: {
    url: WORDS_ENDPOINT,
    method: 'GET',
  },
});

export interface IDeleteWord extends IApiAction {
  type: typeof DELETE_WORD;
}
export interface IDeleteWordSuccess extends IApiAction {
  type: typeof DELETE_WORD_SUCCESS;
}

export const deleteWord = (id: string): IDeleteWord => ({
  type: DELETE_WORD,
  request: {
    url: `${WORDS_ENDPOINT}/${id}`,
    method: 'DELETE',
  },
});

export interface IUpdateWord extends IApiAction {
  type: typeof UPDATE_WORD;
}
export interface IUpdateWordSuccess extends IApiAction {
  type: typeof UPDATE_WORD_SUCCESS;
}

export const updateWord = (data: FormData): IUpdateWord => ({
  type: UPDATE_WORD,
  request: {
    url: WORDS_ENDPOINT,
    method: 'PUT',
    body: data,
  },
});

export type IApiActions =
  | IGetCategories
  | IGetCategoriesSuccess
  | IUpdateCategory
  | IUpdateCategorySuccess
  | IDeleteCategory
  | IDeleteCategorySuccess
  | ICreateCategory
  | ICreateCategorySuccess
  | ICreateWord
  | ICreateWordSuccess
  | IGetWords
  | IGetWordsSuccess
  | IDeleteWord
  | IDeleteWordSuccess
  | IUpdateWord
  | IUpdateWordSuccess;
