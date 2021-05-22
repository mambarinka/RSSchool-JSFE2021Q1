export class BaseComponent {
  readonly element: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
  }
}

export class Control {
  readonly node: HTMLElement;

  constructor(parentNode: HTMLElement,tagName = 'div', styles: string[] = [],  content = '') {
    const element = document.createElement(tagName);
    element.classList.add(...styles);
    element.textContent = content;

    if (parentNode !== undefined) {
      parentNode && parentNode.append(element);
    }

    this.node = element;
  }
}
