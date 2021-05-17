import { BaseComponent } from '../shared/base-component';

export class Logo extends BaseComponent {
  constructor() {
    super('a', ['logo']);
    this.element.innerHTML = `
      <img
        class='logo__image'
        src='assets/images/logo.svg'
        width='80'
        height='39'
        alt='Logo of Match-Match-Game'
      />
      `;
  }
}
