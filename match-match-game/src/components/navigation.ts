import { BaseComponent } from '../shared/base-component';
import { NavItem } from './nav-item';

export class Navigation extends BaseComponent {
  readonly list: HTMLElement;

  private readonly menuItem: string[];

  private readonly menuTextContent: string[];

  private currentRouteName: string = '';

  private currentNavItem: Element | null = document.body;

  constructor(ul: keyof HTMLElementTagNameMap = 'ul') {
    super('nav', ['main-nav']);

    this.list = document.createElement(ul);

    this.list.classList.add('main-nav__list');
    this.element.append(this.list);

    this.menuItem = ['about', 'score', 'settings'];
    this.menuTextContent = ['About Game', 'Best Score', 'Game Settings'];

    this.currentRouteName = window.location.hash.slice(2);

    for (let i = 0; i < 3; i++) {
      const navItem: NavItem = new NavItem(
        'a',
        this.menuItem[i],
        this.menuTextContent[i]
      );
      this.list.append(navItem.element);

      if (navItem.link.className === `main-nav__link main-nav__link--${this.currentRouteName}`) {
        console.log(navItem.link);
        navItem.link.classList.add('main-nav__link--current');
      }
    }

  }
}
