import { Header } from './view/header';
import { Garage } from './view/pages/garage';

export class App {
  private readonly header: Header;

  private readonly garage: Garage;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.garage = new Garage();
  }

  async render(): Promise<void> {
    this.rootElement?.append(this.header.element, await this.garage.render());
  }
}
