import { getWinners } from '../fetch-api/fetch-api-winners';
import { Table } from '../models/base-component-table';
import { Car, Winner } from '../models/models';
import { getCarIcon } from '../service/utils';
import { CarItem } from './car';

export class TableWinners extends Table {
  thead: HTMLTableSectionElement | undefined;

  tbody: HTMLTableSectionElement | undefined;

  cellNumber: HTMLTableDataCellElement | undefined;

  cellCar: HTMLTableDataCellElement | undefined;

  cellName: HTMLTableDataCellElement | undefined;

  cellWins: HTMLTableDataCellElement | undefined;

  cellBsetTime: HTMLTableDataCellElement | undefined;

  hrowHead: HTMLTableRowElement | undefined;

  hrowBody!: HTMLTableRowElement;

  cellNumberValue: HTMLTableDataCellElement | undefined;

  cellCarValue: HTMLTableDataCellElement | undefined;

  cellNameValue: HTMLTableDataCellElement | undefined;

  cellWinsValue: HTMLTableDataCellElement | undefined;

  cellBsetTimeValue: HTMLTableDataCellElement | undefined;

  constructor() {
    super(['table-winners']);
    // this.thead = this.table.createTHead();
    // this.hrowHead = this.thead.insertRow(0);

    // this.cellNumber = this.hrowHead.insertCell(0);
    // this.cellNumber.classList.add(
    //   'table-winners__row',
    //   'table-winners__row--head'
    // );
    // this.cellNumber.textContent = 'Number';
    // this.cellCar = this.hrowHead.insertCell(1);
    // this.cellCar.classList.add(
    //   'table-winners__row',
    //   'table-winners__row--head',
    //   'table-winners__row--car'
    // );
    // this.cellCar.textContent = 'Car';
    // this.cellName = this.hrowHead.insertCell(2);
    // this.cellName.classList.add(
    //   'table-winners__row',
    //   'table-winners__row--head'
    // );
    // this.cellName.textContent = 'Name';
    // this.cellWins = this.hrowHead.insertCell(3);
    // this.cellWins.classList.add(
    //   'table-winners__row',
    //   'table-winners__row--head'
    // );
    // this.cellWins.textContent = 'Wins';
    // this.cellBsetTime = this.hrowHead.insertCell(4);
    // this.cellBsetTime.classList.add(
    //   'table-winners__row',
    //   'table-winners__row--head'
    // );
    // this.cellBsetTime.textContent = 'Best Time';


    this.getValueWinners();
  }

  getValueWinners = async () => {
    this.thead = this.table.createTHead();
    this.hrowHead = this.thead.insertRow(0);

    this.cellNumber = this.hrowHead.insertCell(0);
    this.cellNumber.classList.add(
      'table-winners__row',
      'table-winners__row--head'
    );
    this.cellNumber.textContent = 'Number';
    this.cellCar = this.hrowHead.insertCell(1);
    this.cellCar.classList.add(
      'table-winners__row',
      'table-winners__row--head',
      'table-winners__row--car'
    );
    this.cellCar.textContent = 'Car';
    this.cellName = this.hrowHead.insertCell(2);
    this.cellName.classList.add(
      'table-winners__row',
      'table-winners__row--head'
    );
    this.cellName.textContent = 'Name';
    this.cellWins = this.hrowHead.insertCell(3);
    this.cellWins.classList.add(
      'table-winners__row',
      'table-winners__row--head'
    );
    this.cellWins.textContent = 'Wins';
    this.cellBsetTime = this.hrowHead.insertCell(4);
    this.cellBsetTime.classList.add(
      'table-winners__row',
      'table-winners__row--head'
    );
    this.cellBsetTime.textContent = 'Best Time';
    let arrayWinners = (await getWinners()).items;
    console.log(arrayWinners);
    arrayWinners.map((winner: any, index: number) => {
      this.tbody = this.table.createTBody();
      this.hrowBody = this.tbody.insertRow(0);
      this.cellNumberValue = this.hrowBody.insertCell(0);
      this.cellNumberValue.classList.add('table-winners__row');
      this.cellCarValue = this.hrowBody.insertCell(1);
      this.cellCarValue.classList.add('table-winners__row');
      this.cellNameValue = this.hrowBody.insertCell(2);
      this.cellNameValue.classList.add('table-winners__row');
      this.cellWinsValue = this.hrowBody.insertCell(3);
      this.cellWinsValue.classList.add('table-winners__row');
      this.cellBsetTimeValue = this.hrowBody.insertCell(4);
      this.cellBsetTimeValue.classList.add('table-winners__row');
      this.cellNumberValue.textContent = `${index + 1}`;
      this.cellCarValue.innerHTML = getCarIcon(winner.car.color);
      this.cellNameValue.textContent = `${winner.car.name}`;
      this.cellWinsValue.textContent = `${winner.wins}`;
      this.cellBsetTimeValue.textContent = `${winner.time}`;
      return winner;
    });
  };
}
