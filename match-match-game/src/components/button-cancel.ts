import { BaseComponentButton } from '../shared/base-component-button';

export class ButtonCancel extends BaseComponentButton {
  constructor() {
    super(['form__btn-cancel', 'button']);
    this.button.textContent = `
    cancel
      `;
    this.button.type = 'button';
  }
}
