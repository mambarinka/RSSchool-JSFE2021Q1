import { BaseComponent } from '../../shared/base-component';

export class PageAboutGame extends BaseComponent {
  constructor() {
    super('div', ['how-to-play__wrapper']);
    this.element.innerHTML = `
    <h1 class='how-to-play__title'>How to play?</h1>
    <ul class='how-to-play__list'>
      <li class='how-to-play__item'>Register new player in game</li>
      <li class='how-to-play__item'>Configure your game settings</li>
      <li class='how-to-play__item'>Start you new game! Remember card positions and match it before times up.</li>
    </ul>

    <div class='how-to-play__images'>
      <img src='assets/images/how-to-play-register.png' alt='registration field' class='how-to-play__register' />
      <img src='assets/images/how-to-play-settings.png' alt='settings field' class='how-to-play__settings' />
      <img src='assets/images/how-to-play-game.png' alt='game field' class='how-to-play__game' />
    </div>
      `;
  }
}
