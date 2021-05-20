import { AboutGame } from "../app/pages/page-about-game";
import { BestScore } from "../app/pages/page-best-score";
import { Settings } from "../app/pages/page-settings";
import { BaseComponent } from "../shared/base-component";

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
    name: "default",
    component: new AboutGame()
  };

  private currentRoutePage?: BaseComponent = this.currentRoute?.component;

  constructor() {

  }

  getCurrentRoute(): BaseComponent | undefined {
    this.currentRouteName = window.location.hash.slice(2);


    this.currentRoute = this.routing.find((p) => {

      if (p.name !== this.currentRouteName) {
       return this.defaultRoute;
      }

      return p.name === this.currentRouteName;
    });


    this.currentRoutePage = this.currentRoute?.component;

    console.log(`window.location.hash: ${window.location.hash}`);
    console.log(`this.currentRouteName: ${this.currentRouteName}`);
    console.log(`this.currentRoute: ${this.currentRoute} `);
    console.log(`this.currentRoutePage: ${this.currentRoutePage} `);

    return this.currentRoutePage;
  }
}

// /**
//  * @typedef IRoute
//  * @property {string} name
//  * @property {typeof Function} component
//  */

// window.onpopstate = () => {  // эвент вызывается тогда, когда происходит изменение пути загрузки страницы
//   console.log(window.location.hash);
//   let currentRouteName = window.location.hash.slice(1);
//   let currentRoute = routing.find(p => p.name === currentRouteName);
//   //  let defaultRoute = routing.find(p => p.name === 'default');

//   (currentRoute || defaultRoute).component();
// };


// let container = document.querySelector('.container');

// /**
//  *
//  * @type {Array<IRoute>}
//  */
// const routing = [{
//   "name": "test",
//   "component": () => {
//     container.innerHTML = `test`;
//   }
// },
// {
//   "name": "test1",
//   "component": () => {
//     container.innerHTML = `test1`;
//   }
// },
// {
//   "name": "test2",
//   "component": () => {
//     container.innerHTML = `test2`;
//   }
// },

// ];

// /**
//  *
//  * @type {IRoute}
//  */
// const defaultRoute = {
//   "name": "default",
//   "component": () => {
//     container.innerHTML = `default `;
//   }
// };

// window.onpopstate();
// console.log('hi');
