import { BaseComponentImage } from '../shared/base-component-image';

export class HeaderAvatar extends BaseComponentImage {
  constructor() {
    super(['page-header__avatar']);
    this.image.src = `./assets/images/user-img.svg`;
    this.image.alt = `avatar of user`;
  }
}
