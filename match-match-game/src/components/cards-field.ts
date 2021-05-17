import { BaseComponent } from '../shared/base-component';
import { Card } from './card';
// import { Timer } from './timer';

const SHOW_TIME = 1; // через столько секунд все карточки будут перевернуты в обратную сторону (начало игры)

export class CardsField extends BaseComponent {
  // readonly wrapper: HTMLElement;

  // private timer?: HTMLElement;

  private cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);

    // this.wrapper = document.createElement(div);
    // this.wrapper.classList.add(...styles);
    // this.wrapper.append(this.element);
    // console.log(`this.element: ${this.element}`);
    // this.element.append(this.timer);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  // addTimer(timer: HTMLElement) {
  //   this.timer = timer;
  //   this.element.append(this.timer);
  // }

  addCards(cards: Card[]) {
    this.cards = cards;
    console.log(this.element);
    this.cards.forEach((card) => {
      // console.log(card.element);
      this.element.append(card.element);
    });
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME * 1000);
  }
}
