import { Footer } from '../components/footer';
import { Game } from '../components/game';
import { Header } from '../components/header';
import { AboutGame } from './pages/page-about-game';
import { PageMain } from '../components/page-main';
import { Registration } from '../components/registration';
import { Component, ImageCategoryModel } from './app.api';
import { BestScore } from './pages/page-best-score';
import { Route } from '../components/routing';
import { Settings } from './pages/page-settings';

export class App implements Component {
  private readonly header: Header;

  private readonly pageMain: PageMain;

  private readonly aboutGame: AboutGame;

  private readonly bestScore: BestScore;

  private readonly settings: Settings;

  private readonly game: Game;

  private readonly registration: Registration;

  private readonly footer: Footer;

  private readonly currentRoute: Route;

  constructor(private readonly rootElement: HTMLElement) {
    // this.aboutGame = new PageAboutGame(this.rootElement);
    // this.bestScore = new PageBestScore(this.rootElement);

    // this.game = new Game(); // страница Game, здесб же добавить 2 другие страницы, + подключить роутинг ( и в зависимости от роута менял бы отображение -какой класс выводить на экран)

    this.header = new Header();
    this.pageMain = new PageMain();
    this.footer = new Footer();

    this.aboutGame = new AboutGame();
    this.bestScore = new BestScore();
    this.settings = new Settings();

    this.game = new Game();
    this.registration = new Registration();

    this.currentRoute = new Route();
  }

  render(): HTMLElement {

        window.onpopstate = () => {
          // console.log(`this.currentRoute.getCurrentRoute(): ${this.currentRoute.getCurrentRoute()}`);
          console.log(`this.currentRoute.getCurrentRoute(): ${this.currentRoute.getCurrentRoute()}`);
        }

    this.rootElement?.append(
      this.header.element,
      this.pageMain.element,
      this.footer.element
    );

    this.pageMain.element.append(

      // this.aboutGame.element,
      // this.bestScore.element,
      this.settings.element,
      // this.currentRoute.getCurrentRoute(),

      this.game.element,
      this.registration.element
    );

    return this.rootElement;
  }

  // start(): Promise<void> {
  //   return this.aboutGame.start();
  // }

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`); //  здесь можно будет вывести вывод списка категорий и селектом выбрать какую категорию выбрать перед запуском игры

    // const counterService = new CounterServiceImplementation();
    // counterService.increment();
    // counterService.subscribeOnCounter((counter: number) => console.log(counter))
    // console.log(this.game);
    // console.log(images);
    return this.game.newGame(images);
  }
}
