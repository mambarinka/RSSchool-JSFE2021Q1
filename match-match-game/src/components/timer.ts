import { BaseComponent } from './base-component';

export class Timer extends BaseComponent {
  constructor() {
    super('div', ['timer']);

    this.element.innerHTML = `
    <div class="timer__minute">00</div>
    <span class="timer__symbol">:</span>
    <div class="timer__second">01</div>
    `;
  }
}
