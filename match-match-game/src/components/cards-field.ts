import { BaseComponent } from './base-component';
import { Card } from './card';
// import { Timer } from './timer';

const SHOW_TIME = 10; // через столько секунд все карточки будут перевернуты в обратную сторону (начало игры)

export class CardsField extends BaseComponent {
  readonly wrapper: HTMLElement;

  private timer?: HTMLElement;

  private cards: Card[] = [];

  constructor(div: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
    super('div', ['cards-field']);

    this.wrapper = document.createElement(div);
    this.wrapper.classList.add(...styles);
    this.wrapper.append(this.element);
    // this.element.append(this.timer);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addTimer(timer: HTMLElement) {
    this.timer = timer;
    this.wrapper.append(this.timer);
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.append(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME * 1000);
  }
}
