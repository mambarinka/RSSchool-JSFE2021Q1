import { baseURL } from '../models/constants';
import { Path } from '../models/models';

export const startEngine = async (
  id: number | undefined
): Promise<{ velocity: number; distance: number }> => {
  const pathEngine: Path = Path.engine;
  const response = await fetch(
    `${baseURL}${pathEngine}/?id=${id}&status=started`
  );
  const dataCar = await response.json();
  return dataCar;
};

export const stopEngine = async (
  id: number | undefined
): Promise<{ velocity: number; distance: number }> => {
  const pathEngine: Path = Path.engine;
  const response = await fetch(
    `${baseURL}${pathEngine}/?id=${id}&status=stopped`
  );
  const dataCar = await response.json();
  return dataCar;
};

export const drive = async (id: number): Promise<boolean> => {
  const pathEngine: Path = Path.engine;
  const response = await fetch(
    `${baseURL}${pathEngine}/?id=${id}&status=drive`
  );

  if (response.status === 200) {
    const dataCar = await response.json();
    return dataCar.success;
  }
  if (response.status === 500) {
    return false;
  }

  return false;
};
