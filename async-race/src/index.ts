import { App } from './app';
import './style.scss';

window.onload = () => {
  const application = new App(document.body);
  application.render();
};
