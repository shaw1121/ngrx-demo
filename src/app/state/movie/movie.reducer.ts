import { MovieActions } from './movie.actions';

export const initialState = 0;

// Define a reducer function to handle changes in the counter value based on the provided actions.
// Reducers规定了行为对应的具体状态变化。它是纯函数，通过接收前一个状态和派发行为返回新对象作为下一个
// 状态的方式来改变状态，新对象通常用Object.assign和扩展语法来实现。


export function movieReducer(state = {"old":1}, action: MovieActions) {
    switch (action.type) {
        case '[Movies Page] Load Movies':
            return Object.assign(state, {"post": 32})
        case '[Movies API] Movies Loaded Success': 
            return Object.assign(state, action.payload);
        case '[Movies API] Movies Loaded Error': 
            return Object.assign(state, {"error": 3})
        default:
            return state;
    }
}