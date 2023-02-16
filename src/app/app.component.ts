import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IncrementDecrementService } from './services/increment-decrement.service';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, MatButtonModule, MatIconModule],
  providers: [IncrementDecrementService],
  selector: 'wait-for-async-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  MAX_VALUE = 5;
  title = 'wait-for-async';

  constructor(public incrementDecrement: IncrementDecrementService) {}

  get value() {
    return this.incrementDecrement.value;
  }

  set value(value: number) {
    this.incrementDecrement.value = value;
  }

  get message(): string {
    return this.incrementDecrement.message;
  }

  increment() {
    this.incrementDecrement.increment();
  }

  decrement() {
    this.incrementDecrement.decrement();
  }

  setTitle() {
    new Promise((resolve) => {
      resolve('Async Title!');
    }).then((val: any) => {
      this.title = val;
    });
  }

  setTitleWithTimeout() {
    this.incrementDecrement.setTitleWithTimeout().then((val: any) => {
      this.title = val;
    });
    /** 
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('Async Title!');
      }, 4500);
    }).then((val: any) => {
      this.title = val;
    });
    */
  }
}
