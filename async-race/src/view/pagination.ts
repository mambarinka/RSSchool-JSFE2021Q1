import { getCars } from "../fetch-api/fetch-api-garage";
import { BaseComponent, Button } from "../models/models";
let carsPage = 1;
export default carsPage;

export class Pagination extends BaseComponent {
  private readonly buttonPrev: Button;
  private readonly buttonNext: Button;
  private currentCountCars!: number;
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

    this.buttonPrev.button.addEventListener('click', () => {
      this.buttonPrevHandler();
    })

    this.buttonNext.button.addEventListener('click', () => {
      this.buttonNextHandler();
    })

    // const numberPage = (async () => (await getCars()).countCars)();;
    // numberPage.then((countCars) => {
    //   if (countCars >= 7) {
    //     this.buttonNext.button.disabled = false;
    //   }
    // })
    // this.currentCountCars=4;
    document.addEventListener('updateNumberCars', async (evt: CustomEventInit) => {
      // await getCars();
      this.currentCountCars = (await getCars()).countCars;
      console.log(this.currentCountCars);

      console.log(carsPage * 7);
      if (carsPage * 7 < this.currentCountCars) {
        // console.log(3);
        this.buttonNext.button.disabled = false;
        // this.buttonPrev.button.disabled = true;
      } else {
        // console.log(4);
        this.buttonNext.button.disabled = true;
        // this.buttonPrev.button.disabled = false;
      }
      // console.log(evt.detail);
    });
  }

  buttonPrevHandler() {
    console.log(this.currentCountCars);
    const numberPage = (async () => (await getCars()).countCars)();
    numberPage.then((countCars) => {
      console.log(carsPage);
      if (carsPage * 7 < countCars) {
        console.log(1);
        this.buttonPrev.button.disabled = true;
      } else {
        console.log(2);
        this.buttonPrev.button.disabled = false;
      }
      carsPage--;
    });
  }

  buttonNextHandler() {

    // const numberPage = (async () => (await getCars()).countCars)();
    // numberPage.then((countCars) => {

    // });
    carsPage++;
  }
}
