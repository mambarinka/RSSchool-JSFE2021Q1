import { BaseComponent } from '../shared/base-component';

export class NavItem extends BaseComponent {
  constructor() {
    super('li', ['main-nav__item']);
  }
}

// export class NavItem extends BaseComponent {
//   public readonly link: HTMLElement;

//   constructor(
//     a: keyof HTMLElementTagNameMap = 'a',
//     item = '',
//     textContent = ''
//   ) {
//     super('li', ['main-nav__item']);

//     this.link = document.createElement(a);
//     this.link.classList.add('main-nav__link', `main-nav__link--${item}`);
//     this.link.textContent = textContent;
//     (<HTMLAnchorElement>this.link).href = `#/${item}`;

//     this.element.append(this.link);
//   }
// }
