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
import { db } from './app/services/indexedDB';
import { User } from './app/app.api';

window.onload = () => {
  const application = new App(document.body);
  application.render();
  db.init('mambarinka');
  // db.init('mambarinka').then(() => {
  //   db.getCurrentUser<User>('Users').then((currentObject) => {
  //     console.log(currentObject);
  //     currentObject.bestScore = 1000000;

  //     console.log(currentObject.id);

  //     db.writeCurrentUser('Users', currentObject);
  //   });
  // });
};
