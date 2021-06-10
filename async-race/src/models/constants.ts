import { getCars } from '../fetch-api/fetch-api-garage';

export const baseURL = 'http://127.0.0.1:3000';

// const { dataCars: cars, countCars: countCars } = await getCars(1);
// const {dataCars: cars, countCars: countCars} = await getCars(1);

export const cars = (async () => (await getCars()).dataCars)();
export let countCars = (async () => (await getCars()).countCars)();

export default {
  cars,
  countCars,
};
