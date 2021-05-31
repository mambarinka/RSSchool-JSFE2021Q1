import { delay } from '../shared/delay';
import { BaseComponent } from '../shared/base-component';
import { Card } from './card';
import { CardsField } from './cards-field';
import { Timer } from './timer';
import { Congratulation } from './congratulation';
import { db } from '../app/services/indexedDB';
import { User } from '../app/app.api';
import { PageBestScore } from '../app/pages/page-best-score';

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

  pageBestScore?: PageBestScore;

  cardsLength?: number;

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
    this.pageBestScore = new PageBestScore();
  }

  newGame(images: string[], imagesLength: number): void {
    this.cardsField.clear();
    const newImages = images.slice(0, imagesLength);
    const cards = newImages
      .concat(newImages)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    this.cardsField.onCardClick = (card) => this.cardHandler(card);
    this.timer.startTimer();
    return this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card) {
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

    this.cardsLength = Array.from(
      document.querySelectorAll('.card-container')
    ).length;
    const openCardsLength = Array.from(document.querySelectorAll('.ok')).length;
    if (this.cardsLength === openCardsLength) {
      this.getScore();
      this.timer.stopTimer();
      this.congratulation = new Congratulation(
        'div',
        this.timer.element.textContent,
        this.element
      );
      this.element.append(this.congratulation.wrapper);
      db.init('mambarinka').then(() => {
        db.getCurrentUser<User>('Users').then((currentObject) => {
          // console.log(currentObject);
          console.log('количество очков', this.getScore());
          currentObject.bestScore = this.getScore();
          // console.log(currentObject.id);
          db.writeCurrentUser('Users', currentObject);
          if (this.pageBestScore) {
            this.pageBestScore.getcontent();
          }
        });
      });
    }
    this.activeCard.element.classList.remove('error');
    card.element.classList.remove('error');
    this.activeCard = undefined;
    this.isAnimation = false;
  }

  getScore(): number {
    let ratio = 1;
    if (this.cardsLength === 16) {
      ratio = 4;
    } else if (this.cardsLength === 36) {
      ratio = 6;
    } else if (this.cardsLength === 64) {
      ratio = 8;
    }
    const fulltime = this.timer.getTime();
    const score =
      ((this.successfulTry - this.errorTry) * 100 - fulltime * 10) * ratio;

    return score < 0 ? 0 : score;
  }
}
