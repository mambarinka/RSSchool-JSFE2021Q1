import { Game } from '../components/game';
import { Component, RootElement } from './app.api';
import { AboutGame } from './pages/page-about-game';

export class App implements Component {
  private readonly game: Game;

  private readonly aboutGame: AboutGame;

  constructor(private readonly rootElement: HTMLElement) {
    this.aboutGame = new AboutGame(this.rootElement);
    this.game = new Game(); // страница Game, здесб же добавить 2 другие страницы, + подключить роутинг ( и в зависимости от роута менял бы отображение -какой класс выводить на экран)
    // this.footer = new Footer();
    // this.rootElement.append(
    //   this.header.element,
    //   this.game.element,
    //   this.footer.element
    // );
  }

  render(): HTMLElement {
    return this.aboutGame.render();
  }

  start(): Promise<void> {
    return this.aboutGame.start();
  }

  // async start() {
  //   const res = await fetch('./images.json');
  //   const categories: ImageCategoryModel[] = await res.json();
  //   const cat = categories[0];
  //   const images = cat.images.map((name) => `${cat.category}/${name}`); //  здесь можно будет вывести вывод списка категорий и селектом выбрать какую категорию выбрать перед запуском игры
  //   this.game.newGame(images);
  // }
}
