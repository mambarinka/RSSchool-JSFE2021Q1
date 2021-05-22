import { BaseComponentImage } from '../shared/base-component-image';

export class FormAvatar extends BaseComponentImage {
  constructor() {
    super(['form__user-img']);
    this.image.src = `./assets/images/user-img.svg`;
    this.image.alt = `avatar of user`;
  }
}
