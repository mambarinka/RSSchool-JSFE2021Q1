import { Settings, User } from '../app.api';
import { uuid } from './generatorKeys';

let number1: IDBRequest<number>;
export class IndexedDB {
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
        users.createIndex('avatar', 'avatar', { unique: false });
        users.createIndex('best-score', 'bestScore', { unique: false });

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
        this.db = openRequest.result;
        resolve(this.db);
      };

      openRequest.onerror = () => {
        console.log(`error opening database ${openRequest.error}`);
      };
    });
  }

  write(Object: User | Settings, ObjectStoreName: string) {
    if (this.db !== null) {
      const tx = this.db.transaction(ObjectStoreName, 'readwrite');
      const objects = tx.objectStore(ObjectStoreName);

      const addObject = objects.put(Object);

      tx.oncomplete = () => {
        this.numberUsers = addObject.result;
        console.log('complete', addObject.result);
      };
    }
  }

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

  readFiltered<RecordType>(objectStore: string): Promise<Array<RecordType>> {
    return new Promise((resolve, reject) => {
      if (this.db !== null) {
        const tx = this.db.transaction(objectStore, 'readonly');
        const users = tx.objectStore(objectStore);
        // console.log(users);
        const getUsersFiltered = users
          .index('best-score')
          .openCursor(null, 'prev');

        const resultBestScore: Array<any> = [];
        getUsersFiltered.onsuccess = () => {
          const cursor = getUsersFiltered.result;
          if (cursor) {
            resultBestScore.push(cursor.value);

            cursor?.continue();
          }
        };
        tx.oncomplete = () => {
          resolve(resultBestScore);
        };
      }
    });
  }

  getCurrentUser<RecordType>(ObjectStoreName: string): Promise<RecordType> {
    return new Promise((resolve) => {
      if (this.db !== null) {
        const tx = this.db.transaction(ObjectStoreName, 'readwrite');
        const objects = tx.objectStore(ObjectStoreName);
        const currentObject = objects.getAll();
        const foo = objects.get(this.numberUsers);

        tx.oncomplete = () => {
          resolve(foo.result);
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
        this.numberUsers = addObject.result;
      };

      tx.onerror = () => {
        console.log('error', addObject.error);
      };
    }
  }
}
export const db = new IndexedDB();
