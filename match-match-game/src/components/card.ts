import { BaseComponent } from '../shared/base-component';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlipped = false;

  onClick: () => void = () => {};

  constructor(readonly image: string) {
    super('div', ['card-container']);

    this.element.innerHTML = `
    <div class="card">
    <div class="card__front" style="background-image: url('./images/${image}')"></div>
    <div class="card__back"></div>
    </div>
    `;

    this.element.onclick = () => {
      this.onClick();
    };
  }

  flipToBack(): void {
    this.isFlipped = true;
    this.element.classList.add(FLIP_CLASS);
  }

  flipToFront(): void {
    this.isFlipped = false;
    this.element.classList.remove(FLIP_CLASS);
  }

  // через промисы
  // flipToBack() {
  //   this.isFlipped = true;
  //   return this.flip(true);
  // }

  // flipToFront() {
  //   this.isFlipped = false;
  //   return this.flip();
  // }

  // private flip(isFront = false): Promise<void> {
  //   return new Promise((resolve) => {
  //     // resolve - если промис будет всегда успешно разрешаться
  //     this.element.classList.toggle(FLIP_CLASS, isFront);
  //     this.element.addEventListener('transitioned', () => resolve(), {
  //       once: true, // сработает 1 раз и удалится
  //     });
  //   });
  // }
}
