import { User } from '../app/app.api';
import { PageBestScore } from '../app/pages/page-best-score';
import { uuid } from '../app/services/generatorKeys';
import { db } from '../app/services/indexedDB';
import { BaseComponent } from '../shared/base-component';
import { BaseComponentForm } from '../shared/base-component-form';
import { ButtonCancel } from './button-cancel';
import { buttonMain } from './button-main';
import { ButtonSubmit } from './button-submit';
import { FormAvatar } from './form-avatar';
import { FormInput } from './form-input';
import { FormLabel } from './form-label';
import { FormRegistrationItem } from './form-registration-item';
import { FormRegistrationList } from './form-registration-list';
import { HeaderAvatar } from './header-avatar';
import { Route } from './routing';

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

  private readonly arrayInputs: Array<FormInput> = [];

  // public currentRouteElement: HTMLElement;

  pageBestScore?: PageBestScore;

  constructor(
    title: keyof HTMLElementTagNameMap = 'h2',
    headerAvatar: HeaderAvatar,
    /* currentRoute: Route */
  ) {
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
    this.formAvatar = new FormAvatar();

    this.names = ['first-name', 'last-name', 'e-mail'];
    this.textContents = ['First Name', 'Last Name', ' E-mail'];
    this.types = ['text', 'text', 'text'];
    this.placeHolders = ['Jessie', 'Doe', 'Jessie.Doe@gmail.com'];

    for (let i = 0; i < 3; i++) {
      const formItem: FormRegistrationItem = new FormRegistrationItem();
      const formLabel: FormLabel = new FormLabel(
        this.names[i],
        this.textContents[i]
      );
      const formInput: FormInput = new FormInput(
        this.names[i],
        this.types[i],
        this.placeHolders[i],
        formItem,
        this.formAvatar,
        headerAvatar
      );
      this.arrayInputs.push(formInput);
      formItem.element.append(formLabel.label, formInput.input);
      this.formList.element.append(formItem.element);
      formItem.element.classList.remove('not-validity');
    }

    this.wrapperAvatar = new BaseComponent('div', ['form__user-img-wrapper']);
    this.inputFile = new FormInput(
      'file',
      'file',
      '',
      new FormRegistrationItem(),
      this.formAvatar,
      headerAvatar
    );
    this.arrayInputs.push(this.inputFile);
    this.inputFile.input.classList.add('form__item-input--file');
    this.inputFile.input.required = false;
    this.inputFile.input.accept = 'image/png, image/jpeg';

    this.wrapperAvatar.element.append(
      this.inputFile.input,
      this.formAvatar.image
    );

    this.buttonSubmit = new ButtonSubmit();
    this.buttonCancel = new ButtonCancel();

    this.form.append(
      this.title,
      this.formList.element,
      this.wrapperAvatar.element,
      this.buttonSubmit.button,
      this.buttonCancel.button
    );

    this.form.addEventListener('submit', (evt) => {
      this.formSubmitHandler(evt);
    });
    this.buttonCancel.button.addEventListener('click', async () => {
      this.formCancelHandler();
      // currentRoute.getCurrentRoute();
    });

    this.pageBestScore = new PageBestScore();
    // this.currentRouteElement = currentRoute.getCurrentRoute();
  }

  checkValidInput = (inputsHandlers: boolean[]): boolean => {
    const isValidate: boolean = inputsHandlers.includes(true);
    return isValidate;
  };

  formSubmitHandler(evt: Event): void {
    buttonMain.button.textContent = 'Start Game';
    const registrationPage = document.querySelector('.registration');
    if (registrationPage !== null) {
      registrationPage.classList.add('hide');
    }

    evt.preventDefault();
    db.write(this.getUserObject(), 'Users');

    if (this.pageBestScore) {
      this.pageBestScore?.getcontent();
    }
  }

  getUserObject(): User {
    const userObject: User = {
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
      bestScore: 0,
      id: uuid(),
    };
    this.arrayInputs.forEach((input) => {
      if (input.input.name === 'first-name') {
        userObject.firstName = input.input.value;
      } else if (input.input.name === 'last-name') {
        userObject.lastName = input.input.value;
      } else if (input.input.name === 'e-mail') {
        userObject.email = input.input.value;
      } else if (input.input.name === 'file') {
        userObject.avatar = this.formAvatar.image.src;
      }
    });
    return userObject;
  }

  formCancelHandler(): void {
    this.form.reset();
  }
}
