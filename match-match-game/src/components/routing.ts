import { AboutGame } from "../app/pages/page-about-game";
import { BestScore } from "../app/pages/page-best-score";
import { Settings } from "../app/pages/page-settings";
import { BaseComponent } from "../shared/base-component";
import { NavItem } from "./nav-item";

export class Route {
  private currentRouteName: string = '';

  private currentRoute?: { name: string, component: BaseComponent } = { name: "default", component: new AboutGame() };

  private readonly routing: { name: string, component: BaseComponent }[] = [{
    name: "about",
    component: new AboutGame()
  },
  {
    name: "score",
    component: new BestScore()
  },
  {
    name: "settings",
    component: new Settings()
  }
  ];

  private readonly defaultRoute: { name: string, component: BaseComponent } = {
    name: "about",
    component: new AboutGame()
  };

  public currentRouteElement: HTMLElement;

  private navItem: BaseComponent;

  private currentNavItem: Element | null = document.body;

  constructor() {
    this.currentRouteElement = this.defaultRoute.component.element;
    this.navItem = new NavItem();
  }

  getCurrentRoute(): HTMLElement {
    let navItems = document.querySelectorAll('.main-nav__link');
    navItems.forEach((item) => {
      item.classList.remove('main-nav__link--current');
    })

    this.currentRouteName = window.location.hash.slice(2);

    this.currentNavItem = document.querySelector(`.main-nav__link--${this.currentRouteName}`);
    this.currentNavItem?.classList.add('main-nav__link--current');

    this.currentRoute = this.routing.find((p) => {
      return p.name === this.currentRouteName;
    });
    if (this.currentRoute != undefined) {
      this.currentRouteElement = this.currentRoute.component.element;
    } else {
      this.currentRouteElement = this.defaultRoute.component.element;
      window.location.hash = `#/about`;
    }
    return this.currentRouteElement;
  }
}
