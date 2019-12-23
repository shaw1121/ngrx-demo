import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, Decrement, Reset } from 'src/app/state/counter/counter.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css']
})
export class MyCounterComponent {
  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    // Inject the Store service into your component to dispatch the counter actions, and use the select operator to select data from the state
    this.count$ = store.pipe(select('count')); // count 已在 app.module中注册过，选择'count'
  }

  increment() {
    // 派发行为
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(new Decrement());
  }
 
  reset() {
    this.store.dispatch(new Reset());
  }
}
