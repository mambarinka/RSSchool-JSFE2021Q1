import { BaseComponentForm } from '../shared/base-component-form';
import { ButtonCancel } from './button-cancel';
import { ButtonSubmit } from './button-submit';
import { FormAvatar } from './form-avatar';
import { FormRegistrationList } from './form-registration-list';

export class FormRegistration extends BaseComponentForm {
  readonly title: HTMLElement;

  readonly formList: FormRegistrationList;

  readonly formAvatar: FormAvatar;

  readonly buttonSubmit: ButtonSubmit;

  readonly buttonCancel: ButtonCancel;

  constructor(title: keyof HTMLElementTagNameMap = 'h2') {
    super(['form']);

    this.title = document.createElement(title);
    this.title.classList.add('form__title');
    this.title.textContent = `
    Registr new Player
      `;
    this.form.method = 'post';
    this.form.enctype = 'multipart/form-data';
    this.form.autocomplete = 'off';

    this.formList = new FormRegistrationList();
    this.formAvatar = new FormAvatar();
    this.buttonSubmit = new ButtonSubmit();
    this.buttonCancel = new ButtonCancel();

    this.form.append(
      this.title,
      this.formList.element,
      this.formAvatar.image,
      this.buttonSubmit.button,
      this.buttonCancel.button
    );
  }
}
