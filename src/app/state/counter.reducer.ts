import { Action } from '@ngrx/store';
import { ActionTypes } from './counter.actions';

export const initialState = 0;

// Define a reducer function to handle changes in the counter value based on the provided actions.
// Reducers规定了行为对应的具体状态变化。它是纯函数，通过接收前一个状态和派发行为返回新对象作为下一个
// 状态的方式来改变状态，新对象通常用Object.assign和扩展语法来实现。
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
