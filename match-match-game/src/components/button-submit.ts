import { BaseComponent } from '../shared/base-component';

export class ButtonSubmit extends BaseComponent {
  constructor() {
    super('button', ['form__btn-submit', 'button']);
    this.element.textContent = `
    Add user
      `;

    (<HTMLButtonElement>this.element).type = `submit`;
  }
}
