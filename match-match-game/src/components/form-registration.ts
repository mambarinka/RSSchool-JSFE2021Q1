import { User } from '../app/app.api';
import { BaseComponent } from '../shared/base-component';
import { BaseComponentForm } from '../shared/base-component-form';
import { ButtonCancel } from './button-cancel';
import { ButtonSubmit } from './button-submit';
import { FormAvatar } from './form-avatar';
import { FormInput } from './form-input';
import { FormLabel } from './form-label';
import { FormRegistrationItem } from './form-registration-item';
import { FormRegistrationList } from './form-registration-list';

export class FormRegistration extends BaseComponentForm {
  readonly title: HTMLElement;

  readonly formList: FormRegistrationList;

  readonly formAvatar: FormAvatar;

  readonly inputFile: FormInput;

  readonly wrapperAvatar: BaseComponent;

  readonly buttonSubmit: ButtonSubmit;

  readonly buttonCancel: ButtonCancel;

  private readonly names: string[];

  private readonly types: string[];

  private readonly textContents: string[];

  private readonly placeHolders: string[];

  private readonly arrayInputsHandler: Array<boolean> = [];

  private readonly arrayInputs: Array<FormInput> = [];

  constructor(title: keyof HTMLElementTagNameMap = 'h2') {
    super(['form']);

    this.title = document.createElement(title);
    this.title.classList.add('form__title');
    this.title.textContent = `
    Registr new Player
      `;
    this.form.method = 'post';
    this.form.enctype = 'multipart/form-data';
    this.form.autocomplete = 'off';


    this.formList = new FormRegistrationList();

    this.names = ['first-name', 'last-name', 'e-mail'];
    this.textContents = ['First Name', 'Last Name', ' E-mail'];
    this.types = ['text', 'text', 'text'];
    this.placeHolders = ['Jessie', 'Doe', 'Jessie.Doe@gmail.com'];

    for (let i = 0; i < 3; i++) {
      const formItem: FormRegistrationItem = new FormRegistrationItem();
      const formLabel: FormLabel = new FormLabel(this.names[i], this.textContents[i]);
      const formInput: FormInput = new FormInput(this.names[i], this.types[i], this.placeHolders[i], formItem);
      this.arrayInputsHandler.push(formInput.inputNameHandler(formItem));
      this.arrayInputs.push(formInput);
      formItem.element.append(formLabel.label, formInput.input);
      this.formList.element.append(formItem.element);
      formItem.element.classList.remove('not-validity');
    }

    this.wrapperAvatar = new BaseComponent('div', ['form__user-img-wrapper']);
    this.inputFile = new FormInput('file', 'file', '', new FormRegistrationItem());
    this.arrayInputs.push(this.inputFile);
    this.inputFile.input.classList.add('form__item-input--file');
    this.inputFile.input.required = false;
    this.inputFile.input.accept = 'image/png, image/jpeg';
    this.formAvatar = new FormAvatar();
    this.wrapperAvatar.element.append(this.inputFile.input, this.formAvatar.image);

    this.buttonSubmit = new ButtonSubmit();
    this.buttonCancel = new ButtonCancel();

    this.form.append(
      this.title,
      this.formList.element,
      this.wrapperAvatar.element,
      this.buttonSubmit.button,
      this.buttonCancel.button
    );

    this.form.addEventListener('submit', (evt) =>
      this.formSubmitHandler(evt));
  }

  // checkValidInput(inputsHandlers: boolean[]): boolean {
  //   let isNotValidate: boolean = inputsHandlers.includes(true);
  //   return isNotValidate;
  // }

  formSubmitHandler(evt: Event) {
    // if (this.checkValidInput(this.arrayInputsHandler)) {
    //   console.log('переданы не валидные значения');
    //   evt.preventDefault();
    // }
    evt.preventDefault();
    this.getUserObject();
  }

  getUserObject() {
    let userObject: User = {firstName: '', lastName: '', email: ''};
    this.arrayInputs.forEach((input) => {
      console.log(input.input.value);
      if (input.input.name === 'first-name') {
        userObject.firstName = input.input.value;
      } else if (input.input.name === 'last-name') {
        userObject.lastName = input.input.value;
      } else if (input.input.name === 'e-mail') {
        userObject.email = input.input.value;
      }
    });
    console.log(userObject);

    return userObject;
  }
}
