import { delay } from '../shared/delay';
import { BaseComponent } from '../shared/base-component';
import { Card } from './card';
import { CardsField } from './cards-field';
import { Timer } from './timer';
import { Congratulation } from './congratulation';

const FLIP_DELAY = 1000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  isGameOpen: boolean;

  timer: Timer;

  successfulTry = 0;
  errorTry = 0;
  congratulation?: Congratulation;

  constructor(isGameOpen: boolean, timer: Timer) {
    super('div', ['cards-field__wrapper', 'hide']);

    this.cardsField = new CardsField();
    this.timer = timer;
    this.element.append(this.timer.element, this.cardsField.element);

    this.isGameOpen = isGameOpen;
    if (this.element.classList.contains('hide')) {
      this.isGameOpen = false;
    } else {
      this.isGameOpen = true;
    }

    this.timer = timer;
  }

  newGame(images: string[], imagesLength: number): void {
    // здесь добавить таймер, который стартует при старте новой игры, здесь же добавить метод финиш, подчет очков
    this.cardsField.clear();
    const newImages = images.slice(0, imagesLength);
    const cards = newImages
      .concat(newImages)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    // cards.forEach((card) => {
    //   // card.element.addEventListener('click', () => this.cardHandler(card));
    //   card.onClick = () => this.cardHandler(card);
    // });
    this.cardsField.onCardClick = (card) => this.cardHandler(card);
    this.timer.startTimer();
    return this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card) {
    // async автоматом возвращает промис
    if (this.isAnimation) return;
    if (!card.isFlipped) return; // если она будет отображаться к нам лицом, то никак не реагируем
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card; // если нет активной карты, то текущую карту делаем активной
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      this.activeCard.element.classList.add('error');
      card.element.classList.add('error');
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      this.errorTry++;
    } else {
      this.activeCard.element.classList.add('ok');
      card.element.classList.add('ok');
      this.successfulTry++;
    }

    const cardsLength = Array.from(document.querySelectorAll('.card-container')).length;
    let openCardsLength = Array.from(document.querySelectorAll('.ok')).length;
    if (cardsLength === openCardsLength) {
      console.log('все карточки закончились');
      this.getScore();
      this.timer.stopTimer();
      this.congratulation = new Congratulation('div', this.timer.element.textContent);
      this.element.append(this.congratulation.wrapper);
    }

    this.activeCard.element.classList.remove('error');
    card.element.classList.remove('error');
    this.activeCard = undefined;
    this.isAnimation = false;
  }

  getScore(): number {
    console.log(this.successfulTry);
    console.log(this.errorTry);
    let fulltime = this.timer.getTime();
    let score = (this.successfulTry - this.errorTry) * 100 - fulltime * 10;
    console.log(score);
    return score < 0 ? 0 : score;
  }
}
