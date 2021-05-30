import { BaseComponentButton } from '../shared/base-component-button';

export class ButtonMain extends BaseComponentButton {
  constructor() {
    super(['main-nav__toggle', 'button']);
    this.button.textContent = `
    register new player
      `;
    this.button.type = 'button';
  }
}

export const buttonMain = new ButtonMain();
