import { Article } from './models/article';
import { ActionReducerMap, ActionReducer } from '@ngrx/store';

import * as articleReducer from './state/article/article.reducer';
import { environment } from 'src/environments/environment';
import { counterReducer } from './state/counter.reducer';


export interface AppState {
    articleState: ArticleState;
    count: CounterState;
}

export interface ArticleState {
    articles: Article[];
}

export interface CounterState {
    // number;
}

// 注册一系列reducer
export const APPLICATION_REDUCER: ActionReducerMap<AppState> = {
    articleState: articleReducer.articleReducer,
    count: counterReducer

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
