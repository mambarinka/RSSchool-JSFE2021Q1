import { drive, startEngine, stopEngine } from '../fetch-api/fetch-api-engine';
import { getCars } from '../fetch-api/fetch-api-garage';
import { BaseComponent } from '../models/base-component';
import { Button } from '../models/base-component-button';
import { models, names } from '../models/constants';
import { Car, State } from '../models/models';

export const getRandomName = () => {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  return `${model} ${name}`;
};

export const getRandomColor = () => {
  const letters = '0123456789abcdef';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRandomCars = (count = 100) =>
  new Array(count)
    .fill(1)
    .map((_) => ({ name: getRandomName(), color: getRandomColor() }));

export const getPositionCenter = (element: HTMLElement) => {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2
  }
}

export const getDistanceBtwElements = (a: HTMLElement, b: HTMLElement) => {
  const aPosition = getPositionCenter(a);
  const bPosition = getPositionCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

export let idAnimation: number | undefined;

export const animation = (carIcon: HTMLElement, distance: number, timeAnimation: number, car: Car) => {
  let state: State = {};
  try {
    let start: number | null = null;

    function step(timeStamp: number) {
      if (!start) {
        start = timeStamp;
      }

      const time = timeStamp - start;
      const passed = Math.round(time * (distance / timeAnimation));
      carIcon.style.transform = `translateX(${Math.min(passed, distance)}px)`;
      idAnimation = car.id;
      if (passed < distance) {

        state.id = window.requestAnimationFrame(step);
      }
    }
    state.id = window.requestAnimationFrame(step);
  } catch (error) {
    console.log(error);
  }
  return state;
}
let state: State = {};
export default state;

export const startDriving = async (id: number | undefined, buttonStart: Button, buttonStop: Button, carIcon: HTMLElement, flag: HTMLElement, car: Car) => {
  buttonStart.button.disabled = true;
  buttonStart.button.classList.add('not-active');
  buttonStop.button.removeAttribute('disabled');
  buttonStop.button.classList.remove('not-active');
  let time: number;
  let htmlDistance: number;
  // let state: State;
  await startEngine(id).then((dataCar) => {
    time = Math.round(dataCar.distance / dataCar.velocity);
    htmlDistance = Math.floor(getDistanceBtwElements(carIcon, flag)) + 100;
    setTimeout(() => {
      buttonStart.button.disabled = false;
      buttonStart.button.classList.remove('not-active');
      buttonStop.button.setAttribute('disabled', 'disabled');
      buttonStop.button.classList.add('not-active');
    }, time);
  }).then(() => {
    state = animation(carIcon, htmlDistance, time, car);
    // console.log(state.id!);
  }).then(async () => {
    // const status = await drive(car.id!).catch((error) => {
    //     console.log(`errrooorrr`);
    //     window.cancelAnimationFrame(state.id!);
    //   });
    const status = await drive(id!);
  }).catch((error) => {
    // console.log(state.id!);
    window.cancelAnimationFrame(state.id!);
    console.error(`что-то происходит: ${error}`)
  })
  console.log(state.id);
  return car.id;
}


export const stopDriving = async (id: number | undefined, buttonStop: Button, car: Car, buttonStart: Button, carIcon: BaseComponent) => {
  console.log(state.id);
  buttonStop.button.disabled = true;
  buttonStop.button.classList.add('not-active');
  await stopEngine(id).then(() => {
    carIcon.element.style.transform = `translateX(0px)`;
    buttonStart.button.removeAttribute('disabled');
    buttonStart.button.classList.remove('not-active');
    if (car.id) {
      console.log('yessssssssssssssssssssssssssssssssssssssssssssss');
      carIcon.element.style.transform = `translateX(0px)`;
    }
    window.cancelAnimationFrame(state.id!);
  })/* .catch(() => {
    window.cancelAnimationFrame(state.id!);
    console.error(`пользователь остановил машину`)
  }); */
}

// export const raceAll = async (promises, ids) => {

// }
