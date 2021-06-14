import { baseURL } from '../models/constants';
import { Path } from '../models/models';

export const startEngine = async (id: number | undefined) => {
  const pathEngine: Path = Path.engine;
  const response = await fetch(`${baseURL}${pathEngine}/?id=${id}&status=started`);
  const dataCar = await response.json();

  return dataCar;
};

export const stopEngine = async (id: number | undefined) => {
  const pathEngine: Path = Path.engine;
  const response = await fetch(`${baseURL}${pathEngine}/?id=${id}&status=stopped`);
  const dataCar = await response.json();

  return dataCar;
};

export const drive = async (id: number) => {

  const pathEngine: Path = Path.engine;
  const response = await fetch(
    `${baseURL}${pathEngine}/?id=${id}&status=drive`).catch();

  const dataCar = await response.json();
  const status = response.status;
  return status !== 200 ? { success: false } : { ...(await dataCar) };
  // return status !== 200 ? { success: false } : { ...{ dataCar } };
};

// export const drive = async (id: number) => {
//   try {
//     const pathEngine: Path = Path.engine;
//     const response = await fetch(
//       `${baseURL}${pathEngine}/?id=${id}&status=drive`
//     );
//     const dataCar = await response.json();
//     const status = response.status;
//     console.log(status);
//   } catch (error) {
//     console.error('its not OK from server')
//   }
// console.log(status);
//   return status !== '200' ? { success: false } : { success: true };
//   // return status !== 200 ? { success: false } : { ...{ dataCar } };
// };
