import { BestScoreItem } from '../../components/best-score-item';
import { BestScoreList } from '../../components/best-score-list';
import { BestScoreTitle } from '../../components/best-score-title';
import { BaseComponent } from '../../shared/base-component';
import { User } from '../app.api';
import { db } from '../services/indexedDB';
// import { db } from '../app';
// import db from '../app';
// export const num: number;
export class PageBestScore extends BaseComponent {
  title: BestScoreTitle = new BestScoreTitle();

  list: BestScoreList = new BestScoreList();

  num?: number;

  constructor() {
    super('div', ['best-score__wrapper']);

    this.getcontent();
  }

  getcontent(): void {
    db.init('mambarinka').then(() => {
      db.readAll<User>('Users').then(() => {
        db.readFiltered<User>('Users').then((resultBestScore) => {
          // console.log(resultBestScore);
          this.num = resultBestScore.length;
          for (let i = 0; i < resultBestScore.length; i++) {
            if (i === 10) {
              break;
            }
            const item: BestScoreItem = new BestScoreItem(
              resultBestScore[i].avatar,
              resultBestScore[i].firstName,
              resultBestScore[i].lastName,
              resultBestScore[i].email,
              resultBestScore[i].bestScore
            );
            this.list.element.append(item.element);
            this.element.append(this.title.element, this.list.element);
          }
        });
      });
    });
  }

  // getcontent(): void {
  //   db.init('mambarinka').then(() => {
  //     db.readAll<User>('Users').then((arr) => {
  //       for (let i = 0; i < arr.length; i++) {
  //         if (i === 10) {
  //           break;
  //         }
  //         const item: BestScoreItem = new BestScoreItem(
  //           arr[i].avatar,
  //           arr[i].firstName,
  //           arr[i].lastName,
  //           arr[i].email,
  //           arr[i].bestScore
  //         );
  //         this.list.element.append(item.element);
  //         this.element.append(this.title.element, this.list.element);
  //       }
  //     });
  //   });
  // }

  // getUsersFiltered(): void {
  //   db.readFiltered<User>('Users').then((resultBestScore) => {
  //     console.log(resultBestScore);
  //     for (let i = 0; i < resultBestScore.length; i++) {
  //       console.log( '50', resultBestScore[23].bestScore);
  //       if (i === 10) {
  //         break;
  //       }
  //       const item: BestScoreItem = new BestScoreItem(
  //         resultBestScore[i].avatar,
  //         resultBestScore[i].firstName,
  //         resultBestScore[i].lastName,
  //         resultBestScore[i].email,
  //         resultBestScore[i].bestScore
  //       );

  //       console.log(item);
  //       this.list.element.append(item.element);
  //       this.element.append(this.title.element, this.list.element);
  //     }
  //   })
  // }
}
