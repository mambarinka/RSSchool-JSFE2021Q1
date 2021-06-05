import './style.scss';

const baseURL = 'http://127.0.0.1:3000';

enum Path {
  garage = '/garage',
  engine = '/engine',
  winners = '/winners'
}


// [{ x:'role', value: 'manager' }]
// const generateQueryString = (queryParams: Array = []) => queryParams.length
// ? `?${queryParams.map(x => `${x.key} = ${x.value}`).join('&')}`
// : '';


const getCars = async (pageNumber = 1, limitCars = 1) => {
  let pathGarage: Path = Path.garage;
  const response = await fetch(`${baseURL}${pathGarage}?_page=${pageNumber}&_limit=${limitCars}`);
  const dataCars = await response.json();

  const countCars = Number(response.headers.get('X-Total-Count'));
  // console.log(dataCars);
  return {
    dataCars,
    countCars
  }
}


const getCar = async (id = 1) => {
  let pathGarage: Path = Path.garage;
  const response = await fetch(`${baseURL}${pathGarage}?id=${id}`);
  const dataCar = await response.json();

  // console.log(dataCar);
  return dataCar;
}


export interface Car {
  name?: string,
  color?: string,
  id?: number
}

const newCar1: Car = {
  name: 'Lada',
  color: 'green'
};

const createCar = async (car: Car) => {
  let pathGarage: Path = Path.garage;
  const response = await fetch(`${baseURL}${pathGarage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car)
  });
  const dataCar = await response.json();

  // console.log(dataCar);
  return dataCar;
}


const newCar2: Car = {
  name: 'Ferrari',
  color: 'light-blue',
  id: 6
};

const updateCar = async (id: number, car: Car) => {
  let pathGarage: Path = Path.garage;
  const response = await fetch(`${baseURL}${pathGarage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car)
  });
  const dataCar = await response.json();

  // console.log(dataCar);
  return dataCar;
}

const newCar3: Car = {
  name: 'Suzuki',
  id: 7
};

const updateCarProp = async (id: number, car: Car) => {
  let pathGarage: Path = Path.garage;
  const response = await fetch(`${baseURL}${pathGarage}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car)
  });
  const dataCar = await response.json();

  // console.log(dataCar);
  return dataCar;
}
const deleteCar = async (id: number) => {
  let pathGarage: Path = Path.garage;
  const response = await fetch(`${baseURL}${pathGarage}/${id}`, {
    method: 'DELETE',
  });
  const dataCar = await response.json();

  // console.log(dataCar);
  return dataCar;
}

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
