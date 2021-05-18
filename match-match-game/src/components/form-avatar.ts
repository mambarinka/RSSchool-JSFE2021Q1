import { BaseComponent } from '../shared/base-component';

export class FormAvatar extends BaseComponent {
  constructor() {
    super('img', ['form__user-img']);

    (<HTMLImageElement>this.element).src = `./assets/images/user-img.svg`;
    (<HTMLImageElement>this.element).alt = `avatar of user`;
  }
}
