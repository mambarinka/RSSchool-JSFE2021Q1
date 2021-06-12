import { baseURL } from '../models/constants';
import { Car, Method, Path } from '../models/models';

export const getCars = async (pageNumber = 1, limitCars = 7) => {
  const pathGarage: Path = Path.garage;
  const response = await fetch(
    `${baseURL}${pathGarage}?_page=${pageNumber}&_limit=${limitCars}`
  );
  const dataCars = await response.json();
  const countCars = Number(response.headers.get('X-Total-Count'));
  const currentPage = Math.ceil(countCars / 7);

  return {
    dataCars,
    countCars,
    currentPage,
  };
};

export const getCar = async (id = 1) => {
  const pathGarage: Path = Path.garage;
  const response = await fetch(`${baseURL}${pathGarage}/${id}`);
  const dataCar = await response.json();

  return dataCar;
};

export const createCar = async (car: Car) => {
  const pathGarage: Path = Path.garage;
  const response = await fetch(`${baseURL}${pathGarage}`, {
    method: Method.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const dataCar = await response.json();

  return dataCar;
};

export const updateCar = async (id: number, car: Car) => {
  const pathGarage: Path = Path.garage;
  const response = await fetch(`${baseURL}${pathGarage}/${id}`, {
    method: Method.PUT,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const dataCar = await response.json();

  return dataCar;
};

export const updateCarProp = async (id: number, car: Car) => {
  const pathGarage: Path = Path.garage;
  const response = await fetch(`${baseURL}${pathGarage}/${id}`, {
    method: Method.PATCH,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const dataCar = await response.json();

  return dataCar;
};

export const deleteCar = async (id: number) => {
  const pathGarage: Path = Path.garage;
  const response = await fetch(`${baseURL}${pathGarage}/${id}`, {
    method: Method.DELETE,
  });
  const dataCar = await response.json();

  return dataCar;
};
