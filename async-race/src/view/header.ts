import { BaseComponent } from '../models/models';

export class Header extends BaseComponent {
  constructor() {
    super('header', ['page-header']);
    const headerHTML = `
    <a href="#/garage" class="page-header__button button">to garage</a>
     <a href="#/winners" class="page-header__button button">to winners</a>
     `;
    this.element.innerHTML = headerHTML;
  }
}
