import { PageAboutGame } from '../app/pages/page-about-game';
import { PageBestScore } from '../app/pages/page-best-score';
import { PageSettings } from '../app/pages/page-settings';
import { BaseComponent } from '../shared/base-component';
import { NavItem } from './nav-item';

export class Route {
  private currentRouteName = '';
  // public IDB: IndexedDB = new IndexedDB();

  private currentRoute?: { name: string; component: BaseComponent } = {
    name: 'default',
    component: new PageAboutGame(),
  };

  private readonly routing: { name: string; component: BaseComponent }[] = [
    {
      name: 'about',
      component: new PageAboutGame(),
    },
    {
      name: 'score',
      component: new PageBestScore(),
    },
    {
      name: 'settings',
      component: new PageSettings(),
    },
  ];

  private readonly defaultRoute: { name: string; component: BaseComponent } = {
    name: 'about',
    component: new PageAboutGame(),
  };

  public currentRouteElement: HTMLElement;

  private navItem: BaseComponent;

  private currentNavItem: Element | null = document.body;
  // private readonly pageBestScore: BestScore;

  constructor() {
    this.currentRouteElement = this.defaultRoute.component.element;
    this.navItem = new NavItem();
    // this.pageBestScore = new BestScore(this.firstName, this.lastName, this.email, this.srcAvatar, this.bestScore, this.IDB);
    // console.log(this.pageBestScore.element);
    // console.log(this.pageBestScore.setDefaultUsers());
    // this.pageBestScore.setDefaultUsers();
  }

  getCurrentRoute(): HTMLElement {
    const navItems = document.querySelectorAll('.main-nav__link');
    navItems.forEach((item) => {
      item.classList.remove('main-nav__link--current');
    });

    this.currentRouteName = window.location.hash.slice(2);

    this.currentNavItem = document.querySelector(
      `.main-nav__link--${this.currentRouteName}`
    );
    this.currentNavItem?.classList.add('main-nav__link--current');

    this.currentRoute = this.routing.find(
      (p) => p.name === this.currentRouteName
    );
    if (this.currentRoute !== undefined) {
      this.currentRouteElement = this.currentRoute.component.element;
    } else {
      this.currentRouteElement = this.defaultRoute.component.element;
      window.location.hash = `#/about`;
    }
    return this.currentRouteElement;
  }
}
