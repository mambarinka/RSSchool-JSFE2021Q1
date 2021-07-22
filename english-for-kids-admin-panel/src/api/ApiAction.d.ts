import { AnyAction } from 'redux';

export interface IApiRequest {
  url: string;
  method?: string;
  body?: any;
  headers?: { [k: string]: any };
  responseType?: null | 'arraybuffer' | 'blob' | 'formData' | 'json' | 'text';
  mode?: any;
}

export interface IApiAction extends AnyAction {
  type: string;
  request: IApiRequest;
  meta?: any;
  mode?: any;
}

export interface IApiActionSuccess extends AnyAction {
  type: string;
  meta: {
    request: IApiRequest;
    [k: string]: any;
  };
  categories?: any;
  words?: any;
  data?: any;
}

export interface IApiActionError extends AnyAction {
  type: string;
  meta: {
    request: IApiRequest;
  };
  error: Response;
}
