import { delay } from '../shared/delay';
import { BaseComponent } from '../shared/base-component';
import { Card } from './card';
import { CardsField } from './cards-field';
import { Timer } from './timer';
// import { CardsFieldWrapper } from './cards-field-wrapper';
// import { RootElement } from '../app/app.api';

const FLIP_DELAY = 1000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  // private readonly timer: Timer;
  private activeCard?: Card;

  private isAnimation = false;

  isGameOpen: boolean;

  timer: Timer;

  constructor(isGameOpen: boolean, timer: Timer) {
    super('div', ['cards-field__wrapper', 'hide']);

    // this.wrapper = new CardsFieldWrapper();

    this.cardsField = new CardsField();
    // this.timer = new Timer();
    this.timer = timer;
    this.element.append(this.timer.element, this.cardsField.element);

    this.isGameOpen = isGameOpen;
    if (this.element.classList.contains('hide')) {
      // console.log('игра скрыта');
      this.isGameOpen = false;
      // console.log(`isGameOpen31: ${isGameOpen}`);
    } else {
      // console.log('игра открыта');
      this.isGameOpen = true;
    }

    this.timer = timer;
    // this.wrapper.addTimer(this.timer.element);
  }

  newGame(images: string[]): void {
    // здесь добавить таймер, который стартует при старте новой игры, здесь же добавить метод финиш, подчет очков
    this.cardsField.clear();
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    // cards.forEach((card) => {
    //   // card.element.addEventListener('click', () => this.cardHandler(card));
    //   card.onClick = () => this.cardHandler(card);
    // });
    this.cardsField.onCardClick = (card) => this.cardHandler(card);
    this.timer.startTimer();
    // console.log(`this.timer.isGameOpen${this.timer.isGameOpen}`);
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
      // для подсветки красным карточки добавляем метод, н-р
      // this.activeCard.showError();
      // card.showError();
      // await delay(FLIP_DELAY);
      // потом надо удалить этот обработчик
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]); //  будут переворачиваться одновременно
    }
    //  else {
    // если совпадают то красим в зеленый
    // }
    this.activeCard = undefined; //  обнулить активную карту
    this.isAnimation = false; // для того, чтобы нельзя было ,
    //  кликать много раз мышкой и переворачивать несколько карт одновременно
  }
}
