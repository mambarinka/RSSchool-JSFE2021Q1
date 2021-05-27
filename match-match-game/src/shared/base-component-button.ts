export class BaseComponentButton {
  button: HTMLButtonElement;

  constructor(styles: string[] = []) {
    this.button = document.createElement('button');
    this.button.classList.add(...styles);
  }
}
