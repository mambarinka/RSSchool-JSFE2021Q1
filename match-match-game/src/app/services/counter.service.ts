import { CounterService } from '../app.api';

export class CounterServiceImplementation implements CounterService {
  private counter: number;

  constructor() {
    this.counter = 0;
  }

  increment(): void {
    this.counter++;
    console.log(this.counter);
  }

  // subscribeOnCounter(callback: Function): number {
  //   return callback(this.counter);
  // }
}
