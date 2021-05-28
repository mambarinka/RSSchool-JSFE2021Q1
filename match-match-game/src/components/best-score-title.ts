import { BaseComponent } from '../shared/base-component';

export class BestScoreTitle extends BaseComponent {
  constructor() {
    super('h1', ['best-score__title']);
    this.element.textContent = `
    Best players
      `;
  }
}
