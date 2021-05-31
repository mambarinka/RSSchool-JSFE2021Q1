import { BaseComponent } from '../shared/base-component';
import { Card } from './card';
// import { Timer } from './timer';

const SHOW_TIME = 30; // через столько секунд все карточки будут перевернуты в обратную сторону (начало игры)

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  onCardClick: ((card: Card) => void) | null = null;

  constructor() {
    super('div', ['cards-field']);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => {
      this.element.append(card.element);
      card.onClick = () => {
        if (this.onCardClick) {
          this.onCardClick(card);
        }
      };
    });
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME * 1000);
  }
}
