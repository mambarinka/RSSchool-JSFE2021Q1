import { App } from './app';
import { createCar, deleteCar, getCar, updateCar } from './fetch-api/fetch-api-garage';
import { Car } from './models/models';
import './style.scss';

// ВРЕМЕННО
// const newCar1: Car = {
//   name: 'Lada',
//   color: 'green',
// };

const newCar2: Car = {
  name: 'Ferrari',
  color: 'light-blue',
  id: 6,
};

// const newCar3: Car = {
//   name: 'Suzuki',
//   id: 7,
// };

const main = async () => {
  // const cars = await getCars(1, 4);
  // console.log('Cars:', cars);
  // const car = await getCar(10);
  // console.log('Car:', car);
  // const newCar = await createCar(newCar2);
  // console.log('New car:', newCar);
  const updCar = await updateCar(1, newCar2);
  // console.log('Update car:', updCar);
  // const updCarProp = await updateCarProp(10, newCar3);
  // console.log('Update car prop:', updCarProp);
  // const deleteOneCar = await deleteCar(6);
  // console.log('Delete car:', deleteOneCar);
};

// main();

// window.onload = () => {
//   renderGame();
//   console.log('lol');
// }

window.onload = () => {
  const application = new App(document.body);
  application.render();

  // document.addEventListener('createCar', async (evt: CustomEventInit) => {
  //   await getCar(evt.detail);

  //   console.log(evt.detail);
  // })
};
