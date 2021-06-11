import { createCar, getCars } from '../../fetch-api/fetch-api-garage';
import { BaseComponent, Car, getCurrentCarsPage, getCurrentCountCars } from '../../models/models';
import { CarItem } from '../car';
import { FormCreate } from '../form-create';
import { FormUpdate } from '../form-update';
import { Pagination } from '../pagination';
import { RaceControls } from '../race-controls';

export class Garage extends BaseComponent {
  private readonly wrapperForm: BaseComponent;
  private readonly formCreate: FormCreate;
  private readonly formUpdate: FormUpdate;
  private readonly carsList: BaseComponent;
  private carItem!: CarItem;
  private readonly raceControls: RaceControls;
  private readonly pagination: Pagination;
  private readonly titlePage: BaseComponent;
  private readonly titlePageNumber: BaseComponent;
  private currentCountCars!: number;
  private carsPage!: number;

  constructor() {
    super('main', ['page-main']);
    this.wrapperForm = new BaseComponent('div', ['car-view'])
    this.formCreate = new FormCreate();
    this.formUpdate = new FormUpdate();
    this.raceControls = new RaceControls();
    this.titlePage = new BaseComponent('h1', ['page-main__title']);

    this.titlePageNumber = new BaseComponent('h2', ['page-main__page-number']);

    this.carsList = new BaseComponent('ul', ['garage__list']);
    this.pagination = new Pagination();

    document.addEventListener('createCar', async (evt: CustomEventInit) => {
      this.carItem = new CarItem(evt.detail);
      await this.carItem.render(evt.detail);

      await this.renderNewCar(evt.detail);
    });


    // document.addEventListener('updateNumberCars', async (evt: CustomEventInit) => {
    //   this.currentCountCars = await getCurrentCountCars();
    //   this.carsPage = await getCurrentCarsPage();
    //   // console.log(await this.currentCountCars);
    //   // console.log(await this.carsPage);
    //   this.carsList.element.innerHTML='';
    //   // while (this.carsList.element.lastElementChild) {
    //   //   this.carsList.element.removeChild( this.carsList.element.lastElementChild as ChildNode);
    //   // }
    //   this.render();
    // });

    document.addEventListener('updateNumberCars', async (evt: CustomEventInit) => { this.rerender() });
    document.addEventListener('clickOnPagination', async (evt: CustomEventInit) => { this.rerender() });
    document.addEventListener('generateNewCars', async (evt: CustomEventInit) => { this.rerender() });
    this.render();
  }

  render = async (): Promise<HTMLElement> => {
    this.wrapperForm.element.append(
      this.formCreate.renderForm(),
      this.formUpdate.renderForm(),
    )

    this.element.append(
      this.wrapperForm.element,
      this.raceControls.element,
      this.titlePage.element,
      this.titlePageNumber.element,
      this.carsList.element,
      this.pagination.element
    );


    this.titlePage.element.textContent = `Garage (${await getCurrentCountCars()})`;
    this.titlePageNumber.element.textContent = `Page #${await getCurrentCarsPage()}`;
    // console.log(await getCurrentCountCars());
    // console.log(await getCurrentCarsPage());
    // console.log(await getCurrentCarsPage());
    const arrayCars = await (async () => (await getCars(await getCurrentCarsPage())).dataCars)();
    // const arrayCars = await cars;

    for (let i = 0; i < arrayCars.length; i++) {
      const car = arrayCars[i];
      this.carItem = new CarItem(car);
      this.carsList.element.append(this.carItem.render(car));
    }

    // arrayCars.forEach((car: Car) => {
    //   this.carItem = new CarItem(car);
    //   this.carsList.element.append(this.carItem.render(car));
    //   this.carItem.element.style.display = 'none';

    // });
    return this.element;
  };

  async renderNewCar(newCar: Car) {
    this.carsList.element.append(this.carItem.render(newCar));
  }

  rerender = async () => {
    this.currentCountCars = await getCurrentCountCars();
    this.carsPage = await getCurrentCarsPage();
    this.carsList.element.innerHTML = '';

    this.render();
  }
}
