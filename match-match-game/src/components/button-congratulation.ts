import { BaseComponentButton } from '../shared/base-component-button';

export class ButtonCongratulation extends BaseComponentButton {
  constructor() {
    super(['congratulation__button', 'button']);
    this.button.textContent = `
    ОК
      `;
    this.button.type = 'button';
  }
}
