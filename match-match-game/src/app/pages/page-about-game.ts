import { Footer } from '../../components/footer';
import { Game } from '../../components/game';
import { Header } from '../../components/header';
import { HowToPlay } from '../../components/how-to-play';
import { Component, ImageCategoryModel, RootElement } from '../app.api';
import { CounterServiceImplementation } from '../services/counter.service';

export class AboutGame implements Component {
  private readonly header: Header;

  private readonly howToPlay: HowToPlay;

  private readonly game: Game;

  private readonly footer: Footer;

  constructor(private readonly rootElement: RootElement) {
    this.header = new Header();
    this.howToPlay = new HowToPlay();
    this.game = new Game();
    this.footer = new Footer();
  }

  render(): HTMLElement {
    this.rootElement?.append(
      this.header.element,
      this.howToPlay.element,
      this.game.element,
      this.footer.element
    );

    return this.game.element;
  }

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`); //  здесь можно будет вывести вывод списка категорий и селектом выбрать какую категорию выбрать перед запуском игры

    const counterService = new CounterServiceImplementation();
    counterService.increment();
    // counterService.subscribeOnCounter((counter: number) => console.log(counter))
    console.log(this.game);
    console.log(images);
    return this.game.newGame(images);
  }
}
