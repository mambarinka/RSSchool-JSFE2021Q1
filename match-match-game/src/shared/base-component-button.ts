export class BaseComponentButton {
  readonly button: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'button', styles: string[] = [], type = 'button') {
    this.button = document.createElement(tag);
    this.button.classList.add(...styles);
  }

}
