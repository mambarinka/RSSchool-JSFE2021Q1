import { BaseComponent } from '../shared/base-component';
import { FormInput } from './form-input';
import { FormLabel } from './form-label';
import { FormRegistrationItem } from './form-registration-item';

export class FormRegistrationList extends BaseComponent {
  private readonly names: string[];

  private readonly types: string[];

  private readonly textContents: string[];

  private readonly placeHolders: string[];

  constructor() {
    super('ul', ['form__list']);

    this.names = ['first-name', 'last-name', 'e-mail'];
    this.textContents = ['First Name', 'Last Name', ' E-mail'];
    this.types = ['text', 'text', 'email'];
    this.placeHolders = ['Jessie', 'Doe', 'Jessie.Doe@gmail.com'];

    for (let i = 0; i < 3; i++) {
      const formItem: FormRegistrationItem = new FormRegistrationItem();
      const formLabel: FormLabel = new FormLabel(this.names[i], this.textContents[i]);
      const formLInput: FormInput = new FormInput(this.names[i], this.types[i], this.placeHolders[i]);
      formItem.element.append(formLabel.label, formLInput.input);
      this.element.append(formItem.element);
    }
  }
}

// export class FormRegistrationList extends BaseComponent {
//   private readonly names: string[];

//   private readonly types: string[];

//   private readonly textContents: string[];

//   private readonly placeHolders: string[];

//   constructor() {
//     super('ul', ['form__list']);

//     this.names = ['first-name', 'last-name', 'e-mail'];
//     this.types = ['text', 'text', 'email'];
//     this.textContents = ['First Name', 'Last Name', ' E-mail'];
//     this.placeHolders = ['Jessie', 'Doe', 'Jessie.Doe@gmail.com'];

//     for (let i = 0; i < 3; i++) {
//       const formItem: FormRegistrationItem = new FormRegistrationItem(
//         this.names[i],
//         this.textContents[i],
//         this.types[i],
//         this.placeHolders[i]
//       );
//       this.element.append(formItem.element);
//     }
//   }
// }
