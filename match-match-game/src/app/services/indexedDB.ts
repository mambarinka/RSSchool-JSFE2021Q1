import { Settings, User } from '../app.api';
import { uuid } from './generatorKeys';

let number1: IDBRequest<number>;
export class IndexedDB {
  // private openRequest: IDBOpenDBRequest;
  public db: IDBDatabase | null = null;

  numberUsers: IDBValidKey = 0;

  defaultUsers: Array<User> = [
    {
      firstName: 'Nicci',
      lastName: 'Troiani',
      email: 'nicci@gmail.com',
      avatar: './assets/images/best-score-avatar1.png',
      bestScore: 11,
      id: uuid(),
    },
    {
      firstName: 'George',
      lastName: 'Fields',
      email: 'jack@gmail.com',
      avatar: './assets/images/best-score-avatar2.png',
      bestScore: 22,
      id: uuid(),
    },
    {
      firstName: 'Jones',
      lastName: 'Dermot',
      email: 'dermot@gamil.com',
      avatar: './assets/images/best-score-avatar3.png',
      bestScore: 33,
      id: uuid(),
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@gmail.com',
      avatar: './assets/images/best-score-avatar4.png',
      bestScore: 44,
      id: uuid(),
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
          // autoIncrement: true,
        });
        users.createIndex('name-email', ['firstName', 'lastName', 'email'], {
          unique: true,
        });
        // users.createIndex('first-name', 'firstName', { unique: true });
        // users.createIndex('last-name', 'lastName', { unique: true });
        // users.createIndex('e-mail', 'email', { unique: true });
        users.createIndex('avatar', 'avatar', { unique: false });
        users.createIndex('best-score', 'bestScore', { unique: false });
        // this.db = database;
        this.defaultUsers.forEach((defaultUser) => {
          users.put(defaultUser);
        });

        const settings = this.db.createObjectStore('Settings', {
          keyPath: 'id',
          autoIncrement: true,
        });
        settings.createIndex('game-cards-type', 'gameCardsType');
        settings.createIndex('game-difficulty-type', 'gameDifficultyType');
        settings.put(this.defaultSettings);
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
  }

  write(Object: User | Settings, ObjectStoreName: string) {
    // транзакция на запись
    if (this.db !== null) {
      const tx = this.db.transaction(ObjectStoreName, 'readwrite');
      const objects = tx.objectStore(ObjectStoreName);

      const addObject = objects.put(Object);

      tx.oncomplete = () => {
        this.numberUsers = addObject.result;
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
  readAll<RecordType>(objectStore: string): Promise<Array<RecordType>> {
    return new Promise((resolve, reject) => {
      if (this.db !== null) {
        const tx = this.db.transaction(objectStore, 'readwrite');
        const objects = tx.objectStore(objectStore);
        const getObjects = objects.getAll();
        number1 = objects.count();
        // console.log(number1);
        tx.oncomplete = () => {
          resolve(getObjects.result);
        };

        tx.onerror = () => {
          reject(getObjects.error);
        };
      }
    });
  }

  readFiltered<RecordType>(
    objectStore: string /* , sorter: (item: RecordType, itemNext: RecordType) => boolean */
  ): Promise<Array<RecordType>> {
    return new Promise((resolve, reject) => {
      if (this.db !== null) {
        const tx = this.db.transaction(objectStore, 'readonly');
        const users = tx.objectStore(objectStore);
        // console.log(users);
        const getUsersFiltered = users
          .index('best-score')
          .openCursor(null, 'prev'); // сортировка значений по email

        // console.log(users.index('best-score'));

        const resultBestScore: Array<any> = []; // туда скидывать при итерациях value
        getUsersFiltered.onsuccess = () => {
          const cursor = getUsersFiltered.result;
          if (cursor) {
            // console.log(cursor.value);
            // if (cursor.value.email[0] === 'a') {
            resultBestScore.push(cursor.value);
            // }
            // let currentValue: RecordType = cursor.value;
            // let nextValue: RecordType = cursor.value;
            // if (sorter(currentValue, nextValue)) {
            //   resultBestScore.push(currentValue);
            // }
            // console.log(resultBestScore);
            cursor?.continue();
          }
        };
        tx.oncomplete = () => {
          // console.log(resultBestScore);
          resolve(resultBestScore);
        };
      }
    });
  }

  getCurrentUser<RecordType>(ObjectStoreName: string): Promise<RecordType> {
    return new Promise((resolve) => {
      // console.log('begin');
      // console.log(this.db);
      if (this.db !== null) {
        const tx = this.db.transaction(ObjectStoreName, 'readwrite');
        const objects = tx.objectStore(ObjectStoreName);
        const currentObject = objects.getAll();
        // console.log(this.numberUsers);
        const foo = objects.get(this.numberUsers);
        // console.log(objects);
        // console.log('foo', foo);
        // var count = objects.count();
        // let lol: number = this.numberUsers as number;
        // console.log(lol);
        // count.onsuccess = function () {
        //   // console.log(count.result);
        //   return count.result;
        // }
        tx.oncomplete = () => {
          // console.dir(currentObject)
          // console.dir(currentObject.result)
          resolve(foo.result);
          // resolve(objects.get(this.numberUsers).result);
          // resolve(currentObject.result[lol]);
        };
      }
    });
  }

  writeCurrentUser(ObjectStoreName: string, currentObject: User) {
    if (this.db !== null) {
      const tx = this.db.transaction(ObjectStoreName, 'readwrite');
      const objects = tx.objectStore(ObjectStoreName);
      const addObject = objects.put(currentObject);

      tx.oncomplete = () => {
        // console.log('запись нового обьекта');
        this.numberUsers = addObject.result;
      };

      tx.onerror = () => {
        console.log('error', addObject.error);
      };
    }
  }

  // getNumberObjectInStore(): number {
  //   const tx = window.indexedDB.open('Users').result.transaction('Users', 'readwrite');
  //   const objects = tx.objectStore('Users');
  //   var count = objects.count();

  //   count.onsuccess = function () {
  //     console.log('count.result ', count.result);
  //     // return count.result;
  //   }

  //   count.onerror = () => {
  //     console.log('error', count.error);
  //   };
  //   // return count.result;
  //   console.log(count.result);
  //   return count.result;
  // }
}
export const db = new IndexedDB();
