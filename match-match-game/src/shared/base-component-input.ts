export class BaseComponentInput {
  readonly input: HTMLInputElement;

  constructor(styles: string[] = []) {
    this.input = document.createElement('input');
    this.input.classList.add(...styles);
  }
}
