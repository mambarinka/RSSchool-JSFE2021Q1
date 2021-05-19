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
    this.element.append(this.title.element);

    this.formList = new FormRegistrationList();
    this.element.append(this.formList.element);

    this.formAvatar = new FormAvatar();
    this.element.append(this.formAvatar.element);

    this.buttonSubmit = new ButtonSubmit();
    this.element.append(this.buttonSubmit.element);

    this.buttonCancel = new ButtonCancel();
    this.element.append(this.buttonCancel.element);
  }
}
