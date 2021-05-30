import { Settings, User } from '../app.api';

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

  defaultSettings: Settings = {
    gameCardsType: 'animals',
    gameDifficultyType: '4x4',
  };

  init(databaseName: string): Promise<IDBDatabase> {
    // console.log(this.defaultUsers);
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
          users.add(defaultUser);
        });

        const settings = this.db.createObjectStore('Settings', {
          keyPath: 'id',
          autoIncrement: true,
        });
        settings.createIndex('game-cards-type', 'gameCardsType');
        settings.createIndex('game-difficulty-type', 'gameDifficultyType');
        settings.add(this.defaultSettings);
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
        console.log(`error opening database ${openRequest.error}`);
      };
    });

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

  write(Object: User | Settings, ObjectStoreName: string): void {
    // транзакция на запись
    if (this.db !== null) {
      const tx = this.db.transaction(ObjectStoreName, 'readwrite');
      const users = tx.objectStore(ObjectStoreName);

      const addObject = users.add(Object);

      tx.oncomplete = () => {
        console.log('complete', addObject.result);
      };

      tx.onerror = () => {
        console.log('error', addObject.error);
      };

      tx.onabort = () => {
        console.log('abort');
      };
    }
  }

  // readAll(objectStore: string): Array<User> {
  readAll(objectStore: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      if (this.db !== null) {
        const tx = this.db.transaction(objectStore, 'readwrite');
        const objects = tx.objectStore(objectStore);
        const getObjects = objects.getAll();

        tx.oncomplete = () => {
          resolve(getObjects.result);
        };

        tx.onerror = () => {
          console.log('error', getObjects.error);
        };
      }
    });
  }

  readFiltered(): void {
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

export const db = new IndexedDB();
