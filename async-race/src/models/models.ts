export enum Path {
  garage = '/garage',
  engine = '/engine',
  winners = '/winners',
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface Car {
  name?: string;
  color?: string;
  id?: number;
  wins?: number;
  time?: number;
}

// export const getCurrentCountCars = async () => {
//   const currentCountCars = (await getCars()).countCars;
//   return currentCountCars;
// };

// export const getCurrentCarsPage = async () => {
//   const currentCarsPage = Math.ceil((await getCurrentCountCars()) / 7);
//   return currentCarsPage;
// };
