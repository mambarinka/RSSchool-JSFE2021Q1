import { delay } from '../shared/delay';
import { BaseComponent } from '../shared/base-component';
import { Card } from './card';
import { CardsField } from './cards-field';
import { Timer } from './timer';

const FLIP_DELAY = 1000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;
  private activeCard?: Card;
  private isAnimation = false;
  isGameOpen: boolean;
  timer: Timer;

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
    console.log(images);
    let newImages = images.slice(0, imagesLength);
    console.log(newImages);
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
