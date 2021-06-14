import { createCar, getCars } from '../fetch-api/fetch-api-garage';
import { BaseComponent } from '../models/base-component';
import { Button } from '../models/base-component-button';
import { Car } from '../models/models';
import { generateRandomCars, startDriving } from '../service/utils';

export class RaceControls extends BaseComponent {
  private readonly buttonRace: Button;

  private readonly buttonReset: Button;

  private readonly buttonGenerate: Button;
  private readonly currentPage: number;

  constructor(currentPage: number) {
    super('section', ['race-controls']);

    this.buttonRace = new Button([
      'race-controls__button',
      'race-controls__button--race',
      'button',
    ]);
    this.buttonRace.button.textContent = 'Race';
    this.buttonReset = new Button([
      'race-controls__button',
      'race-controls__button--Reset',
      'button',
    ]);
    this.buttonReset.button.disabled = true;
    this.buttonReset.button.textContent = 'Reset';
    this.buttonGenerate = new Button([
      'race-controls__button',
      'race-controls__button--generate',
      'button',
    ]);
    this.buttonGenerate.button.textContent = 'generate cars';

    this.element.append(
      this.buttonRace.button,
      this.buttonReset.button,
      this.buttonGenerate.button
    );

    this.currentPage = currentPage;

    this.buttonGenerate.button.addEventListener('click', async () => {
      this.buttonGenerateHandler();
    });

    this.buttonRace.button.addEventListener('click', () => {
      this.buttonRaceHandler();
    })
  }

  buttonGenerateHandler = async (): Promise<void> => {
    const cars = generateRandomCars();
    await Promise.all(cars.map(async (car) => createCar(car)));

    document.dispatchEvent(
      new CustomEvent('generateNewCars', {
        bubbles: true,
      })
    );
  };

  buttonRaceHandler = async () => {
    this.buttonRace.button.disabled = true;
    this.buttonReset.button.disabled = false;

    document.dispatchEvent(
      new CustomEvent('startRace', {
        bubbles: true,
      })
    );
  }
}

