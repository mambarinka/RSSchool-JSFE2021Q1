import { IndexedDB } from '../app/services/indexedDB';
import { BaseComponent } from '../shared/base-component';
import { FormRegistration } from './form-registration';
import { HeaderAvatar } from './header-avatar';

export class Registration extends BaseComponent {
  readonly overlay: HTMLElement;

  readonly formRegistration: FormRegistration;

  isRegistrationOpen: boolean;

  headerAvatar: HeaderAvatar;

  IDB: IndexedDB;

  constructor(
    div: keyof HTMLElementTagNameMap = 'div',
    isRegistrationOpen: boolean,
    headerAvatar: HeaderAvatar,
    IDB: IndexedDB
  ) {
    super('div', ['registration', 'hide']);

    this.overlay = document.createElement(div);
    this.overlay.classList.add('registration__overlay');
    this.headerAvatar = headerAvatar;
    this.IDB = IDB;
    this.formRegistration = new FormRegistration(
      'h2',
      this.headerAvatar,
      this.IDB
    );
    this.element.append(this.overlay, this.formRegistration.form);

    this.overlay.addEventListener('click', () =>
      this.overlayHandler(this.element)
    );
    this.isRegistrationOpen = isRegistrationOpen;
    if (this.element.classList.contains('hide')) {
      // console.log('регистрация скрыта');
      this.isRegistrationOpen = false;
      // console.log(`isRegistrationOpen24: ${isRegistrationOpen}`);
    } else {
      // console.log('регистрация открыта');
      this.isRegistrationOpen = true;
    }
  }

  overlayHandler = (element: HTMLElement): void => {
    element.classList.add('hide');
  };
}
