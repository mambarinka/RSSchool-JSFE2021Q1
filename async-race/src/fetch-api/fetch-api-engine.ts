import { baseURL } from '../models/constants';
import { Path } from '../models/models';

export const startEngine = async (id: number) => {
  const pathEngine: Path = Path.engine;
  const response = await fetch(`${baseURL}${pathEngine}?=${id}&status=started`);
  const dataCar = await response.json();

  return dataCar;
};

export const stopEngine = async (id: number) => {
  const pathEngine: Path = Path.engine;
  const response = await fetch(`${baseURL}${pathEngine}?=${id}&status=stopped`);
  const dataCar = await response.json();

  return dataCar;
};

export const drive = async (id: number) => {
  const pathEngine: Path = Path.engine;
  const response = await fetch(
    `${baseURL}${pathEngine}?=${id}&status=drive`
  ).catch();
  const dataCar = await response.json();

  return response.status !== 200 ? { success: false } : { ...{ dataCar } };
};
