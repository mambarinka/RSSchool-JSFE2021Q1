import { BaseComponent } from '../shared/base-component';
import { NavItem } from './nav-item';

export class Navigation extends BaseComponent {
  readonly list: HTMLElement;

  private readonly menuItem: string[];

  private readonly menuTextContent: string[];

  constructor(ul: keyof HTMLElementTagNameMap = 'ul') {
    super('nav', ['main-nav']);

    this.list = document.createElement(ul);

    this.list.classList.add('main-nav__list');
    this.element.append(this.list);

    this.menuItem = ['about', 'score', 'settings'];
    this.menuTextContent = ['About Game', 'Best Score', 'Game Settings'];

    for (let i = 0; i < 3; i++) {
      const navItem: NavItem = new NavItem(
        'a',
        this.menuItem[i],
        this.menuTextContent[i]
      );
      this.list.append(navItem.element);
    }
  }
}
