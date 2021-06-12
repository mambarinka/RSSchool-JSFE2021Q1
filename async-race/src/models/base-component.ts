export class BaseComponent {
  element: HTMLElement;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    innerHTML = ''
  ) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    this.element.innerHTML = innerHTML;
  }
}
