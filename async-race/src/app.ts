import { Header } from './view/header';
import { Garage } from './view/pages/garage';
import { Winners } from './view/pages/winners';

export class App {
  private readonly header: Header;

  private readonly garage: Garage;

  private readonly winners: Winners;

  constructor(private readonly rootElement: HTMLElement) {
    this.garage = new Garage();
    this.winners = new Winners();
    this.header = new Header(this.garage, this.winners);
  }

  async render(): Promise<void> {
    this.rootElement?.append(
      this.header.element,
      this.garage.element,
      this.winners.element
    );
  }
}
