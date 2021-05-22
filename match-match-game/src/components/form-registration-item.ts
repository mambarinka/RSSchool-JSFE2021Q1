import { BaseComponent } from '../shared/base-component';

export class FormRegistrationItem extends BaseComponent {
  constructor() {
    super('li', ['form__item']);
  }
}

// export class FormRegistrationItem extends BaseComponent {
//   // readonly label: HTMLElement;
//   constructor(name = '', textContent = '', type = '', placeHolder = '') {
//     super('li', ['form__item']);

//     this.element.innerHTML = `
//     <label class="form__item-label" for="${name}">
//     ${textContent}
//   </label>
//   <input class="form__item-input" id="${name}" type="${type}" name="${name}"
//     placeholder="${placeHolder}" required>
//     `;
//   }
// }
