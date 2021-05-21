import { BaseComponent } from '../shared/base-component';
import { ButtonMain } from './button-main';
import { Logo } from './logo';
import { Navigation } from './navigation';
import { Route } from './routing';

export class Header extends BaseComponent {
  isGameOpen = false;

  isRegistrationOpen = false;

  readonly wrapper: HTMLElement;

  private readonly logo: Logo;

  private readonly navigation: Navigation;

  private readonly button: ButtonMain;

  private readonly currentRoute: Route;
  public currentRouteElement: HTMLElement;

  // private readonly howToPlay: HowToPlay;

  // private readonly game: Game;

  constructor(div: keyof HTMLElementTagNameMap = 'div') {
    super('header', ['page-header']);

    this.wrapper = document.createElement(div);
    this.wrapper.classList.add('page-header__wrapper');
    this.logo = new Logo();
    this.navigation = new Navigation();
    this.button = new ButtonMain();
    this.currentRoute = new Route();
    this.element.append(this.wrapper);

    this.wrapper.append(
      this.logo.element,
      this.navigation.element,
      this.button.element
    );

    // this.game = new Game();
    this.currentRouteElement = this.currentRoute.getCurrentRoute();

    this.button.element.addEventListener('click', () => this.buttonHandler());
  }

  buttonHandler() {
    this.currentRouteElement = this.currentRoute.getCurrentRoute();
    window.onpopstate = () => {
      this.currentRouteElement = this.currentRoute.getCurrentRoute();
    }

    const gameElement = document.querySelector('.cards-field__wrapper');
    const registrationElement = document.querySelector('.registration');

    if (this.isGameOpen) return;
    // gameElement?.classList.toggle('hide');

    this.currentRouteElement.classList.toggle('hide');

    registrationElement?.classList.toggle('hide');
  }
}
