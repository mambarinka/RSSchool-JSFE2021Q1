import { BaseComponent } from '../shared/base-component';
import { FormRegistration } from './form-registration';
import { HeaderAvatar } from './header-avatar';
import { Route } from './routing';

export class Registration extends BaseComponent {
  readonly overlay: HTMLElement;

  readonly formRegistration: FormRegistration;

  isRegistrationOpen: boolean;

  headerAvatar: HeaderAvatar;

  constructor(
    div: keyof HTMLElementTagNameMap = 'div',
    isRegistrationOpen: boolean,
    headerAvatar: HeaderAvatar,
    currentRoute: Route
  ) {
    super('div', ['registration', 'hide']);

    this.overlay = document.createElement(div);
    this.overlay.classList.add('registration__overlay');
    this.headerAvatar = headerAvatar;
    this.formRegistration = new FormRegistration(
      'h2',
      this.headerAvatar,
      currentRoute
    );
    this.element.append(this.overlay, this.formRegistration.form);

    this.overlay.addEventListener('click', () =>
      this.overlayHandler(this.element)
    );
    this.isRegistrationOpen = isRegistrationOpen;
    if (this.element.classList.contains('hide')) {
      this.isRegistrationOpen = false;
    } else {
      this.isRegistrationOpen = true;
    }
  }

  overlayHandler = (element: HTMLElement): void => {
    element.classList.add('hide');
  };
}
