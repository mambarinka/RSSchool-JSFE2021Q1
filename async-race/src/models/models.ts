export enum Path {
  garage = '/garage',
  engine = '/engine',
  winners = '/winners'
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export interface Car {
  name?: string,
  color?: string,
  id?: number,
  wins?: number,
  time?: number
}


