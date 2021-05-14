import './style.scss';
import './assets/images/logo.svg';
import { App } from './app';

window.onload = () => {
  //   const appElement = document.querySelector('.page-main') as HTMLElement;
  // if (!appElement) {
  //   throw Error('App root element dont found');
  // }

  // new App(appElement);

  //  newElement.cardsField;

  new App(document.body).start();
};
