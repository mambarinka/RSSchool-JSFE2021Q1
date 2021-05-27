import { ImageCategoryModel } from '../app/app.api';
import { BaseComponent } from '../shared/base-component';
import { ButtonMain } from './button-main';
import { Game } from './game';
import { Logo } from './logo';
import { Navigation } from './navigation';
import { Registration } from './registration';
import { Route } from './routing';
import { Timer } from './timer';

export class Header extends BaseComponent {
  // isGameOpen = false;
  // isGameStop = false;
  // isRegistrationOpen = false;

  readonly wrapper: HTMLElement;
  private readonly logo: Logo;
  private readonly navigation: Navigation;
  buttonMain: ButtonMain;
  // private readonly currentRoute: Route;
  public currentRouteElement: HTMLElement;
  // private timer: Timer;
  private game: Game;
  private registration: Registration;
  public isRegistrationOpen: boolean;
  public isGameOpen: boolean;
  public timer: Timer;
  // private currentRoute: Route;

  constructor(div: keyof HTMLElementTagNameMap = 'div', currentRoute: Route, game: Game, registration: Registration, isRegistrationOpen: boolean, isGameOpen: boolean, timer: Timer) {
    super('header', ['page-header']);

    this.wrapper = document.createElement(div);
    this.wrapper.classList.add('page-header__wrapper');

    this.logo = new Logo();
    this.navigation = new Navigation();
    this.buttonMain = new ButtonMain();
    // this.currentRoute = new Route();
    // this.timer = new Timer();

    // this.game = new Game();
    // this.registration = new Registration();

    this.element.append(this.wrapper);

    this.wrapper.append(
      this.logo.element,
      this.navigation.element,
      this.buttonMain.button
    );

    this.game = game;
    this.isGameOpen = isGameOpen;
    this.registration = registration;
    this.isRegistrationOpen = isRegistrationOpen;
    this.timer = timer;

    this.currentRouteElement = currentRoute.getCurrentRoute();
    this.buttonMain.button.addEventListener('click', () => this.buttonHandler(this.buttonMain.button));
  }

  buttonHandler(toggle: HTMLButtonElement): void {
    // if (this.isGameOpen) return;
    // let buttonText = toggle.textContent;

    // console.log('isGameOpen: ' + this.isGameOpen);
    // console.log('isGameStop: ' + this.isGameStop);
    console.log('isRegistrationOpen: ' + this.isRegistrationOpen);

    // this.isRegistrationOpen = true;
    if (!this.isRegistrationOpen) {
      console.log('регистрация открывается');
      // this.currentRouteElement.classList.toggle('hide');
      this.registration.element.classList.toggle('hide');
      this.isRegistrationOpen = true;
      // this.isGameOpen = true;
    } else if (!this.isGameOpen) {
      console.log('игра начинается');
      this.currentRouteElement.classList.toggle('hide');
      // this.registration.element.classList.toggle('hide');
      this.game.element.classList.toggle('hide');
      this.timer.isGameOpen = true;
      this.startGame();
      this.isGameOpen = false;
      // this.isGameStop = true;
      // } else if (!this.isRegistrationOpen && !this.isGameOpen && this.isGameStop) {
      //   console.log('игра заканчивается');
      //   this.timer.isGameOpen = false;
      //   this.stopGame();
      //   this.game.element.classList.toggle('hide');
      //   this.currentRouteElement.classList.toggle('hide');
    }
  }

  async startGame(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.buttonMain.button.textContent = 'stop game';
    //  здесь можно будет вывести вывод списка категорий и селектом выбрать
    //  какую категорию выбрать перед запуском игры

    // const counterService = new CounterServiceImplementation();
    // counterService.increment();
    // counterService.subscribeOnCounter((counter: number) => console.log(counter))
    // console.log(this.game);
    // console.log(images);
    return this.game.newGame(images);
  }

  async stopGame(): Promise<void> {
    this.timer.stopTimer();
  }
}
