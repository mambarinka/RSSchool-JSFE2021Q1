import { BaseComponent } from '../shared/base-component';

export class FormRegistrationItem extends BaseComponent {
  // readonly label: HTMLElement;
  constructor(name = '', textContent = '', type = '', placeHolder = '') {
    super('li', ['form__item']);

    // this.label = document.createElement(label);
    // this.label.classList.add('form__item-label');
    // this.element.append(this.label);

    this.element.innerHTML = `
    <label class="form__item-label" for="${name}">
    ${textContent}
  </label>
  <input class="form__item-input" id="${name}" type="${type}" name="${name}"
    placeholder="${placeHolder}" required>
    `;
  }
}
