import { User } from '../app.api';

export class IndexedDB {
  // private openRequest: IDBOpenDBRequest;
  public db: IDBDatabase | null = null;

  defaultUsers: Array<User> = [
    {
      firstName: 'Nicci',
      lastName: 'Troiani',
      email: 'nicci@gmail.com',
      avatar: './assets/images/best-score-avatar1.png',
      bestScore: 456,
    },
    {
      firstName: 'George',
      lastName: 'Fields',
      email: 'jack@gmail.com',
      avatar: './assets/images/best-score-avatar2.png',
      bestScore: 358,
    },
    {
      firstName: 'Jones',
      lastName: 'Dermot',
      email: 'dermot@gamil.com',
      avatar: './assets/images/best-score-avatar3.png',
      bestScore: 211,
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@gmail.com',
      avatar: './assets/images/best-score-avatar4.png',
      bestScore: 169,
    },
  ];

  init(databaseName: string): Promise<IDBDatabase> {
    console.log(this.defaultUsers);
    return new Promise((resolve, reject) => {
      const IDB = window.indexedDB;
      const openRequest = IDB.open(databaseName);

      openRequest.onupgradeneeded = () => {
        this.db = openRequest.result;
        const users = this.db.createObjectStore('Users', {
          keyPath: 'id',
          autoIncrement: true,
        });
        users.createIndex('first-name', 'firstName');
        users.createIndex('last-name', 'lastName');
        users.createIndex('e-mail', 'email');
        users.createIndex('avatar', 'avatar');
        users.createIndex('best-score', 'bestScore');
        // this.db = database;
        this.defaultUsers.forEach((defaultUser) => {
          // console.log(defaultUser);

          users.add(defaultUser);
        });

        const settings = this.db.createObjectStore('Settings', {
          keyPath: 'id',
          autoIncrement: true,
        });
        settings.createIndex('cards-type', 'cardsType');
        settings.createIndex('difficulty', 'difficulty');
      };

      openRequest.onsuccess = () => {
        // console.log(
        //   'событие onsucess сработало после завершения onupgradeneeded в Init()'
        // );
        this.db = openRequest.result;
        resolve(this.db);
        // console.log(this.db);
      };

      openRequest.onerror = () => {
        alert(`error opening database ${openRequest.error}`);
      };
    })

    // console.log(this.db);
  }

  // init(databaseName: string) {
  //   const IDB = window.indexedDB;
  //   const openRequest = IDB.open(databaseName);

  //   openRequest.onupgradeneeded = () => {
  //     this.db = openRequest.result;
  //     const users = this.db.createObjectStore('Users', {
  //       keyPath: 'id',
  //       autoIncrement: true,
  //     });
  //     users.createIndex('first-name', 'firstName');
  //     users.createIndex('last-name', 'lastName');
  //     users.createIndex('e-mail', 'email');
  //     users.createIndex('avatar', 'avatar');
  //     users.createIndex('best-score', 'bestScore');
  //     // this.db = database;
  //     this.defaultUsers.forEach((defaultUser) => {
  //       // console.log(defaultUser);

  //       users.add(defaultUser);
  //     });

  //     const settings = this.db.createObjectStore('Settings', {
  //       keyPath: 'id',
  //       autoIncrement: true,
  //     });
  //     settings.createIndex('cards-type', 'cardsType');
  //     settings.createIndex('difficulty', 'difficulty');
  //   };

  //   openRequest.onsuccess = () => {
  //     // console.log(
  //     //   'событие onsucess сработало после завершения onupgradeneeded в Init()'
  //     // );
  //     this.db = openRequest.result;
  //     // console.log(this.db);
  //   };

  //   openRequest.onerror = () => {
  //     alert(`error opening database ${openRequest.error}`);
  //   };
  //   // console.log(this.db);
  // }

  write(userObject: User) {
    // транзакция на запись
    if (this.db !== null) {
      const tx = this.db.transaction('Users', 'readwrite');
      const users = tx.objectStore('Users');

      const addUser = users.add(userObject);

      tx.oncomplete = () => {
        console.log('complete', addUser.result);
      };

      tx.onerror = () => {
        console.log('error', addUser.error);
      };

      tx.onabort = () => {
        console.log('abort');
      };
    }
  }

  // readAll(objectStore: string): Array<User> {
  readAll(objectStore: string): Promise<Array<User>> {
    return new Promise((resolve, reject) => {
      // console.log(`метод readAll start    ${this.db}`);
      if (this.db !== null) {
        const tx = this.db.transaction(objectStore, 'readwrite');
        const users = tx.objectStore(objectStore);
        const getUsers = users.getAll();

        tx.oncomplete = () => {
          resolve(getUsers.result);
        };

        tx.onerror = () => {
          console.log('error', getUsers.error);
        };
      }
    })
  }

  readFiltered() {
    if (this.db !== null) {
      const tx = this.db.transaction('Users', 'readonly');
      const users = tx.objectStore('Users');
      // console.log(users);
      const getUsersFiltered = users
        .index('best-score')
        .openCursor(null, 'next'); // сортировка значений по email

      // console.log(users.index('best-score').openCursor(null, 'next'));

      const resultBestScore: Array<any> = []; // туда скидывать при итерациях value
      getUsersFiltered.onsuccess = () => {
        const cursor = getUsersFiltered.result;
        if (cursor) {
          // console.log(cursor.value);
          if (cursor.value.email[0] === 'a') {
            resultBestScore.push(cursor.value);
          }
          cursor?.continue();
        }
      };
      tx.oncomplete = () => {
        console.log(resultBestScore);
      };
    }
  }
}
