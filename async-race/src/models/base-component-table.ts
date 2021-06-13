export class Table {
  table: HTMLTableElement;

  constructor(styles: string[] = []) {
    this.table = document.createElement('table');
    this.table.classList.add(...styles);
  }
}
