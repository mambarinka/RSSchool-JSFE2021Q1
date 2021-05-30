import { BestScoreItem } from '../../components/best-score-item';
import { BestScoreList } from '../../components/best-score-list';
import { BestScoreTitle } from '../../components/best-score-title';
import { BaseComponent } from '../../shared/base-component';
import { db } from '../services/indexedDB';
// import { db } from '../app';
// import db from '../app';

export class PageBestScore extends BaseComponent {
  title: BestScoreTitle = new BestScoreTitle();

  list: BestScoreList = new BestScoreList();

  constructor() {
    super('div', ['best-score__wrapper']);

    this.getcontent();
  }

  getcontent(): void {
    db.init('mambarinka').then(() => {
      db.readAll('Users').then((arr) => {
        for (let i = 0; i < arr.length; i++) {
          if (i === 10) {
            break;
          }
          const item: BestScoreItem = new BestScoreItem(
            arr[i].avatar,
            arr[i].firstName,
            arr[i].lastName,
            arr[i].email,
            arr[i].bestScore
          );
          this.list.element.append(item.element);
          this.element.append(this.title.element, this.list.element);
        }
      });
    });
  }
}
