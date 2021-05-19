import { BaseComponent } from '../../shared/base-component';

export class BestScore extends BaseComponent {
  constructor() {
    super('div', ['best-score__wrapper']);
    this.element.innerHTML = `
    <h1 class="best-score__title">Best players</h1>
      <ul class="best-score__list">
        <li class="best-score__item">
          <img src="./assets/images/best-score-avatar1.png" alt="avatar user" class="best-score__item-avatar">
          <div class="best-score__data-user">
            <span class="best-score__name-user">Nicci Troiani</span>
            <span class="best-score__email-user">nicci@gmail.com</span>
          </div>
          <output class="best-score__result" name="Score: ">456</output>
        </li>
        <li class="best-score__item">
          <img src="./assets/images/best-score-avatar2.png" alt="avatar user" class="best-score__item-avatar">
          <div class="best-score__data-user">
            <span class="best-score__name-user">George Fields</span>
            <span class="best-score__email-user">jack@gmail.com</span>
          </div>
          <output class="best-score__result" name="Score: ">358</output>
        </li>
        <li class="best-score__item">
          <img src="./assets/images/best-score-avatar3.png" alt="avatar user" class="best-score__item-avatar">
          <div class="best-score__data-user">
            <span class="best-score__name-user">Jones Dermot</span>
            <span class="best-score__email-user">dermot@gamil.com</span>
          </div>
          <output class="best-score__result" name="Score: ">211</output>
        </li>
        <li class="best-score__item">
          <img src="./assets/images/best-score-avatar4.png" alt="avatar user" class="best-score__item-avatar">
          <div class="best-score__data-user">
            <span class="best-score__name-user">Jane Doe</span>
            <span class="best-score__email-user">jane.doe@gmail.com</span>
          </div>
          <output class="best-score__result" name="Score: ">169</output>
        </li>
      </ul>
      `;
  }
}
