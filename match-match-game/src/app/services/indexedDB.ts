import { User } from "../app.api";

export class IndexedDB {
  // private openRequest: IDBOpenDBRequest;
  public db: IDBDatabase | null = null;

  constructor() {
  }

  init(databaseName: string) {
    const IDB = window.indexedDB;
    const openRequest = IDB.open(databaseName);

    openRequest.onupgradeneeded = () => {
      this.db = openRequest.result;
      let users = this.db.createObjectStore('Users', { keyPath: 'id', autoIncrement: true });
      users.createIndex('first-name', 'firstName');
      users.createIndex('last-name', 'lastName');
      users.createIndex('e-mail', 'email');
      users.createIndex('avatar', 'avatar');
      users.createIndex('best-score', 'bestScore');
      // this.db = database;
    }

    openRequest.onsuccess = () => {
      console.log('событие onsucess сработало после завершения onupgradeneeded в Init()');
      this.db = openRequest.result;
    }

    openRequest.onerror = () => {
      alert('error opening database ' + openRequest.error);
    }
  }

  write(userObject: User) { //транзакция на запись
    if (this.db !== null) {
      let tx = this.db.transaction('Users', 'readwrite');
      let users = tx.objectStore('Users');

      let addUser = users.add(userObject);
      // let addUser = users.add({ firstName: 'Anna', lastName: 'Tekunova', email: 'mambarinka@mail.ru', bestScore: '100', id: 1 });

      tx.oncomplete = () => {
        console.log('complete', addUser.result);
      }

      tx.onerror = () => {
        console.log('error', addUser.error);
      }

      tx.onabort = () => {
        console.log('abort');
      }
    }
  }

  readAll() {
    if (this.db !== null) {
      let tx = this.db.transaction('Users', 'readwrite');
      let users = tx.objectStore('Users');
      let getUsers = users.getAll();

      tx.oncomplete = () => {
        console.log(getUsers.result);
      }
    }
  }

  readFiltered() {
    if (this.db !== null) {
      let tx = this.db.transaction('Users', 'readonly');
      let users = tx.objectStore('Users');
      let getUsersFiltered = users.index('email').openCursor(null, 'next');//сортировка значений по email

      let resultBestScore: Array<any> = []; // туда скидывать при итерациях value
      getUsersFiltered.onsuccess = () => {
        let cursor = getUsersFiltered.result;
        if (cursor) {
          console.log(cursor.value);
          if (cursor.value.email[0] === 'a') {
            resultBestScore.push(cursor.value);
          }
          cursor?.continue();
        }
      }
      tx.oncomplete = () => {
        console.log(resultBestScore);
      }
    }
  }
}
