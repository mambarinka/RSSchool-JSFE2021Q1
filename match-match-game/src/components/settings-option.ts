import { BaseComponentOption } from '../shared/base-component-option';

export class SettingsOption extends BaseComponentOption {

  constructor(value: string) {
    super(['settings__option']);
    this.option.value = value;
    this.option.textContent = value;
  }
}
