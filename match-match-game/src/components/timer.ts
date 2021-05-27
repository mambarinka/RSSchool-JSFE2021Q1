import { BaseComponent } from '../shared/base-component';

export class Timer extends BaseComponent {
  private timer: NodeJS.Timeout = setInterval(() => { }, 1000);
  public isGameOpen = false;
  constructor() {
    super('div', ['timer']);
  }

  startTimer() {
    if (this.isGameOpen) {
      let time = 3600;
      this.timer = setInterval(() => {
        let min = Math.trunc((time / 60) % 60);
        let sec = (time % 60);
        this.element.textContent = `${this.getZero(min)} : ${this.getZero(sec)}`;
        time++;
      }, 1000);
    }
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  getZero(number: number) {
    if (number >= 0 && number < 10) {
      return '0' + number;
    } else {
      return number;
    }
  }
}
