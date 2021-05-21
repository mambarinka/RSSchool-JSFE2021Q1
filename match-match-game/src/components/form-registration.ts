import { BaseComponent } from '../shared/base-component';
import { ButtonCancel } from './button-cancel';
import { ButtonSubmit } from './button-submit';
import { FormAvatar } from './form-avatar';
import { FormRegistrationList } from './form-registration-list';
import { FormRegistrationTitle } from './form-registration-title';

export class FormRegistration extends BaseComponent {
  readonly title: FormRegistrationTitle;

  readonly formList: FormRegistrationList;

  readonly formAvatar: FormAvatar;

  readonly buttonSubmit: ButtonSubmit;

  readonly buttonCancel: ButtonCancel;

  constructor() {
    super('form', ['form']);

    this.title = new FormRegistrationTitle();
    this.formList = new FormRegistrationList();
    this.formAvatar = new FormAvatar();
    this.buttonSubmit = new ButtonSubmit();
    this.buttonCancel = new ButtonCancel();

    this.element.append(
      this.title.element,
      this.formList.element,
      this.formAvatar.element,
      this.buttonSubmit.element,
      this.buttonCancel.element
    );
  }
}
