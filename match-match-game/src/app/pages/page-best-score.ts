import { BestScoreItem } from '../../components/best-score-item';
import { BestScoreList } from '../../components/best-score-list';
import { BestScoreTitle } from '../../components/best-score-title';
import { BaseComponent } from '../../shared/base-component';
import db from '../app';
export default db;

export class BestScore extends BaseComponent {
  title: BestScoreTitle = new BestScoreTitle();
  list: BestScoreList = new BestScoreList();

  constructor() {
    super('div', ['best-score__wrapper']);

    db.init('mambarinka').then(() => {
      db.readAll('Users').then(arr => {
        for (let i = 0; i < arr.length; i++) {
          //   this.element.innerHTML = `
          // <h1 class="best-score__title">Best players</h1>
          //   <ul class="best-score__list">
          //     <li class="best-score__item">
          //       <img src="${arr[0].avatar}" alt="avatar user" class="best-score__item-avatar">
          //       <div class="best-score__data-user">
          //         <span class="best-score__name-user">${arr[0].firstName} ${arr[0].lastName}</span>
          //         <span class="best-score__email-user">${arr[0].email}</span>
          //       </div>
          //       <output class="best-score__result" name="Score: ">${arr[0].bestScore}</output>
          //     </li>
          //     <li class="best-score__item">
          //       <img src="${arr[1].avatar}" alt="avatar user" class="best-score__item-avatar">
          //       <div class="best-score__data-user">
          //         <span class="best-score__name-user">${arr[1].firstName} ${arr[1].lastName}</span>
          //         <span class="best-score__email-user">${arr[1].email}</span>
          //       </div>
          //       <output class="best-score__result" name="Score: ">${arr[1].bestScore}</output>
          //     </li>
          //     <li class="best-score__item">
          //       <img src="${arr[2].avatar}" alt="avatar user" class="best-score__item-avatar">
          //       <div class="best-score__data-user">
          //         <span class="best-score__name-user">${arr[2].firstName} ${arr[2].lastName}</span>
          //         <span class="best-score__email-user">${arr[2].email}</span>
          //       </div>
          //       <output class="best-score__result" name="Score: ">${arr[2].bestScore}</output>
          //     </li>
          //     <li class="best-score__item">
          //       <img src="${arr[3].avatar}" alt="avatar user" class="best-score__item-avatar">
          //       <div class="best-score__data-user">
          //         <span class="best-score__name-user">${arr[3].firstName} ${arr[3].lastName}</span>
          //         <span class="best-score__email-user">${arr[3].email}</span>
          //       </div>
          //       <output class="best-score__result" name="Score: ">${arr[3].bestScore}</output>
          //     </li>
          //   </ul>
          //   `;
          const item: BestScoreItem = new BestScoreItem(arr[i].avatar, arr[i].firstName, arr[i].lastName, arr[i].email, arr[i].bestScore);
          this.list.element.append(item.element)
          this.element.append(this.title.element, this.list.element)
        }
      })
    })
  }
}
