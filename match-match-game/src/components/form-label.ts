import { BaseComponentLabel } from '../shared/base-component-label';

export class FormLabel extends BaseComponentLabel {
  constructor(name = '', textContent = '') {
    super(['form__item-label']);

    this.label.htmlFor = name;
    this.label.textContent = textContent;
  }
}
