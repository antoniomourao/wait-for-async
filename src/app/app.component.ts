import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { IncrementDecrementService } from './services/increment-decrement.service';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  providers: [IncrementDecrementService],
  selector: 'wait-for-async-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wait-for-async';

  get value() {
    return this.incrementDecrement.value;
  }

  set value(value: number) {
    this.incrementDecrement.value = value;
  }

  get message(): string {
    return this.incrementDecrement.message;
  }

  setTitle() {
    new Promise((resolve) => {
      resolve('Async Title!');
    }).then((val: any) => {
      this.title = val;
    });
  }

  constructor(public incrementDecrement: IncrementDecrementService) {}

  increment() {
    this.incrementDecrement.increment();
  }

  decrement() {
    this.incrementDecrement.decrement();
  }
}
