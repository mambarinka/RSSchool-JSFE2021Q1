import { BaseComponent } from '../shared/base-component';

export class ButtonMain extends BaseComponent {
  constructor() {
    super('button', ['main-nav__toggle', 'button']);
    this.element.textContent = `
    register new player
      `;

    (<HTMLButtonElement>this.element).type = `button`;
  }
}
