import { BaseComponent, Button } from "../models/models";

export class Pagination extends BaseComponent {
  private readonly buttonPrev: Button;
  private readonly buttonNext: Button;
  constructor() {
    super('article', ['pagination']);

    this.buttonPrev = new Button(['pagination__button', 'prev-button', 'button']);
    this.buttonPrev.button.textContent = 'Prev';
    this.buttonNext = new Button(['pagination__button', 'next-button', 'button']);
    this.buttonNext.button.textContent = 'Next';

    this.element.append(
      this.buttonPrev.button,
      this.buttonNext.button
    )
  }
}
