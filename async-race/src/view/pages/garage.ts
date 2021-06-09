import { cars } from '../../models/constants';
import { BaseComponent, Car } from '../../models/models';
import { createHtmlElement } from '../../service/utils';
import { getCar } from '../car';
import { FormCreate } from '../form-create';

// export const renderGarage = async (): Promise<HTMLElement> => {
//   let arrayCars = await cars;
//   let carInnerHtml: string = '';
//   arrayCars.forEach((car: Car) => {
//     carInnerHtml += ` <li class="garage__item">${getCar(car).innerHTML}</li>`;
//   });

//   let garageInnerHtml = `
//   <section class="car-view">
//         <h2 class="visually-hidden">Here you can add a new car or change any car in the garage</h2>
//         <form class="car-view__form-create">
//           <input type="text" class="car-view__input" name="name" />
//           <input type="color" class="car-view__color" name="color" value="#ffffff" />
//           <button class="car-view__button car-view__button--create button" type="submit">create</button>
//         </form>
//         <form class="car-view__form-update">
//           <input type="text" class="car-view__input" name="name" disabled/>
//           <input type="color" class="car-view__color" name="color" value="#ffffff" disabled/>
//           <button class="car-view__button car-view__button--update button" type="submit">update</button>
//         </form>
//       </section>
//       <section class="race-controls">
//         <h2 class="visually-hidden">here you can start the engines of all cars, stop them and generate new ones</h2>
//         <button class="race-controls__button race-controls__button--race button" type="button">Race</button>
//         <button class="race-controls__button race-controls__button--reset button" type="button">Reset</button>
//         <button class="race-controls__button race-controls__button--generate button" type="button">generate cars</button>
//       </section>
//       <section class="garage">
//         <h1 class="page-main__title">Garage (4)</h1>
//         <h2 class="page-main__page-number">Page #1</h2>
//         <ul class="garage__list">
//         ${carInnerHtml}
//         </ul>
//       </section>
//       <article class="pagination">
//         <button class="pagination__button prev-button button">Prev</button>
//         <button class="pagination__button next-button button">next</button>
//       </article>
//   `;
//   return createHtmlElement('main', ['page-main'], garageInnerHtml);
// }

export class Garage extends BaseComponent {
  private readonly formCreate: FormCreate;
  private readonly carsList: BaseComponent;
  private readonly carItem: BaseComponent;
  constructor() {
    super('main', ['page-main']);

    this.formCreate = new FormCreate();
    // this.formCreate = new FormCreate(this.renderNewCar);
    this.carsList = new BaseComponent('ul', ['garage__list']);
    this.carItem = new BaseComponent('li');

    document.addEventListener('createCar', async (evt: CustomEventInit) => {
      await getCar(evt.detail.id);

      // console.log(evt.detail);
      await this.renderNewCar(evt.detail);
    })
  }

  render = async (): Promise<HTMLElement> => {
    this.element.append(
      this.formCreate.renderForm(),
      this.carsList.element
    );

    const arrayCars = await cars;
    arrayCars.forEach((car: Car) => {
      this.carsList.element.append(getCar(car));
    });

    return this.element;
  };

 async renderNewCar(newCar: Car) {
   await this.carsList.element.append(getCar(newCar));

  }

  // async renderNewCar() {
  //   const arrayCars = await cars;
  //   let newCar: Car= arrayCars[arrayCars.length - 1];
  //   console.log(newCar);
  //   this.carsList.element.append(getCar(newCar))
  // }

  // getHtmlGarage = async (): Promise<string> => {
  //   const arrayCars = await cars;
  //   let carInnerHtml = '';
  //   arrayCars.forEach((car: Car) => {
  //     console.log(getCar(car));
  //     carInnerHtml += `<li class="garage__item">${getCar(car).innerHTML}</li>`;
  //   });


  //   const garageInnerHtml = `
  //   <section class="car-view">
  //         <h2 class="visually-hidden">Here you can add a new car or change any car in the garage</h2>
  //         <form class="car-view__form-update">
  //           <input type="text" class="car-view__input" name="name" disabled/>
  //           <input type="color" class="car-view__color" name="color" value="#ffffff" disabled/>
  //           <button class="car-view__button car-view__button--update button" type="submit">update</button>
  //         </form>
  //       </section>
  //       <section class="race-controls">
  //         <h2 class="visually-hidden">here you can start the engines of all cars, stop them and generate new ones</h2>
  //         <button class="race-controls__button race-controls__button--race button" type="button">Race</button>
  //         <button class="race-controls__button race-controls__button--reset button" type="button">Reset</button>
  //         <button class="race-controls__button race-controls__button--generate button" type="button">generate cars</button>
  //       </section>
  //       <section class="garage">
  //         <h1 class="page-main__title">Garage (4)</h1>
  //         <h2 class="page-main__page-number">Page #1</h2>
  //         <ul class="garage__list">
  //         ${carInnerHtml}
  //         </ul>
  //       </section>
  //       <article class="pagination">
  //         <button class="pagination__button prev-button button">Prev</button>
  //         <button class="pagination__button next-button button">next</button>
  //       </article>
  //   `;


  //   return garageInnerHtml;
  // };
}
function newCar2(newCar2: any): () => Promise<HTMLElement> {
  throw new Error('Function not implemented.');
}

