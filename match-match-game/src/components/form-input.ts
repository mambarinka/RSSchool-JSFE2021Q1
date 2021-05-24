import { BaseComponentInput } from '../shared/base-component-input';
import { FormRegistrationItem } from './form-registration-item';

export class FormInput extends BaseComponentInput {

  private isValidate = true;

  private formItem: FormRegistrationItem;

  constructor(name = '', type = '', placeholder = '', formItem: FormRegistrationItem) {
    super(['form__item-input']);

    this.input.id = name;
    this.input.type = type;
    this.input.name = name;
    this.input.placeholder = placeholder;
    this.input.required = true;

    this.formItem = formItem;

    console.log(this.input);
    if (this.input.type === 'text') {
      this.input.addEventListener('change', () => this.inputNameHandler(this.formItem));
    } else if (this.input.type === 'email') {
      this.input.addEventListener('change', () => this.inputEmailHandler(this.formItem));
    }
  }

  inputNameHandler(formItem: FormRegistrationItem) {
    const regex = /^[^\~\!\@\#\$\%\*\(\)\_\—\+\=\|\:\;\"\'\`\<\>\,\.\?\/\^]/gi;

    if (!regex.test(this.input.value)) {
      formItem.element.classList.remove('validity');
      formItem.element.classList.add('not-validity');
      this.input.setCustomValidity('First name and last name cant contain these characters: ~ ! @ # $ % * +() _ — + = | : ; " ' + '`' + '< > , . ? / ^');
      this.isValidate = false;
    } else {
      formItem.element.classList.remove('not-validity');
      formItem.element.classList.add('validity');
      this.input.setCustomValidity('');
      this.isValidate = true;
    }

    this.input.reportValidity();
    return this.isValidate;
  }

  inputEmailHandler(formItem: FormRegistrationItem) {
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;

    if (!regex.test(this.input.value)) {
      formItem.element.classList.remove('validity');
      formItem.element.classList.add('not-validity');
      this.input.setCustomValidity('Email must comply with the standard email generation rule RFC');
      this.isValidate = false;
    } else {
      formItem.element.classList.remove('not-validity');
      formItem.element.classList.add('validity');
      this.input.setCustomValidity('');
      this.isValidate = true;
    }

    this.input.reportValidity();
    return this.isValidate;
  }
}


