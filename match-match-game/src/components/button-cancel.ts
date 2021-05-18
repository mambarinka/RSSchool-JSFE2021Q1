import { BaseComponent } from '../shared/base-component';

export class ButtonCancel extends BaseComponent {
  constructor() {
    super('button', ['form__btn-cancel', 'button']);
    this.element.textContent = `
    cancel
      `;

    (<HTMLButtonElement>this.element).type = `button`;
  }
}
