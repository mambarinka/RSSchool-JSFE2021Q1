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
    if (this.input.name === 'first-name' || this.input.name === 'last-name') {
      this.input.addEventListener('change', () => this.inputNameHandler(this.formItem));
    } else if (this.input.name === 'e-mail') {
      this.input.maxLength = 64;
      this.input.addEventListener('change', () => this.inputEmailHandler(this.formItem));
    }
  }

  inputNameHandler(formItem: FormRegistrationItem) {
    // const regex = /^[а-яА-ЯёЁa-zA-Z0-9-\s+]+$/;
    const regex = /^[^\~\!\@\#\$\%\*\(\)\_\—\+\=\|\:\;\"\'\`\<\>\,\.\?\/\^]+$/gi;

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
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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


