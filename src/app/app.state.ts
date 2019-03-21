import { Article } from './models/article';
import { ActionReducerMap, ActionReducer } from '@ngrx/store';

import * as articleReducer from './state/article/article.reducer';
import { environment } from 'src/environments/environment';
import { counterReducer } from './state/counter/counter.reducer';
import { movieReducer } from './state/movie/movie.reducer';



export interface AppState {
    articleState: ArticleState;
    count: CounterState;
    movie: movieState
}

export interface ArticleState {
    articles: Article[];
}

export interface CounterState {
    // number;
}

export interface movieState {
    
}

// 注册一系列reducer
export const APPLICATION_REDUCER: ActionReducerMap<AppState> = {
    articleState: articleReducer.articleReducer,
    count: counterReducer,
    movie: movieReducer

}

// logger 方法用来打印state、action， Meta-reducers
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function(state: AppState, action: any): AppState {
      console.log('state', state);
      console.log('action', action);
      return reducer(state, action);
    };
}

// meta reducer
export const META_REDUCERS = !environment.production ? [logger] : [];  // 仅开发环境打印
