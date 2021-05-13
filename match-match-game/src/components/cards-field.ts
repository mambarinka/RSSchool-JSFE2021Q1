import { BaseComponent } from './base-component';
import { Card } from './card';

const SHOW_TIME = 1; // через столько секунд все карточки будут перевернуты в обратную сторону (начало игры)

export class CardsField extends BaseComponent {
  readonly wrapper: HTMLElement;

  private cards: Card[] = [];

  constructor(div: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
    super('div', ['cards-field']);

    this.wrapper = document.createElement(div);
    this.wrapper.classList.add(...styles);
    this.wrapper.append(this.element);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.append(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME * 1000);
  }
}
