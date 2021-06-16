import { getWinners } from '../../fetch-api/fetch-api-winners';
import { BaseComponent } from '../../models/base-component';
import { Table } from '../../models/base-component-table';
import { Pagination } from '../pagination';
import { TableWinners } from '../tableWinners';

export class Winners extends BaseComponent {
  private readonly titlePage: BaseComponent;

  private readonly titlePageNumber: BaseComponent;

  private readonly table: TableWinners;

  private currentPage!: number;
  private readonly pagination: Pagination;

  constructor() {
    super('main', ['page-main']);
    this.element.style.display = 'none';

    this.titlePage = new BaseComponent('h1', ['page-main__title']);
    this.titlePageNumber = new BaseComponent('h2', ['page-main__page-number']);

    this.table = new TableWinners();
    this.pagination = new Pagination();

    this.getCurrentPage(this.currentPage).then((currentPage) => {
      this.currentPage = currentPage;
      this.render(this.currentPage);
    });

    document.addEventListener('updateNumberWinners', async () => {
      console.log('добавляю нового победителя');
      this.table.table.textContent = '';
      this.table.getValueWinners();
    })
  }

  render = async (currentPage: number): Promise<HTMLElement> => {
    // this.table.table.innerHTML = '';
    this.element.append(
      this.titlePage.element,
      this.titlePageNumber.element,
      this.table.table,
      this.pagination.element
    );
    const { items: winners, count: countWinners } = await getWinners(currentPage, 10);
    this.titlePage.element.textContent = `Winners (${countWinners})`;
    this.titlePageNumber.element.textContent = `Page #${currentPage}`;
    return this.element;
  };

  getCurrentPage = async (currentPage: number): Promise<number> => {
    let currentPageValue = currentPage;
    currentPageValue = (await getWinners()).currentPage;

    return currentPageValue;
  };
}
