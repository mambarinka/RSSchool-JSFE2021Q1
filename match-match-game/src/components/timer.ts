import { BaseComponent } from '../shared/base-component';

export class Timer extends BaseComponent {
  private timer: NodeJS.Timeout = setInterval(() => { }, 1000);

  public isGameOpen = false;
  min: number = 0;
  sec: number = 0;
  constructor() {
    super('div', ['timer']);
  }

  startTimer(): void {
    if (this.isGameOpen) {
      let time = 3600;
      this.timer = setInterval(() => {
        this.min = Math.trunc((time / 60) % 60);
        this.sec = time % 60;
        this.element.textContent = `${this.getZero(this.min)} : ${this.getZero(
          this.sec
        )}`;
        time++;
      }, 1000);
    }
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }

  getZero = (minOrSec: number): number | string => {
    if (minOrSec >= 0 && minOrSec < 10) {
      return `0${minOrSec}`;
    }
    return minOrSec;
  };

  getTime(): number {
    return this.min * 60 + this.sec;
  }
}
