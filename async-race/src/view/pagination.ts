import { getCars } from '../fetch-api/fetch-api-garage';
// import { getWinners } from '../fetch-api/fetch-api-winners';
import { BaseComponent } from '../models/base-component';
import { Button } from '../models/base-component-button';
import { totalCarsOnPage, totalWinnersOnPage } from '../models/constants';

export class Pagination extends BaseComponent {
  private readonly buttonPrev: Button;

  private readonly buttonNext: Button;

  private currentCountCars!: number;
  // private currentCountWinners!: number;

  constructor() {
    super('article', ['pagination']);

    this.buttonPrev = new Button([
      'pagination__button',
      'prev-button',
      'button',
    ]);
    this.buttonPrev.button.textContent = 'Prev';
    this.buttonPrev.button.disabled = true;
    this.buttonNext = new Button([
      'pagination__button',
      'next-button',
      'button',
    ]);
    this.buttonNext.button.textContent = 'Next';
    this.buttonNext.button.disabled = true;

    this.element.append(this.buttonPrev.button, this.buttonNext.button);

    this.showStateButtonsGarage();
    // this.showStateButtonsWinners();

    this.buttonPrev.button.addEventListener('click', () =>
      this.buttonPrevHandler()
    );

    this.buttonNext.button.addEventListener('click', () =>
      this.buttonNextHandler()
    );
  }

  showStateButtonsGarage = async (): Promise<void> => {
    let currentPage;
    await document.addEventListener(
      'getPageNumberGarage',
      async (evt: CustomEventInit) => {
        this.currentCountCars = (await getCars()).countCars;
        currentPage = evt.detail;
        if (this.currentCountCars > totalCarsOnPage) {
          if (currentPage * totalCarsOnPage < this.currentCountCars) {
            this.buttonNext.button.disabled = false;
          } else {
            this.buttonNext.button.disabled = true;
          }

          if (currentPage > 1) {
            this.buttonPrev.button.disabled = false;
          } else {
            this.buttonPrev.button.disabled = true;
          }
        }
      }
    );
  };

  // showStateButtonsWinners = async (): Promise<void> => {
  //   let currentPage;
  //   await document.addEventListener('getPageNumberWinners',
  //     async (evt: CustomEventInit) => {
  //       this.currentCountWinners = (await getWinners()).count;
  //       currentPage = evt.detail;
  //       console.log(this.currentCountWinners);
  //       console.log(totalWinnersOnPage);
  //       console.log(currentPage);
  //       if (this.currentCountWinners > totalWinnersOnPage) {
  //         if (currentPage * totalWinnersOnPage < this.currentCountWinners) {
  //           this.buttonNext.button.disabled = false;
  //         } else {
  //           console.log('dddddddd');
  //           this.buttonNext.button.disabled = true;
  //         }

  //         if (currentPage > 1) {
  //           this.buttonPrev.button.disabled = false;
  //         } else {
  //           this.buttonPrev.button.disabled = true;
  //         }
  //       }
  //     }
  //   )
  // }

  buttonPrevHandler = () => {
    document.dispatchEvent(
      new CustomEvent('clickOnPagination', {
        bubbles: true,
        detail: false,
      })
    );
  };

  buttonNextHandler = () => {
    document.dispatchEvent(
      new CustomEvent('clickOnPagination', {
        bubbles: true,
        detail: true,
      })
    );
  };
}
