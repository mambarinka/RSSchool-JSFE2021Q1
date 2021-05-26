import './style.scss';
import './assets/images/user-img.svg';
import './assets/images/how-to-play-game.png';
import './assets/images/how-to-play-register.png';
import './assets/images/how-to-play-settings.png';
import './assets/images/logo.svg';
import './assets/images/best-score-avatar1.png';
import './assets/images/best-score-avatar2.png';
import './assets/images/best-score-avatar3.png';
import './assets/images/best-score-avatar4.png';
import { App } from './app/app';
// import { IndexedDB } from './app/services/indexedDB';

window.onload = () => {
  const application = new App(document.body);
  application.render();
  application.start();
  // new IndexedDB();
};
