// export class App implements Component {
//   private readonly header: Header;

//   private readonly pageMain: PageMain;

//   private readonly game: Game;

//   private readonly registration: Registration;

//   private readonly footer: Footer;

//   private readonly currentRoute: Route;

//   public currentRouteElement: HTMLElement;

//   public isRegistrationOpen = false;

//   public isGameOpen = false;

//   public timer: Timer = new Timer();

//   public headerAvatar: HeaderAvatar = new HeaderAvatar();

//   constructor(private readonly rootElement: HTMLElement) {
//     this.pageMain = new PageMain();
//     this.footer = new Footer();

//     this.game = new Game(this.isGameOpen, this.timer);

//     this.currentRoute = new Route();
//     this.registration = new Registration(
//       'div',
//       this.isRegistrationOpen,
//       this.headerAvatar
//       /* this.currentRoute */
//     );
//     this.header = new Header(
//       'div',
//       this.currentRoute,
//       this.game,
//       this.registration,
//       this.isRegistrationOpen,
//       this.isGameOpen,
//       this.timer,
//       this.headerAvatar
//     );

//     this.currentRouteElement = this.currentRoute.getCurrentRoute();
//   }

//   render(): HTMLElement {
//     this.rootElement?.append(
//       this.header.element,
//       this.pageMain.element,
//       this.footer.element
//     );
//     this.pageMain.element.append(
//       this.currentRouteElement,
//       this.game.element,
//       this.registration.element
//     );

//     window.onpopstate = () => {
//       this.pageMain.element.innerHTML = '';
//       this.currentRouteElement = this.currentRoute.getCurrentRoute();
//       this.pageMain.element.append(
//         this.currentRouteElement,
//         this.game.element,
//         this.registration.element
//       );
//     };

//     return this.currentRouteElement;
//   }
// }
