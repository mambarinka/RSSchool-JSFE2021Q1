import { BaseComponentLink } from '../shared/base-component-link';

export class NavLink extends BaseComponentLink {
  constructor(item = '',
    textContent = '') {
    super(['main-nav__link', `main-nav__link--${item}`]);

    this.link.textContent = textContent;
    this.link.href = `#/${item}`;
  }
}
