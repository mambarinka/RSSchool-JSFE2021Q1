import { BaseComponent } from '../shared/base-component';
import { ButtonCancel } from './button-cancel';
import { ButtonSubmit } from './button-submit';
import { FormAvatar } from './form-avatar';
import { FormRegistrationList } from './form-registration-list';

export class FormRegistration extends BaseComponent {
  readonly title: HTMLElement;

  readonly formList: FormRegistrationList;

  readonly formAvatar: FormAvatar;

  readonly buttonSubmit: ButtonSubmit;

  readonly buttonCancel: ButtonCancel;

  constructor(title: keyof HTMLElementTagNameMap = 'h2') {
    super('form', ['form']);

    this.title = document.createElement(title);
    this.title.classList.add('form__title');
    this.title.textContent = `
    Registr new Player
      `;

    this.formList = new FormRegistrationList();
    this.formAvatar = new FormAvatar();
    this.buttonSubmit = new ButtonSubmit();
    this.buttonCancel = new ButtonCancel();

    this.element.append(
      this.title,
      this.formList.element,
      this.formAvatar.element,
      this.buttonSubmit.element,
      this.buttonCancel.element
    );
  }
}
