import { getCars } from "../fetch-api/fetch-api-garage";
import { totalCarsOnPage } from "../models/constants";
import { BaseComponent, Button, getCurrentCarsPage, getCurrentCountCars } from "../models/models";


export class Pagination extends BaseComponent {
  private readonly buttonPrev: Button;
  private readonly buttonNext: Button;
  private currentCountCars!: number;
  private carsPage!: number;
  constructor() {
    super('article', ['pagination']);

    this.buttonPrev = new Button(['pagination__button', 'prev-button', 'button']);
    this.buttonPrev.button.textContent = 'Prev';
    this.buttonPrev.button.disabled = true;
    this.buttonNext = new Button(['pagination__button', 'next-button', 'button']);
    this.buttonNext.button.textContent = 'Next';
    this.buttonNext.button.disabled = true;

    this.element.append(
      this.buttonPrev.button,
      this.buttonNext.button
    )

    // this.buttonPrev.button.addEventListener('click', () => {
    //   this.buttonPrevHandler();
    // })

    // this.buttonNext.button.addEventListener('click', () => {
    //   this.buttonNextHandler();
    // })

    this.showStateButtons();


    document.addEventListener('updateNumberCars', async (evt: CustomEventInit) => {
      this.showStateButtons();
    });


    this.buttonPrev.button.addEventListener('click', () => {
      console.log('click on buttonPrev');
      this.buttonPrevHandler();
    })

    this.buttonNext.button.addEventListener('click', () => {
      console.log('click on buttonNext');
      this.buttonNextHandler();
    })
  }

  showStateButtons = async () => {
    this.carsPage = await getCurrentCarsPage();
    this.currentCountCars = await getCurrentCountCars();
    if (totalCarsOnPage < this.currentCountCars) {
      this.buttonNext.button.disabled = false;
      // console.log('разблокировать кнопку');
      // this.buttonPrev.button.disabled = true;

    } else {
      this.buttonNext.button.disabled = true;
      // this.buttonPrev.button.disabled = false;
      // console.log('заблокировать кнопку');
    }

  }
  // buttonPrevHandler() {
  //   console.log(this.currentCountCars);
  //   const numberPage = (async () => (await getCars()).countCars)();

  //   numberPage.then(async (countCars) => {
  //     console.log(this.carsPage);
  //     if (await this.carsPage * 7 < countCars) {
  //       console.log(1);
  //       this.buttonPrev.button.disabled = true;
  //     } else {
  //       console.log(2);
  //       this.buttonPrev.button.disabled = false;
  //     }
  //     this.carsPage--;
  //   });
  // }

  buttonPrevHandler() {
    document.dispatchEvent(
      new CustomEvent('clickOnPagination', {
        bubbles: true,
      })
    );
    this.carsPage--;
  }
  buttonNextHandler() {
    document.dispatchEvent(
      new CustomEvent('clickOnPagination', {
        bubbles: true,
      })
    );
    this.carsPage++;
  }
}
