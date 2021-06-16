import { getCar, getCars } from '../../fetch-api/fetch-api-garage';
import { saveWinner } from '../../fetch-api/fetch-api-winners';
import { BaseComponent } from '../../models/base-component';
import { Car, PromiseWinner } from '../../models/models';
import { startDriving } from '../../service/utils';
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
      const promises: PromiseWinner[] = [];

      this.arrayCarsForRace.map(async (carForRace) => {
        await carForRace.race(startDriving).then((promise) => {
          if (promise.success !== false) {
            promises.push(promise);
          }
        });
      });

      setTimeout(async () => {
        const winner = await Promise.race(promises);
        const { id, timeAnimation } = winner;
        await saveWinner(id!, +(timeAnimation / 1000).toFixed(2)).catch(
          (error) => {
            console.log(`maybe no winner found: ${error}`);
          }
        );
        this.message.element.classList.remove('hide');
        document.body.classList.add('substrate');
        const car = await getCar(id);

        this.message.element.textContent = `${car.name} went first in ${+(
          timeAnimation / 1000
        ).toFixed(2)} seconds`;
      }, 10000);

      console.log(
        'Победитель отобразится через 10 секунд 🧡, пожалуйста, подождите ٩(｡•́‿•̀｡)۶'
      );
    });

    document.body.addEventListener('click', () => {
      this.clickForRemoveMessage();
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

    this.titlePage.element.textContent = `Garage (${
      (await getCars()).countCars
    })`;
    this.titlePageNumber.element.textContent = `Page #${currentPage}`;

    this.arrayCarsForRace = [];
    this.arrayCars = await (async () =>
      (
        await getCars(currentPage, 7)
      ).dataCars)();
    this.arrayCars.forEach((car: Car) => {
      this.carItem = new CarItem(car, currentPage);
      this.carsList.element.append(this.carItem.render());

      this.arrayCarsForRace.push(this.carItem);
    });

    return this.element;
  };

  getCurrentPage = async (currentPage: number): Promise<number> => {
    let currentPageValue = currentPage;
    currentPageValue = (await getCars()).currentPage;

    return currentPageValue;
  };

  clickForRemoveMessage = () => {
    document.body.classList.remove('substrate');
    this.message.element.classList.add('hide');
  };
}
