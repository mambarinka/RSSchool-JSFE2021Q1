import './style.scss';
import './assets/images/user-img.svg';
import './assets/images/how-to-play-game.png';
import './assets/images/how-to-play-register.png';
import './assets/images/how-to-play-settings.png';
import './assets/images/logo.svg';
import { App } from './app/app';

window.onload = () => {
  const application = new App(document.body);
  application.render();
  application.start();
};
