import { createCar } from "../fetch-api/fetch-api-garage";
import { BaseComponent, Button } from "../models/models";
import { generateRandomCars } from "../service/utils";

export class RaceControls extends BaseComponent {
  private readonly buttonRace: Button;
  private readonly buttonReset: Button;
  private readonly buttonGenerate: Button;
  constructor() {
    super('section', ['race-controls']);

    this.buttonRace = new Button(['race-controls__button', 'race-controls__button--race', 'button']);
    this.buttonRace.button.textContent = 'Race';
    this.buttonReset = new Button(['race-controls__button', 'race-controls__button--Reset', 'button']);
    this.buttonReset.button.textContent = 'Reset';
    this.buttonGenerate = new Button(['race-controls__button', 'race-controls__button--generate', 'button']);
    this.buttonGenerate.button.textContent = 'generate cars';

    this.element.append(
      this.buttonRace.button,
      this.buttonReset.button,
      this.buttonGenerate.button
    );

    this.buttonGenerate.button.addEventListener('click', async () => {
      this.buttonGenerateHandler();
    })
  }

  buttonGenerateHandler = async () => {
    const cars = generateRandomCars();
    console.log(cars);
    await Promise.all(cars.map(async (car) => await createCar(car)));

    document.dispatchEvent(
      new CustomEvent('generateNewCars', {
        bubbles: true,
      })
    );
  }
}
