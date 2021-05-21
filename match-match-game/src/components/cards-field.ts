import { BaseComponent } from '../shared/base-component';
import { Card } from './card';
// import { Timer } from './timer';

const SHOW_TIME = 1; // через столько секунд все карточки будут перевернуты в обратную сторону (начало игры)

export class CardsField extends BaseComponent {

  private cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => {
      // console.log(card.element);
      this.element.append(card.element);
    });
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME * 1000);
  }
}
