import { BaseComponentButton } from '../shared/base-component-button';

export class ButtonSubmit extends BaseComponentButton {
  constructor() {
    super(['form__btn-submit', 'button']);
    this.button.textContent = `
    Add user
      `;
    this.button.type = 'submit';
  }
}
