import { BaseComponent } from '../shared/base-component';

export class BestScoreItem extends BaseComponent {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  bestScore: number;

  constructor(avatar: string, firstName: string, lastName: string, email: string, bestScore: number) {
    super('li', ['best-score__item']);
    this.avatar = avatar;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.bestScore = bestScore
      ;
    this.element.innerHTML = `<img src="${this.avatar}" alt="avatar user" class="best-score__item-avatar">
         <div class="best-score__data-user">
            <span class="best-score__name-user">${this.firstName} ${this.lastName}</span>
            <span class="best-score__email-user">${this.email}</span>
          </div>
          <output class="best-score__result" name="Score: ">${this.bestScore}</output>`;
  }
}
