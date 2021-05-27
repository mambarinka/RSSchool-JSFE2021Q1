import { BaseComponent } from '../shared/base-component';
import { FormRegistration } from './form-registration';

export class Registration extends BaseComponent {
  readonly overlay: HTMLElement;
  readonly formRegistration: FormRegistration;
  isRegistrationOpen: boolean;

  constructor(div: keyof HTMLElementTagNameMap = 'div', isRegistrationOpen: boolean) {
    super('div', ['registration', 'hide']);

    this.overlay = document.createElement(div);
    this.overlay.classList.add('registration__overlay');
    this.formRegistration = new FormRegistration();
    this.element.append(this.overlay, this.formRegistration.form);

    this.overlay.addEventListener('click', () =>
      this.overlayHandler(this.element)
    );
    this.isRegistrationOpen = isRegistrationOpen;
    if (this.element.classList.contains('hide')) {
      console.log('регистрация скрыта');
      isRegistrationOpen = false;
      console.log('isRegistrationOpen24: ' + isRegistrationOpen);
    } else {
      console.log('регистрация открыта');
      isRegistrationOpen = true;
    }
  }

  overlayHandler(element: HTMLElement): void {
    element.classList.add('hide');
  }
}
