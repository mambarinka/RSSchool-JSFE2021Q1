import { BaseComponentButton } from '../shared/base-component-button';

export class ButtonCancel extends BaseComponentButton {
  // onClick: () => void = () => { };
  constructor() {
    super(['form__btn-cancel', 'button']);
    this.button.textContent = `
    cancel
      `;
    this.button.type = 'button';

    // this.button.onclick = () => {
    //   this.onClick();
    // }
  }
}
