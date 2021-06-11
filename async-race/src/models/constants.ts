import { getCars } from '../fetch-api/fetch-api-garage';

export const baseURL = 'http://127.0.0.1:3000';
export const totalCarsOnPage = 7;

export const models = ['Mazda', 'Toyota', 'Subaru', 'Kia', 'Honda', 'Lexus', 'Tesla', 'Nissan', 'Ferrari', 'BMW', 'VolksWagen', 'Porsche', 'Mercedes', 'Corvette', 'Audi', 'Bugatti'];
export const names = ['Veyron', 'R8', 'ZR1', '458', '320d', 'S-Class', '911', 'GT-R', 'CX-30', 'Golf'];

// const { dataCars: cars, countCars: countCars } = await getCars(1);
// const {dataCars: cars, countCars: countCars} = await getCars(1);

// export const cars = (async () => (await getCars()).dataCars)();
// export let countCars = (async () => (await getCars()).countCars)();

export default {
  // cars,
  // countCars,
};
