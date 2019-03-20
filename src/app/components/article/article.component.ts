import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Article, FAVORITE_ARTICLES } from 'src/app/models/article';
import { ArticleState } from 'src/app/app.state';
import * as articleReducer from 'src/app/state/article/article.reducer';
import * as fromActions from 'src/app/state/article/article.actions';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {

  articles$: Observable<Article[]>

  constructor(private store: Store<ArticleState>) {
    this.articles$ = store.select(articleReducer.getArticles);
    // this.articles$ = store.pipe(select('articleState'));
  }

  showJavaArticles(){
    // 分发action以通过reducer改变state
    this.store.dispatch(new fromActions.JavaArticlesAction());
  }
  showAngularArticles(){
      this.store.dispatch(new fromActions.AngularArticlesAction());
  }
  showFavoriteArticles(){
      this.store.dispatch(new fromActions.FavoriteArticlesAction(FAVORITE_ARTICLES));
  }

}
