import { drive, startEngine, stopEngine } from '../fetch-api/fetch-api-engine';
import { BaseComponent } from '../models/base-component';
import { Button } from '../models/base-component-button';
import { models, names } from '../models/constants';
import { Car } from '../models/models';

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
        window.requestAnimationFrame(step);
        // console.log('id animation1', car.id);
      }
    }

    idAnimation = window.requestAnimationFrame(step);
    // console.log('id animation2', car.id);
  } catch(error) {
    console.log(error);
  }

  return car.id;
}


export const startDriving = async (id: number | undefined, buttonStart: Button, buttonStop: Button, carIcon: HTMLElement, flag: HTMLElement, car: Car) => {
  try {
    buttonStart.button.disabled = true;
    buttonStart.button.classList.add('not-active');
    buttonStop.button.removeAttribute('disabled');
    buttonStop.button.classList.remove('not-active');

    const { velocity, distance } = await startEngine(id);
    const time = Math.round(distance / velocity);
    const htmlDistance = Math.floor(getDistanceBtwElements(carIcon, flag)) + 100;

    car.id = animation(carIcon, htmlDistance, time, car);
    setTimeout(() => {
      buttonStart.button.disabled = false;
      buttonStart.button.classList.remove('not-active');
      buttonStop.button.setAttribute('disabled', 'disabled');
      buttonStop.button.classList.add('not-active');
    }, time);
  } catch {

    const { success } = await drive(id!);
    if (!success) {
      window.cancelAnimationFrame(id!);
    }
  }
  return car.id;
}

export const stopDriving = async (id: number | undefined, buttonStop: Button, car: Car, buttonStart: Button, carIcon: BaseComponent) => {
  buttonStop.button.disabled = true;
  buttonStop.button.classList.add('not-active');
  console.log(idAnimation);
  console.log('id stop1', car.id);
  await stopEngine(idAnimation).catch(() => {
    carIcon.element.style.transform = `translateX(0px)`;
  });
  buttonStart.button.removeAttribute('disabled');
  buttonStart.button.classList.remove('not-active');
  console.log(car);
  carIcon.element.style.transform = `translateX(0px)`;
  if (car.id) {
    window.cancelAnimationFrame(idAnimation!);
  }
}
