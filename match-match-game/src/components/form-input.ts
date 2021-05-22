import { BaseComponentInput } from '../shared/base-component-input';

export class FormInput extends BaseComponentInput {
  constructor(name = '', type = '', placeholder = '') {
    super(['form__item-input']);

    this.input.id = name;
    this.input.type = type;
    this.input.name = name;
    this.input.placeholder = placeholder;
    this.input.required = true;
  }
}
