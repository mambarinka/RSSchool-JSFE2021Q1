import { BaseComponent } from '../shared/base-component';

export class FormRegistrationTitle extends BaseComponent {
  constructor() {
    super('h2', ['form__title']);
    this.element.textContent = `
    Registr new Player
      `;
  }
}
