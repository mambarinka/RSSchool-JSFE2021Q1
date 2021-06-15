import { getCars } from '../../fetch-api/fetch-api-garage';
import { BaseComponent } from '../../models/base-component';
import { Car } from '../../models/models';
import { startDriving, state } from '../../service/utils';
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

  private arrayCars!: Car[];

  private readonly raceControls: RaceControls;

  private readonly pagination: Pagination;

  private readonly titlePage: BaseComponent;

  private readonly titlePageNumber: BaseComponent;

  private currentPage!: number;

  private readonly message: BaseComponent;

  private arrayCarsForRace: CarItem[] = [];

  constructor() {
    super('main', ['page-main']);
    this.wrapperForm = new BaseComponent('div', ['car-view']);
    this.formCreate = new FormCreate();
    this.formUpdate = new FormUpdate();
    this.raceControls = new RaceControls(this.currentPage);
    this.titlePage = new BaseComponent('h1', ['page-main__title']);
    this.titlePageNumber = new BaseComponent('h2', ['page-main__page-number']);
    this.carsList = new BaseComponent('ul', ['garage__list']);
    this.pagination = new Pagination();
    this.message = new BaseComponent('div', ['message', 'hide']);

    document.addEventListener('createCar', async () => {
      await this.getCurrentPage(this.currentPage).then(async (currentPage) => {
        await this.render(currentPage);
      });
    });

    document.addEventListener('updateNumberCars', async () => {
      await this.getCurrentPage(this.currentPage).then(async (currentPage) => {
        this.render(this.currentPage);
        // this.render(currentPage);
      });
    });

    document.addEventListener(
      'clickOnPagination',
      async (evt: CustomEventInit) => {
        state.splice(0, state.length);
        if (evt.detail === true) {
          ++this.currentPage;
        } else if (evt.detail === false) {
          --this.currentPage;
        }
        this.render(this.currentPage);
      }
    );

    document.addEventListener('generateNewCars', async () => {
      await this.getCurrentPage(this.currentPage).then(async (currentPage) => {
        this.render(this.currentPage);
        // this.render(currentPage);
      });
    });

    this.getCurrentPage(this.currentPage).then((currentPage) => {
      this.currentPage = currentPage;
      this.render(this.currentPage);
    });

    document.addEventListener('startRace', async () => {
      const promises = this.arrayCarsForRace.map(async (carForRace) => {
        /* const { id, timeAnimation } = */ await carForRace.race(startDriving);
        // console.log(await carForRace.race(startDriving));
      });
      console.log(promises);
      await Promise.race(promises);
    });
  }

  render = async (currentPage: number): Promise<HTMLElement> => {
    document.dispatchEvent(
      new CustomEvent('getPageNumber', {
        bubbles: true,
        detail: currentPage,
      })
    );

    this.carsList.element.innerHTML = '';
    this.wrapperForm.element.append(
      this.formCreate.renderForm(),
      this.formUpdate.renderForm()
    );

    this.element.append(
      this.wrapperForm.element,
      this.raceControls.element,
      this.titlePage.element,
      this.titlePageNumber.element,
      this.carsList.element,
      this.pagination.element,
      this.message.element
    );

    this.titlePage.element.textContent = `Garage (${(await getCars()).countCars
      })`;
    this.titlePageNumber.element.textContent = `Page #${currentPage}`;

    this.arrayCarsForRace = [];
    this.arrayCars = await (async () =>
      (
        await getCars(currentPage, 7)
      ).dataCars)();
    // console.log(`this.arraycars `, this.arrayCars);
    this.arrayCars.forEach((car: Car) => {
      this.carItem = new CarItem(car, currentPage);
      this.carsList.element.append(this.carItem.render());

      this.arrayCarsForRace.push(this.carItem);
      // console.log(this.carItem.element);
    });

    return this.element;
  };

  getCurrentPage = async (currentPage: number): Promise<number> => {
    let currentPageValue = currentPage;
    currentPageValue = (await getCars()).currentPage;

    return currentPageValue;
  };
}
