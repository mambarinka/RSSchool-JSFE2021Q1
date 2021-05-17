import { BaseComponent } from '../shared/base-component';
import { ButtonMain } from './button-main';
import { Logo } from './logo';
import { Navigation } from './navigation';

export class Header extends BaseComponent {
  readonly wrapper: HTMLElement;

  private readonly logo: Logo;

  private readonly navigation: Navigation;

  private readonly button: ButtonMain;

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

    // this.button.addEventListener('click', () => this.buttonHandler());
  }

  // buttonHandler() {

  // }
}
