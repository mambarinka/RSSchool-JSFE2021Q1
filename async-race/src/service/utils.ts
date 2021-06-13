import { drive, startEngine, stopEngine } from '../fetch-api/fetch-api-engine';
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


export const startDriving = async (id: number | undefined, buttonStart: Button, buttonStop: Button, carIcon: HTMLElement, flag: HTMLElement, car: Car) => {

  buttonStart.button.disabled = true;
  buttonStart.button.classList.add('not-active');
  buttonStop.button.removeAttribute('disabled');
  buttonStop.button.classList.remove('not-active');
  let time: number;
  let htmlDistance: number;
  let lol: State;
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
    lol = animation(carIcon, htmlDistance, time, car);

  }).then(async () => {

    const status = await drive(id!);
  }).catch(() => {

    console.log('undefinedddddddddd');
    window.cancelAnimationFrame(lol.id!);
    console.error(`двигатель сломался`)
  })

  return car.id;
}


export const stopDriving = async (id: number | undefined, buttonStop: Button, car: Car, buttonStart: Button, carIcon: BaseComponent) => {
  try {
    buttonStop.button.disabled = true;
    buttonStop.button.classList.add('not-active');
    console.log(idAnimation);
    console.log('id stop1', car.id);
    await stopEngine(idAnimation).then(() => {
      carIcon.element.style.transform = `translateX(0px)`;
      buttonStart.button.removeAttribute('disabled');
      buttonStart.button.classList.remove('not-active');
      console.log(car);
      carIcon.element.style.transform = `translateX(0px)`;
      if (car.id) {
        console.log('yessssssssssssssssssssssssssssssssssssssssssssss');
        window.cancelAnimationFrame(idAnimation!);
        carIcon.element.style.transform = `translateX(0px)`;
      }
    });
  } catch (error) {
    console.error(`проблема с остановкой машины: ${error}`);
  } finally {
    carIcon.element.style.transform = `translateX(0px)`;
  }
}

// export const raceAll = async (promises, ids) => {

// }
