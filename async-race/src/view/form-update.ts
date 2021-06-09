import { createCar, updateCar } from "../fetch-api/fetch-api-garage";
import { BaseComponentForm, Button, Car, Input } from "../models/models";

export class FormUpdate extends BaseComponentForm {
  private readonly inputText: Input;
  private readonly inputColor: Input;
  private readonly buttonSubmit: Button;

  constructor() {
    super(['car-view__form-update']);

    this.inputText = new Input(['car-view__input']);
    this.inputText.input.type = 'text';
    this.inputText.input.name = 'name';
    this.inputText.input.disabled = true;
    this.inputColor = new Input(['car-view__color']);
    this.inputColor.input.type = 'color';
    this.inputColor.input.name = 'color';
    this.inputColor.input.disabled = true;
    this.buttonSubmit = new Button(['car-view__button', 'car-view__button--create', 'button']);
    this.buttonSubmit.button.type = 'submit';
    this.buttonSubmit.button.textContent = 'create';
    this.buttonSubmit.button.disabled = true;

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
      // id: this.getNewId()
    };
    // await updateCar(car.id,car);
    this.form.reset();
    // document.dispatchEvent(new CustomEvent('updateCar', {
    //   bubbles: true,
    //   detail: car
    // }))
  }
}
