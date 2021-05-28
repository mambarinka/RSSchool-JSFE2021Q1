import { BaseComponent } from '../../shared/base-component';
import { User } from '../app.api';
import { IndexedDB } from '../services/indexedDB';

export class BestScore extends BaseComponent {
  public IDB: IndexedDB = new IndexedDB();
  arrayDefaultUsers: Array<User> = [{
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    bestScore: 666
  }];

  constructor() {

    // constructor(firstName:'', lastName: '', email: '', srcAvatar: '', bestScore: 0) {
    super('div', ['best-score__wrapper']);
    this.IDB.init('mambarinka').then(() => {
      this.IDB.readAll('Users').then(arr => {
        this.arrayDefaultUsers.push(arr[0]);
        return this.arrayDefaultUsers;
        // console.log(this.arrayDefaultUsers[1].avatar);
      })
    })
    console.log(this.arrayDefaultUsers);
    console.log(this.arrayDefaultUsers);
    this.element.innerHTML = `
    <h1 class="best-score__title">Best players</h1>
      <ul class="best-score__list">
        <li class="best-score__item">
          <img src="${this.arrayDefaultUsers[0].avatar}" alt="avatar user" class="best-score__item-avatar">
          <div class="best-score__data-user">
            <span class="best-score__name-user">${this.arrayDefaultUsers[0].firstName} ${this.arrayDefaultUsers[0].lastName}</span>
            <span class="best-score__email-user">${this.arrayDefaultUsers[0].email}</span>
          </div>
          <output class="best-score__result" name="Score: ">${this.arrayDefaultUsers[0].bestScore}</output>
        </li>
      </ul>
      `;

    // this.IDB = IDB;

    // const defaultUsers: Array<User> = [
    //   {
    //     firstName: 'Nicci',
    //     lastName: 'Troiani',
    //     email: 'nicci@gmail.com',
    //     avatar: './assets/images/best-score-avatar1.png',
    //     bestScore: 456,
    //   },
    //   {
    //     firstName: 'George',
    //     lastName: 'Fields',
    //     email: 'jack@gmail.com',
    //     avatar: './assets/images/best-score-avatar2.png',
    //     bestScore: 358,
    //   },
    //   {
    //     firstName: 'Jones',
    //     lastName: 'Dermot',
    //     email: 'dermot@gamil.com',
    //     avatar: './assets/images/best-score-avatar3.png',
    //     bestScore: 211,
    //   },
    //   {
    //     firstName: 'Jane',
    //     lastName: 'Doe',
    //     email: 'jane.doe@gmail.com',
    //     avatar: './assets/images/best-score-avatar4.png',
    //     bestScore: 169,
    //   }
    // ];
    // defaultUsers.forEach(defaultUser => {
    //   console.log(defaultUser);
    //   // this.IDB.write(defaultUser);
    // });
  }

  // setDefaultUsers() {
  //   const defaultUsers: Array<User> = [
  //     {
  //       firstName: 'Nicci',
  //       lastName: 'Troiani',
  //       email: 'nicci@gmail.com',
  //       avatar: './assets/images/best-score-avatar1.png',
  //       bestScore: 456,
  //     },
  //     {
  //       firstName: 'George',
  //       lastName: 'Fields',
  //       email: 'jack@gmail.com',
  //       avatar: './assets/images/best-score-avatar2.png',
  //       bestScore: 358,
  //     },
  //     {
  //       firstName: 'Jones',
  //       lastName: 'Dermot',
  //       email: 'dermot@gamil.com',
  //       avatar: './assets/images/best-score-avatar3.png',
  //       bestScore: 211,
  //     },
  //     {
  //       firstName: 'Jane',
  //       lastName: 'Doe',
  //       email: 'jane.doe@gmail.com',
  //       avatar: './assets/images/best-score-avatar4.png',
  //       bestScore: 169,
  //     }
  //   ];
  //   defaultUsers.forEach(defaultUser => {
  //     console.log(defaultUser);
  //     this.IDB.write(defaultUser);
  //   });
  // }
}
