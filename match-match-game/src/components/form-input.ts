import { BaseComponentInput } from '../shared/base-component-input';
import { FormAvatar } from './form-avatar';
import { FormRegistrationItem } from './form-registration-item';

export class FormInput extends BaseComponentInput {
  private isValidate = true;

  private imageAvatar: FormAvatar = new FormAvatar();

  private defaultAvatar: string = this.imageAvatar.image.src;

  private formItem: FormRegistrationItem;

  constructor(
    name = '',
    type = '',
    placeholder = '',
    formItem: FormRegistrationItem,
    imageAvatar: FormAvatar
  ) {
    super(['form__item-input']);

    this.input.id = name;
    this.input.type = type;
    this.input.name = name;
    this.input.placeholder = placeholder;
    this.input.required = true;

    this.formItem = formItem;
    this.imageAvatar = imageAvatar;

    if (this.input.name === 'first-name' || this.input.name === 'last-name') {
      this.input.maxLength = 30;
      this.input.addEventListener('change', () =>
        this.inputNameHandler(this.formItem)
      );
    } else if (this.input.name === 'e-mail') {
      this.input.maxLength = 30;
      this.input.addEventListener('change', () =>
        this.inputEmailHandler(this.formItem)
      );
    } else if (this.input.name === 'file') {
      this.input.addEventListener('change', () =>
        this.inputFileHandler(this.input, this.imageAvatar)
      );
    }
  }

  inputNameHandler(formItem: FormRegistrationItem): boolean {
    // const regex = /^[а-яА-ЯёЁa-zA-Z0-9-\s+]+$/;
    // const regex = /^[^(~ ! @ # $ % * () _ — + = | : ; " ' ` < > , . ? / ^)]+$/gi;
    const regex = /^[^~!@#$%*()_—+=|:;"'`<>,.?/^]+$/gi;
    // const regex =
    //   /^[^\~\!\@\#\$\%\*\(\)\_\—\+\=\|\:\;\"\'\`\<\>\,\.\?\/\^]+$/gi;

    if (!regex.test(this.input.value)) {
      formItem.element.classList.remove('validity');
      formItem.element.classList.add('not-validity');
      this.input.setCustomValidity(
        'First name and last name cant contain these characters: ~ ! @ # $ % * +() _ — + = | : ; " ' +
        '`' +
        '< > , . ? / ^'
      );
      this.isValidate = false;
    } else {
      formItem.element.classList.remove('not-validity');
      formItem.element.classList.add('validity');
      this.input.setCustomValidity('');
      this.isValidate = true;
    }

    this.input.reportValidity();
    return this.isValidate;
  }

  inputEmailHandler(formItem: FormRegistrationItem): boolean {
    const regex =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(this.input.value)) {
      formItem.element.classList.remove('validity');
      formItem.element.classList.add('not-validity');
      this.input.setCustomValidity(
        'Email must comply with the standard email generation rule RFC'
      );
      this.isValidate = false;
    } else {
      formItem.element.classList.remove('not-validity');
      formItem.element.classList.add('validity');
      this.input.setCustomValidity('');
      this.isValidate = true;
    }

    this.input.reportValidity();
    return this.isValidate;
  }

  inputFileHandler(input: HTMLInputElement, image: FormAvatar): void {
    const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
    if (input.files !== null) {
      // console.log(input.files[0]);
      const file: File = input.files[0];
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
      if (matches) {
        const reader = new FileReader();

        reader.addEventListener(`load`, () => {
          if (reader.result !== null) {
            image.image.src = reader.result as string;
          }
          // console.log(reader.result);
        });

        reader.readAsDataURL(file);
      }
    }
  }

  // inputFileHandler(input: HTMLInputElement, image: HTMLImageElement) {
  //   console.log(input);
  //   console.log(image);
  //   const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  //   if (input.files !== null) {
  //     // console.log(input.files[0]);
  //     const file: File = input.files[0];
  //     const fileName = file.name.toLowerCase();

  //     let matches = FILE_TYPES.some(function (it) {
  //       return fileName.endsWith(it);
  //     });
  //     if (matches) {
  //       let reader = new FileReader();

  //       reader.addEventListener(`load`, () => {
  //         if (reader.result !== null) {
  //            image.src = reader.result as string;
  //         }
  //         console.log(reader);
  //         // console.log(reader.result);
  //       });

  //       reader.readAsDataURL(file);
  //     }
  //   }
  // }

  clearAvatarPreview(): void {
    if (this.imageAvatar) {
      this.imageAvatar.image.src = this.defaultAvatar;
    }
  }
}
