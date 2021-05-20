import { BaseComponent } from '../shared/base-component';
import { ButtonMain } from './button-main';
import { Logo } from './logo';
import { Navigation } from './navigation';

export class Header extends BaseComponent {
  isGameOpen = false;

  isRegistrationOpen = false;

  readonly wrapper: HTMLElement;

  private readonly logo: Logo;

  private readonly navigation: Navigation;

  private readonly button: ButtonMain;

  // private readonly howToPlay: HowToPlay;

  // private readonly game: Game;

  constructor(div: keyof HTMLElementTagNameMap = 'div') {
    super('header', ['page-header']);

    this.wrapper = document.createElement(div);
    this.wrapper.classList.add('page-header__wrapper');
    this.element.append(this.wrapper);

    this.logo = new Logo();
    this.wrapper.append(this.logo.element);

    this.navigation = new Navigation();
    this.wrapper.append(this.navigation.element);

    this.button = new ButtonMain();
    this.wrapper.append(this.button.element);

    // this.howToPlay = new HowToPlay();
    // console.log(this.howToPlay.element);
    // this.game = new Game();

    this.button.element.addEventListener('click', () => this.buttonHandler());
  }

  buttonHandler() {
    const gameElement = document.querySelector('.cards-field__wrapper');
    const registrationElement = document.querySelector('.registration');

    const howToPlayElement = document.querySelector('.how-to-play__wrapper');
    const bestScoreElement = document.querySelector('.best-score__wrapper');
    const settingsElement = document.querySelector('.settings__wrapper');

    // if (condition) {

    // } else {

    // }

    if (this.isGameOpen) return;
    gameElement?.classList.toggle('hide');

    // howToPlayElement?.classList.toggle('hide');
    // bestScoreElement?.classList.toggle('hide');
    settingsElement?.classList.toggle('hide');

    // registrationElement?.classList.toggle('hide');
  }
}
