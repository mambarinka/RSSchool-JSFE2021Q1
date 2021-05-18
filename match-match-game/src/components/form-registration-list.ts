import { BaseComponent } from '../shared/base-component';
import { FormRegistrationItem } from './form-registration-item';

export class FormRegistrationList extends BaseComponent {
  private readonly names: string[];

  private readonly types: string[];

  private readonly textContents: string[];

  private readonly placeHolders: string[];

  constructor() {
    super('ul', ['form__list']);

    this.names = ['first-name', 'last-name', 'e-mail'];
    this.types = ['text', 'text', 'email'];
    this.textContents = ['First Name', 'Last Name', ' E-mail'];
    this.placeHolders = ['Jessie', 'Doe', 'Jessie.Doe@gmail.coml'];

    for (let i = 0; i < 3; i++) {
      const formItem: FormRegistrationItem = new FormRegistrationItem(
        this.names[i],
        this.textContents[i],
        this.types[i],
        this.placeHolders[i]
      );
      this.element.append(formItem.element);
    }
  }
}
