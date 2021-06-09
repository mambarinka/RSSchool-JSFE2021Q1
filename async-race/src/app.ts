import {  Header } from './view/header';
import { Garage } from './view/pages/garage';

// export const renderGame = async () => {
//   document.body.append(await getHeader(), await renderGarage());
// };

export class App {
  private readonly header: Header;

  private readonly garage: Garage;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.garage = new Garage();
  }

  async render(): Promise<void> {
    this.rootElement?.append(this.header.element, await this.garage.render());
    // this.pageMain.element.append(
    //   this.currentRouteElement
    // );
    // return this.currentRouteElement;
  }
}
