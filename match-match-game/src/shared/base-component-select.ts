export class BaseComponentSelect {
  readonly select: HTMLSelectElement;

  constructor(styles: string[] = []) {
    this.select = document.createElement('select');
    this.select.classList.add(...styles);
  }
}
