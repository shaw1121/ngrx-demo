

# 前提知识：
1. RxJS
2. Redux
3. TypeScript 类型、继承

# 主要概念：

## Actions
Actions are one of the main building blocks in NgRx. Actions express unique events that happen throughout your application. From user interaction with the page, external interaction through network requests, and direct interaction with device APIs, these and more events are described with actions.

```ts
import { Action } from '@ngrx/store';

export enum ActionTypes {
    Increment = '[Counter Component] Increment',
    Decrement = '[Counter Component] Decrement',
    Reset = '[Counter Component] Reset',
}

export class Increment implements Action {
    readonly type = ActionTypes.Increment;
}

export class Decrement implements Action {
    readonly type = ActionTypes.Decrement;
}

export class Reset implements Action {
    readonly type = ActionTypes.Reset;
}

export type CounterActions = Increment | Decrement | Reset
```

## Reducers
Reducers in NgRx are responsible for handling transitions from one state to the next state in your application. Reducer functions handle these transitions by determining which actions to handle based on the type.

* [pure function](https://github.com/shaw1121/blog/blob/shaw-dev/md/pure-function.md)

They produce the same output for a given input. They are without side effects and handle each state transition synchronously. Each reducer function takes the latest Action dispatched, the current state, and determines whether to return a newly modified state or the original state

* reducer and action when dispatched

When an action is dispatched, all registered reducers receive the action. Whether they handle the action is determined by the switch statement. For this reason, each switch statement always includes a default case that returns the previous state when the reducer function doesn't need to handle the action.

```ts
import { Action } from '@ngrx/store';
import { ActionTypes } from './counter.actions';

export const initialState = 0;

// Define a reducer function to handle changes in the counter value based on the provided actions.
// Reducers规定了行为对应的具体状态变化。它是纯函数，通过接收前一个状态和派发行为返回新对象作为下一个
// 状态的方式来改变状态，新对象通常用Object.assign方法和扩展语法来实现。
export function counterReducer(state = initialState, action: Action) {
    switch (action.type) {
        case ActionTypes.Increment: 
            return state + 1;
        case ActionTypes.Decrement:
            return state - 1;
        case ActionTypes.Reset:
            return 0;
        default:
            return state;
    }
}

```

**Meta-reducers**

Developers can think of meta-reducers as hooks into the action->reducer pipeline. Meta-reducers allow developers to pre-process actions before normal reducers are invoked.

Use the metaReducers configuration option to provide an array of meta-reducers that are composed from right to left.

Note: Meta-reducers in NgRx are similar to middleware used in Redux.

参见logger function in file app.state.ts

## Effects
  
**Reducers** are only responsible for deciding which state transitions need to occur for a given action.

In an application there is also a need to handle impure actions, e.g. AJAX requests, in NgRx we call them **Effects**.

Effects are built on top of observable streams provided by RxJS. Effects are listeners of observable streams that continue until an error or completion occurs. 
它实际上是一个监听器，用来处理“非纯” actions。使用时只需注册在module中即可，如
```ts
EffectsModule.forRoot([MovieEffects]), // 注册 root effects
```

Effects are an RxJS powered side effect model for Store. Effects use streams to provide new sources of actions to reduce state based on external interactions such as network requests, web socket messages and time-based events.
Effects利用流来提供actions的新来源，以减少基于外部交互（如网络请求、web socket信息和基于时间的事件）的state。

Effects are where you handle tasks such as fetching data, long-running tasks that produce multiple events, and other external interactions where your components don't need explicit knowledge of these interactions.

**Key Concepts**
* Effects isolate side effects from components, allowing for more pure components that select state and dispatch actions.
* Effects are **long-running services** that listen to an observable of every action dispatched from the Store.
    长时间运行着的服务，监听从 Store 中分发的每个action
* Effects filter those actions based on the type of action they are interested in. This is done by using an operator.
* Effects perform tasks, which are synchronous or asynchronous and return a new action.
    返回一个新的action

传统上，组件通过调用服务来获取外部数据，承担着较多的责任。
Effects 与 Store结合使用时，降低了组件的责任。在大型应用中，这很重要。
Effects处理外部数据和交互，允许服务具有更少的状态，只执行与外部交互相关的任务。

例子见：
movie.effects.ts file
```ts
import { MoviesService } from '../movies.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

// An injectable Actions service that provides an observable stream
//  of all actions dispatched after the latest state has been reduced.
@Injectable()
export class MovieEffects {

  // Observable streams are decorated with metadata using the Effect decorator. The metadata is used to register 
  // the streams that are subscribed to the store. 
  // Any action returned from the effect stream is then dispatched back to the Store.
  @Effect()
  loadMovies$ = this.actions$.pipe(
      // The ofType operator takes one more action types as arguments to filter on which actions to act upon.
      ofType('[Movies Page] Load Movies'), 
      mergeMap(() => this.moviesService.getAll().pipe(
          map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })), // 返回新的 actions
          catchError(() => of({type: '[Movies API] Movies Loaded Error'}))
        )
      )
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) { }
}
```

```ts
// pipe操作符源码摘录，最后返回的也就是 Observable
 pipe<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): Observable<B>;
```

## Selectors
Selectors are pure functions used for obtaining slices of store state. 

```ts
// selector.d.ts
// createSelector 函数源码，可看到，该函数可连接最多八个选择器，并可传入参数
export declare function createSelector<State, S1, S2, Result>(s1: Selector<State, S1>, s2: Selector<State, S2>, projector: (s1: S1, s2: S2) => Result): MemoizedSelector<State, Result>;
```
参数：Selector
```ts
// _@ngrx_store@7.3.0@@ngrx\store\src\models.d.ts
export declare type Selector<T, V> = (state: T) => V;
```

返回值：
```ts
export declare type AnyFn = (...args: any[]) => any;

export interface MemoizedSelector<State, Result> extends Selector<State, Result> {
    release(): void; // 该方法可以将memoized 值置为null，释放选择器，还可以将祖先选择器递归的释放，参见selector-example2.ts
    projector: AnyFn; // 映射函数
}
```

举例：
state/selector-example0.ts
state/selector-example1.ts
state/selector-example2.ts

## Store
Store中储存了应用中所有的不可变状态(state)，它是一个状态容器(state container)。ngrx/store中的store是RxJS状态(state)的**可观察对象**，以及行为(actions)的**观察者**。

我们可以利用Store来派发行为，派发行为时，所有的已注册 reducer 和 effects 都将监听到state的变化，它们都会收到 action。当然，我们也可以用Store的select()方法获取可观察对象，然后订阅观察，在状态变化之后做出反应。

Store一般是在构造函数中注入
```ts
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.pipe(select('count')); // count 已在 app.module中注册过
  }
```

```ts
// Store源码，可以看到它继承自Observable，并且实现了 Observer(观察者)
export declare class Store<T> extends Observable<T> implements Observer<Action> {
    select<K = any>(...paths: string[]): Observable<K>; // 获取可观察对象 
    dispatch<V extends Action = Action>(action: V): void; // 派发行为
    next(action: Action): void;
    error(err: any): void;
    complete(): void;
    ... 
}
```

## Existd Question:
1. 类型别名不能被 extends，但是此处为何能够 extends

```ts
// _@ngrx_store@7.3.0@@ngrx\store\src\models.d.ts
export declare type SelectorWithProps<State, Props, Result> = (state: State, props: Props) => Result;
```

```ts
// _@ngrx_store@7.3.0@@ngrx\store\src\selector.d.ts
export interface MemoizedSelectorWithProps<State, Props, Result> extends SelectorWithProps<State, Props, Result> {
    release(): void;
    projector: AnyFn;
}
```

2. flattening operators ？

当有两个Observable的时候，inner Observable and outer Observable, 这个时候，flattening 就意味着将它们压成一个Observable。


Refer:   
https://blog.csdn.net/fen747042796/article/details/74840844
https://egghead.io/lessons/react-redux-describing-state-changes-with-actions

articles相关参考   
https://www.jianshu.com/p/c2d61fc76128