export class BaseComponentImage {
  readonly image: HTMLImageElement;

  constructor(styles: string[] = []) {
    this.image = document.createElement('img');
    this.image.classList.add(...styles);
  }
}
