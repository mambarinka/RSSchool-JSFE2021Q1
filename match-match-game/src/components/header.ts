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

  isRegistrationOpen = false;

  readonly wrapper: HTMLElement;
  private readonly logo: Logo;
  private readonly navigation: Navigation;
  private readonly buttonMain: ButtonMain;
  private readonly currentRoute: Route;
  public currentRouteElement: HTMLElement;
  private timer: Timer;
  private game: Game;
  private registration: Registration;

  constructor(div: keyof HTMLElementTagNameMap = 'div') {
    super('header', ['page-header']);

    this.wrapper = document.createElement(div);
    this.wrapper.classList.add('page-header__wrapper');

    this.logo = new Logo();
    this.navigation = new Navigation();
    this.buttonMain = new ButtonMain();
    this.currentRoute = new Route();
    this.timer = new Timer;
    this.game = new Game();
    this.registration = new Registration();

    this.element.append(this.wrapper);

    this.wrapper.append(
      this.logo.element,
      this.navigation.element,
      this.buttonMain.button
    );

    this.currentRouteElement = this.currentRoute.getCurrentRoute();
    console.log(this.currentRouteElement);
    this.buttonMain.button.addEventListener('click', () => this.buttonHandler());
  }

  buttonHandler(): void {
    // this.currentRouteElement = this.currentRoute.getCurrentRoute();
    // window.onpopstate = () => {
    //   this.currentRouteElement = this.currentRoute.getCurrentRoute();
    // };

    // const gameElement = document.querySelector('.cards-field__wrapper');
    // const registrationElement = document.querySelector('.registration');

    // if (this.isGameOpen) return;
    const buttonText = document.querySelector('.main-nav__toggle')?.textContent;
    // const childPageMain = document.querySelector('.page-main > div');

    // registrationElement?.classList.toggle('hide');


    console.log(this.registration.element);


    // this.registration.element.classList.toggle('hide');
    this.currentRouteElement.classList.toggle('hide');
    console.log(this.currentRouteElement);
    // if (buttonText === 'Start Game') {
    //   childPageMain?.classList.toggle('hide');
    // }
    if (buttonText === 'register new player') {
      // registrationElement?.classList.toggle('hide');
      this.registration.element.classList.toggle('hide');
      this.currentRouteElement.classList.toggle('hide');
    } else if (buttonText === 'Start Game') {
      // gameElement?.classList.toggle('hide');
      this.game.element.classList.toggle('hide');
      // registrationElement?.classList.toggle('hide');
      this.registration.element.classList.toggle('hide');
      this.currentRouteElement.classList.toggle('hide');
      this.timer.isGameOpen = true;
      this.startGame();
    } else if (buttonText === 'stop game') {
      this.timer.isGameOpen = false;
      this.stopGame();
      this.game.element.classList.toggle('hide');
      this.currentRouteElement.classList.toggle('hide');
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
