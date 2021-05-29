import { BaseComponentSelect } from '../shared/base-component-select';

export class SettingsSelect extends BaseComponentSelect {
  constructor(name = '') {
    super(['settings__select']);
    this.select.id = name;
    this.select.name = name;
  }
}
