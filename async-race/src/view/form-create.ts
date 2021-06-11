import { createCar, getCars } from '../fetch-api/fetch-api-garage';
import { BaseComponentForm, Button, Car, Input } from '../models/models';

export class FormCreate extends BaseComponentForm {
  private readonly inputText: Input;

  private readonly inputColor: Input;

  private readonly buttonSubmit: Button;

  idNum = 5;

  constructor() {
    super(['car-view__form-create']);

    this.inputText = new Input(['car-view__input']);
    this.inputText.input.type = 'text';
    this.inputText.input.name = 'name';
    this.inputColor = new Input(['car-view__color']);
    this.inputColor.input.type = 'color';
    this.inputColor.input.name = 'color';
    this.inputColor.input.setAttribute('value','#13406c');
    this.buttonSubmit = new Button([
      'car-view__button',
      'car-view__button--create',
      'button',
    ]);
    this.buttonSubmit.button.type = 'submit';
    this.buttonSubmit.button.textContent = 'create';

    this.form.addEventListener('submit', async (evt) => {
      try {
      await this.formSubmitHandler(evt);
      } catch(e) {
        console.log(e);
        console.log('ошибка');
      }
    });
  }

  renderForm(): HTMLElement {
    this.form.append(
      this.inputText.input,
      this.inputColor.input,
      this.buttonSubmit.button
    );
    return this.form;
  }

  async formSubmitHandler(evt: Event) {
    evt.preventDefault();
    const nameCar = this.inputText.input.value;
    const colorCar = this.inputColor.input.value;

    const car: Car = {
      name: nameCar,
      color: colorCar,
    };
    await createCar(car);
    this.form.reset();
    document.dispatchEvent(
      new CustomEvent('createCar', {
        bubbles: true,
        detail: car,
      })
    );
    document.dispatchEvent(
      new CustomEvent('updateNumberCars', {
        bubbles: true,
      })
    );

    // const numberPage = (async () => (await getCars()).countCars)();;
    // numberPage.then((countCars) => {
    //   if (countCars>=7) {
    //    document.querySelector('.next-button')?.setAttribute('disabled', 'false');
    //   }
    // })
  }
}
