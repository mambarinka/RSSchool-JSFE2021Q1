import { createCar } from './fetch-api/fetch-api-garage';
import { Car } from './models/models';
import './style.scss';

//ВРЕМЕННО
const newCar1: Car = {
  name: 'Lada',
  color: 'green'
};

const newCar2: Car = {
  name: 'Ferrari',
  color: 'light-blue',
  id: 6
};

const newCar3: Car = {
  name: 'Suzuki',
  id: 7
};

const main = async () => {
  // const cars = await getCars(1, 4);
  // console.log('Cars:', cars);
  // const car = await getCar(10);
  // console.log('Car:', car);
  const newCar = await createCar(newCar1);
  console.log('New car:', newCar);
  // const updCar = await updateCar(6, newCar2);
  // console.log('Update car:', updCar);
  // const updCarProp = await updateCarProp(10, newCar3);
  // console.log('Update car prop:', updCarProp);
  // const deleteOneCar = await deleteCar(11);
  // console.log('Delete car:', deleteOneCar);
}

main();
