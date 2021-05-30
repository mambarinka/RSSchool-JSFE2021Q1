import { BaseComponent } from '../shared/base-component';
import { ButtonCongratulation } from './button-congratulation';

export class Congratulation extends BaseComponent {
  wrapper: HTMLElement;
  button: ButtonCongratulation;
  constructor(div: keyof HTMLElementTagNameMap = 'div', time: string | null) {
    super('div', ['congratulation__text']);

    this.wrapper = document.createElement(div);
    this.wrapper.classList.add('congratulation');
    this.element.textContent = `Congratulations! You successfully found all matches on ${time} minutes.`
    this.button = new ButtonCongratulation();
    this.wrapper.append(this.element, this.button.button);

    this.button.button.addEventListener('click', () => this.buttonHandler(this.wrapper));
  }

  buttonHandler = (element: HTMLElement): void => {
    element.classList.add('hide');
  };
}
