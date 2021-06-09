import { BaseComponent } from '../models/models';
import { createHtmlElement } from '../service/utils';

// export const getHeader = async (): Promise<HTMLElement> => {
//   const headerHTML = `
// <a href="#/garage" class="page-header__button button">to garage</a>
// <a href="#/winners" class="page-header__button button">to winners</a>
// `;

//   return createHtmlElement('header', ['page-header'], headerHTML);
// }

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
