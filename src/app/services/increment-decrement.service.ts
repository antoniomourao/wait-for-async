import { Injectable } from '@angular/core';

@Injectable()
export class IncrementDecrementService {
  MAX_VALUE = 5;

  value = 0;
  message!: string;

  increment() {
    setTimeout(() => {
      if (this.value < this.MAX_VALUE) {
        this.value += 1;
        this.message = '';
      } else {
        this.message = 'Maximum reached!';
      }
    }, 5000); // wait 5 seconds to increment the value
  }

  decrement() {
    setTimeout(() => {
      if (this.value > 0) {
        this.value -= 1;
        this.message = '';
      } else {
        this.message = 'Minimum reached!';
      }
    }, 5000); // wait 5 seconds to increment the value
  }
}
