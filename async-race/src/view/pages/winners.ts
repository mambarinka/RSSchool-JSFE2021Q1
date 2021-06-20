import { getWinners } from '../../fetch-api/fetch-api-winners';
import { BaseComponent } from '../../models/base-component';
import { Pagination } from '../pagination-winner';
import { TableWinners } from '../tableWinners';

let sortBy: string | null | undefined = null;
let sortOrder: string | null | undefined = null;

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
      this.table.table.textContent = '';
      this.render(this.currentPage);
    });

    document.addEventListener('clickWinsTable', async () => {
      this.setSortOrder(this.currentPage, 'wins');
    });

    document.addEventListener('clickBestTimeTable', async () => {
      this.setSortOrder(this.currentPage, 'time');
    });

    document.addEventListener(
      'clickOnPaginationWinner',
      async (evt: CustomEventInit) => {
        if (evt.detail === true) {
          ++this.currentPage;
        } else if (evt.detail === false) {
          --this.currentPage;
        }
        this.render(this.currentPage);
      }
    );
  }

  render = async (currentPage: number): Promise<HTMLElement> => {
    document.dispatchEvent(
      new CustomEvent('getPageNumberWinners', {
        bubbles: true,
        detail: currentPage,
      })
    );

    this.table.getValueWinners(currentPage);
    // this.table.table.innerHTML = '';
    this.element.append(
      this.titlePage.element,
      this.titlePageNumber.element,
      this.table.table,
      this.pagination.element
    );
    const { items: winners, count: countWinners } = await getWinners(
      currentPage,
      10
    );
    this.titlePage.element.textContent = `Winners (${countWinners})`;
    this.titlePageNumber.element.textContent = `Page #${currentPage}`;
    return this.element;
  };

  getCurrentPage = async (currentPage: number): Promise<number> => {
    let currentPageValue = currentPage;
    currentPageValue = (await getWinners()).currentPage;
    return currentPageValue;
  };

  setSortOrder = async (currentPage: number, sortByValue: string) => {
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    sortBy = sortByValue;

    const { items, count } = await getWinners(
      this.currentPage,
      10,
      sortBy,
      sortOrder
    );
    this.table.table.textContent = '';
    this.table.getValueWinners(currentPage, items);
  };
}
