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
//   name: "test",
//   component: () => {
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
//     container.innerHTML = `default`;
//   }
// };

// window.onpopstate();
