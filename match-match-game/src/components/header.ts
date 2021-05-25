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
      this.button.button
    );

    this.currentRouteElement = this.currentRoute.getCurrentRoute();

    this.button.button.addEventListener('click', () => this.buttonHandler());
  }

  buttonHandler(): void {
    this.currentRouteElement = this.currentRoute.getCurrentRoute();
    window.onpopstate = () => {
      this.currentRouteElement = this.currentRoute.getCurrentRoute();
    };

    const gameElement = document.querySelector('.cards-field__wrapper');
    const registrationElement = document.querySelector('.registration');

    // if (this.isGameOpen) return;
    const buttonText = document.querySelector('.main-nav__toggle')?.textContent;
    const childPageMain = document.querySelector('.page-main > div');

    registrationElement?.classList.toggle('hide');
    if (buttonText === 'Start Game') {
      childPageMain?.classList.toggle('hide');
      gameElement?.classList.toggle('hide');
      registrationElement?.classList.toggle('hide');
    }
  }
}
