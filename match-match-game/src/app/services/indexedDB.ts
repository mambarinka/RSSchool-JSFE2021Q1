import { User } from '../app.api';

export class IndexedDB {
  // private openRequest: IDBOpenDBRequest;
  public db: IDBDatabase | null = null;

  // constructor() {}

  init(databaseName: string) {
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

      const settings = this.db.createObjectStore('Settings', {
        keyPath: 'id',
        autoIncrement: true,
      });
      settings.createIndex('cards-type', 'cardsType');
      settings.createIndex('difficulty', 'difficulty');
    };

    openRequest.onsuccess = () => {
      console.log(
        'событие onsucess сработало после завершения onupgradeneeded в Init()'
      );
      this.db = openRequest.result;
    };

    openRequest.onerror = () => {
      alert(`error opening database ${openRequest.error}`);
    };
  }

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

  readAll() {
    if (this.db !== null) {
      const tx = this.db.transaction('Users', 'readwrite');
      const users = tx.objectStore('Users');
      const getUsers = users.getAll();

      tx.oncomplete = () => {
        console.log(getUsers.result);
      };
    }
  }

  readFiltered() {
    if (this.db !== null) {
      const tx = this.db.transaction('Users', 'readonly');
      const users = tx.objectStore('Users');
      const getUsersFiltered = users.index('email').openCursor(null, 'next'); // сортировка значений по email

      const resultBestScore: Array<any> = []; // туда скидывать при итерациях value
      getUsersFiltered.onsuccess = () => {
        const cursor = getUsersFiltered.result;
        if (cursor) {
          console.log(cursor.value);
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
