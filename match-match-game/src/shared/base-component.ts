export class BaseComponent {
  constructor(tagName = 'div', styles: string[] = [], content = '', parentNode = null) {
    const element = document.createElement(tagName);
    element.classList.add(...styles);
    element.textContent = content;
    parentNode && parentNode.append(element);
    this.node = element;
  }
}
export class Control {
  constructor(parentNode = null, tagName = 'div', className = '', content = '') {
    const element = document.createElement(tagName);
    element.classList.add(...styles);
    element.textContent = content;
    parentNode && parentNode.append(element);
    this.node = element;
  }
}
// export class BaseComponent {
//   readonly element: HTMLElement;

//   constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
//     this.element = document.createElement(tag);
//     this.element.classList.add(...styles);
//   }

// }
