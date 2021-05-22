export class BaseComponentLink {
  readonly link: HTMLAnchorElement;

  constructor(styles: string[] = []) {
    this.link = document.createElement('a');
    this.link.classList.add(...styles);
  }
}
