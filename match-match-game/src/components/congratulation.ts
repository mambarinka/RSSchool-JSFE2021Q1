import { BaseComponent } from '../shared/base-component';
import { ButtonCongratulation } from './button-congratulation';
import { Route } from './routing';

export class Congratulation extends BaseComponent {
  wrapper: HTMLElement;

  button: ButtonCongratulation;

  private readonly currentRoute: Route;

  constructor(
    div: keyof HTMLElementTagNameMap = 'div',
    time: string | null,
    rootPage: HTMLElement
  ) {
    super('div', ['congratulation__text']);

    this.wrapper = document.createElement(div);
    this.wrapper.classList.add('congratulation');
    this.element.textContent = `Congratulations! You successfully found all matches on ${time} minutes.`;
    this.button = new ButtonCongratulation();
    this.wrapper.append(this.element, this.button.button);
    this.currentRoute = new Route();
    // this.currentRouteElement = this.currentRoute.getCurrentRoute();

    this.button.button.addEventListener('click', () =>
      this.buttonHandler(this.wrapper, rootPage)
    );
  }

  buttonHandler = (element: HTMLElement, rootPage: HTMLElement): void => {
    // this.currentRoute.getCurrentRoute();
    document.querySelector('.best-score__wrapper')?.classList.remove('hide');
    element.classList.add('hide');
    rootPage.classList.add('hide');
  };
}
