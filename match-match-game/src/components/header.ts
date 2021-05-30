// import { db } from '../app/app';
// import db from '../app/app';
import { ImageCategoryModel } from '../app/app.api';
import { db } from '../app/services/indexedDB';
import { BaseComponent } from '../shared/base-component';
import { buttonMain, ButtonMain } from './button-main';
import { Game } from './game';
import { HeaderAvatar } from './header-avatar';
import { Logo } from './logo';
import { Navigation } from './navigation';
import { Registration } from './registration';
import { Route } from './routing';
import { Timer } from './timer';

// const buttonMain = new ButtonMain();
// export default buttonMain;

// export const buttonMain = new ButtonMain();

export class Header extends BaseComponent {
  // isGameOpen = false;
  // isGameStop = false;
  // isRegistrationOpen = false;
  readonly wrapper: HTMLElement;

  private readonly logo: Logo;

  private readonly navigation: Navigation;

  // buttonMain: ButtonMain;
  // private readonly currentRoute: Route;
  public currentRouteElement: HTMLElement;

  // private timer: Timer;
  private game: Game;

  private registration: Registration;

  public isRegistrationOpen: boolean;

  public isGameOpen: boolean;

  public timer: Timer;

  headerAvatar: HeaderAvatar;
  // private currentRoute: Route;

  constructor(
    div: keyof HTMLElementTagNameMap = 'div',
    currentRoute: Route,
    game: Game,
    registration: Registration,
    isRegistrationOpen: boolean,
    isGameOpen: boolean,
    timer: Timer,
    headerAvatar: HeaderAvatar
  ) {
    super('header', ['page-header']);

    this.wrapper = document.createElement(div);
    this.wrapper.classList.add('page-header__wrapper');

    this.logo = new Logo();
    this.navigation = new Navigation();
    // this.buttonMain = new ButtonMain();
    this.headerAvatar = headerAvatar;
    // this.headerAvatar = new HeaderAvatar();
    // this.currentRoute = new Route();
    // this.timer = new Timer();

    // this.game = new Game();
    // this.registration = new Registration();

    this.element.append(this.wrapper);

    this.wrapper.append(
      this.logo.element,
      this.navigation.element,
      // this.buttonMain.button,
      buttonMain.button,
      this.headerAvatar.image
    );

    this.game = game;
    this.isGameOpen = isGameOpen;
    this.registration = registration;
    this.isRegistrationOpen = isRegistrationOpen;
    this.timer = timer;

    this.currentRouteElement = currentRoute.getCurrentRoute();
    buttonMain.button.addEventListener('click', () =>
      this.buttonHandler(buttonMain)
    );
  }

  buttonHandler(toggle: ButtonMain): void {
    const buttonTextContents = {
      registration: 'register new player',
      startGame: 'start game',
      stopGame: 'stop game',
    };

    const textContentButtonMain = toggle.button.innerText.toLowerCase();

    // if (this.isGameOpen) return;
    // if (!this.isRegistrationOpen) {
    if (textContentButtonMain === buttonTextContents.registration) {
      this.registration.element.classList.toggle('hide');
      this.isRegistrationOpen = true;
      // this.isGameOpen = true;
    } else if (textContentButtonMain === buttonTextContents.startGame) {
      // } else if (!this.isGameOpen) {

      this.currentRouteElement.classList.toggle('hide');
      setTimeout(() => {
        this.game.element.classList.toggle('hide');
      }, 1);
      this.timer.isGameOpen = true;
      this.startGame();
      // this.isGameOpen = false;
      // this.isGameStop = true;
    } else if (textContentButtonMain === buttonTextContents.stopGame) {
      //   this.timer.isGameOpen = false;
      this.stopGame();
      this.game.element.classList.toggle('hide');

      if (document.querySelector('.how-to-play__wrapper')) {
        document
          .querySelector('.how-to-play__wrapper')
          ?.classList.toggle('hide');
      } else {
        this.currentRouteElement.classList.toggle('hide');
      }
    }
  }

  async startGame(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();

    db.init('mambarinka').then(() => {
      db.readAll('Settings').then((arr) => {
        let cat: ImageCategoryModel;
        const cardsType = arr[arr.length - 1].gameCardsType;
        let nothing: ImageCategoryModel;
        if (cardsType === 'animals') {
          [cat, nothing] = categories;
        } else if (cardsType === 'cars') {
          [nothing, cat] = categories;
        } else {
          [cat, nothing] = categories;
        }
        // cardsType === 'animals'
        //   ? (cat = categories[0])
        //   : cardsType === 'cars'
        //     ? (cat = categories[1])
        //     : (cat = categories[0]);

        const images = cat.images.map((name) => `${cat.category}/${name}`);

        let imagesLength: number;
        const difficultyType = arr[arr.length - 1].gameDifficultyType;

        if (difficultyType === '4x4') {
          imagesLength = 8;
        } else if (difficultyType === '6x6') {
          imagesLength = 18;
        } else if (difficultyType === '8x8') {
          imagesLength = 32;
        } else {
          imagesLength = 8;
        }

        buttonMain.button.textContent = 'stop game';
        this.game.newGame(images, imagesLength);

        const cards: Array<HTMLElement> = Array.from(
          document.querySelectorAll('.card-container')
        );

        Array.from(cards).forEach((card: HTMLElement) => {
          let ratio: number;

          if (difficultyType === '4x4') {
            ratio = 5;
          } else if (difficultyType === '6x6') {
            ratio = 7;
          } else if (difficultyType === '8x8') {
            ratio = 10;
          } else {
            ratio = 5;
          }
          // difficultyType === '4x4'
          //   ? (ratio = 5)
          //   : difficultyType === '6x6'
          //   ? (ratio = 7)
          //     : difficultyType === '8x8'
          //       ? (ratio = 10)
          //       : (ratio = 5);

          card.setAttribute(
            'style',
            `width: calc(100% / ${ratio}); height: calc(100% / ${ratio})`
          );
        });
      });
    });
  }

  stopGame(): void {
    this.timer.stopTimer();
    buttonMain.button.textContent = 'start game';
  }
}
