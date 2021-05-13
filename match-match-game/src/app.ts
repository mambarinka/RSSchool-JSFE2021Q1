// import { Card } from './components/card/card';
import { Footer } from './components/footer';
import { Game } from './components/game';
import { ImageCategoryModel } from './models/image-category-model';

export class App {

  private readonly game: Game;
  private readonly footer: Footer;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game(); // страница Game, здесб же добавить 2 другие страницы, + подключить роутинг ( и в зависимости от роута менял бы отображение -какой класс выводить на экран)
    this.footer = new Footer();
    this.rootElement.append(this.game.element, this.footer.element);
  }

  async start() {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`); //  здесь можно будет вывести вывод списка категорий и селектом выбрать какую категорию выбрать перед запуском игры
    this.game.newGame(images);
  }
}
