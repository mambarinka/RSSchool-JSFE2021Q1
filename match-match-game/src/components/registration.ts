import { BaseComponent } from '../shared/base-component';
import { FormRegistration } from './form-registration';

export class Registration extends BaseComponent {
  readonly overlay: HTMLElement;

  readonly formRegistration: FormRegistration;

  constructor(div: keyof HTMLElementTagNameMap = 'div') {
    super('div', ['registration', 'hide']);

    this.overlay = document.createElement(div);
    this.overlay.classList.add('registration__overlay');
    this.element.append(this.overlay);

    this.formRegistration = new FormRegistration();
    this.element.append(this.formRegistration.element);
  }
}
