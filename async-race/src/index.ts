import { App } from './app';
import './style.scss';

window.onload = () => {
  const application = new App(document.body);
  application.render();

  // document.addEventListener('updateNumberCars', async (evt: CustomEventInit) => {
  //   //   const numberPage = (async () => (await getCars()).countCars)();
  //   //   console.log(numberPage);
  //   await console.log(evt.detail);
  //   });
};
