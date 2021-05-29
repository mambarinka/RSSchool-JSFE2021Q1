export class BaseComponentOption {
  readonly option: HTMLOptionElement;

  constructor(styles: string[] = []) {
    this.option = document.createElement('option');
    this.option.classList.add(...styles);
  }
}
