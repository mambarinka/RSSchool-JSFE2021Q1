import { baseURL } from '../models/constants';
import { Car, Method, Path, Winner } from '../models/models';
import { getCar } from './fetch-api-garage';

const getSortOrder = (sort?: string, order?: string) => {
  if (sort && order) {
    return `&_sort=${sort}&_order=${order}`;
  }
  return '';
};

export const getWinners = async (
  pageNumber = 1,
  limitCars = 10,
  sort?: string,
  order?: string
) => {
  const pathWinners: Path = Path.winners;
  const response = await fetch(
    `${baseURL}${pathWinners}?_page=${pageNumber}&_limit=${limitCars}${getSortOrder(
      sort,
      order
    )} `
  );
  // const response = await fetch(`${ baseURL } ${ pathGarage }?id = ${ id } `);
  const items: Winner[] = await response.json();
  const currentPage = Math.ceil(
    Number(response.headers.get('X-Total-Count')) / 10
  );

  // console.log({
  //   items: await Promise.all(
  //     items.map(async (winner: { id: number | undefined }) => ({
  //       ...winner,
  //       car: await getCar(winner.id),
  //     }))
  //   ),
  //   count: response.headers.get('X-Total-Count'),
  //   currentPage
  // });

  return {
    items: await Promise.all(
      items.map(async (winner: { id: number | undefined }) => ({
        ...winner,
        car: await getCar(winner.id),
      }))
    ),
    count: response.headers.get('X-Total-Count'),
    currentPage,
  };
};

export const getWinner = async (id: number) => {
  const pathWinners: Path = Path.winners;
  const response = await fetch(`${baseURL}${pathWinners}/${id}`);
  const winner = await response.json();

  return winner;
};

export const createWinner = async (car: Car) => {
  const pathWinners: Path = Path.winners;
  const response = await fetch(`${baseURL}${pathWinners}`, {
    method: Method.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const newWinner = await response.json();

  return newWinner;
};

export const deleteWinner = async (id: number) => {
  const pathWinners: Path = Path.winners;
  const response = await fetch(`${baseURL}${pathWinners}/${id}`, {
    method: Method.DELETE,
  });
  const delWinner = await response.json();

  return delWinner;
};

export const updateWinner = async (id: number, car: Car) => {
  const pathWinners: Path = Path.winners;
  const response = await fetch(`${baseURL}${pathWinners}/${id}`, {
    method: Method.PUT,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const updWinner = await response.json();

  return updWinner;
};

export const getWinnerStatus = async (id: number) => {
  const pathWinners: Path = Path.winners;
  const response = await fetch(`${baseURL}${pathWinners}/${id}`);
  const winnerStatus = response.status;

  return winnerStatus;
};

export const saveWinner = async (id: number, time: number) => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({ id, wins: 1, time });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins++,
      time: time < winner.time ? time : winner.time,
    });
  }
};
