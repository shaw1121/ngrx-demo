import { JAVA_ARTICLES, ANGULAR_ARTICLES } from './../../models/article';
import { ArticleState } from './../../app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from './article.actions';

const initialState: ArticleState = { articles: [] };

export function articleReducer(state = initialState, action: fromActions.All) {
    switch(action.type) {
        case fromActions.JAVA: {
            return {
                articles: JAVA_ARTICLES
            }
        }
        case fromActions.ANGULAR: {
            return {
                articles: ANGULAR_ARTICLES
            }
        }
        case fromActions.MY_ARTICLES: {
            return {
                articles: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

// createFeatureSelector()被用于为任意指定的state创建一个feature selector。
export const getArticleState = createFeatureSelector<ArticleState>('articleState');

// createSelector()使用feature selector来创建selector。
export const getArticles = createSelector(
    getArticleState,
    (state: ArticleState) => state.articles
)