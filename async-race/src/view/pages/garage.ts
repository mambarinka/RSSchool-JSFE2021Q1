import { cars } from '../../models/constants';
import { BaseComponent, Car } from '../../models/models';
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

  constructor() {
    super('main', ['page-main']);
    this.wrapperForm = new BaseComponent('div', ['car-view'])
    this.formCreate = new FormCreate();
    this.formUpdate = new FormUpdate();
    this.raceControls = new RaceControls();
    this.carsList = new BaseComponent('ul', ['garage__list']);
    this.pagination = new Pagination();

    document.addEventListener('createCar', async (evt: CustomEventInit) => {
      this.carItem = new CarItem(evt.detail);
      await this.carItem.render(evt.detail);

      await this.renderNewCar(evt.detail);
    });
  }

  render = async (): Promise<HTMLElement> => {
    this.wrapperForm.element.append(
      this.formCreate.renderForm(),
      this.formUpdate.renderForm(),
    )

    this.element.append(
      this.wrapperForm.element,
      this.raceControls.element,
      this.carsList.element,
      this.pagination.element
    );

    const arrayCars = await cars;
    console.log(arrayCars);
    arrayCars.forEach((car: Car) => {
      this.carItem = new CarItem(car);
      this.carsList.element.append(this.carItem.render(car));
    });
    return this.element;
  };

  async renderNewCar(newCar: Car) {
    this.carsList.element.append(this.carItem.render(newCar));
  }
}
