export class BaseComponentLabel {
  readonly label: HTMLLabelElement;

  constructor(styles: string[] = []) {
    this.label = document.createElement('label');
    this.label.classList.add(...styles);
  }
}
