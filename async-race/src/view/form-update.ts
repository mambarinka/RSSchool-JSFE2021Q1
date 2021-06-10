import { updateCar } from "../fetch-api/fetch-api-garage";
import { BaseComponentForm, Button, Car, Input } from "../models/models";


export class FormUpdate extends BaseComponentForm {
  private readonly inputText: Input;
  private readonly inputColor: Input;
  private readonly buttonSubmit: Button;
  private currentCarId?: number;

  constructor() {
    super(['car-view__form-update']);

    this.inputText = new Input(['car-view__input']);
    this.inputText.input.id = 'update-name';
    this.inputText.input.type = 'text';
    this.inputText.input.name = 'name';
    this.inputText.input.disabled = true;
    this.inputColor = new Input(['car-view__color']);
    this.inputColor.input.id = 'update-color';
    this.inputColor.input.type = 'color';
    this.inputColor.input.name = 'color';
    this.inputColor.input.disabled = true;
    this.buttonSubmit = new Button(['car-view__button', 'car-view__button--update', 'button']);
    this.buttonSubmit.button.id = 'update-submit';
    this.buttonSubmit.button.type = 'submit';
    this.buttonSubmit.button.textContent = 'update';
    this.buttonSubmit.button.disabled = true;

    document.addEventListener('selectCar', async (evt: CustomEventInit) => {
      await console.log('start selectcar');
      this.currentCarId = evt.detail.id;
    })

    this.form.addEventListener('submit', async (evt) => {
      this.formSubmitHandler(evt);
    })
  }

  renderForm(): HTMLElement {
    this.form.append(
      this.inputText.input,
      this.inputColor.input,
      this.buttonSubmit.button
    )
    return this.form;
  }

  async formSubmitHandler(evt: Event) {
    evt.preventDefault();

    const nameCar = this.inputText.input.value;
    const colorCar = this.inputColor.input.value;

    let car: Car = {
      name: nameCar,
      color: colorCar,
      id: this.currentCarId
    }

    await updateCar(car.id!, car);
    document.dispatchEvent(new CustomEvent('updateCar', {
      bubbles: true,
      detail: car
    }))

    this.form.reset();
  }
}
