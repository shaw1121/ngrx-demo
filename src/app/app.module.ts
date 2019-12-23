import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment'; // Angular CLI environemnt

import { AppComponent } from './app.component';

import { META_REDUCERS, APPLICATION_REDUCER } from './app.state';
import { MyCounterComponent } from './components/my-counter/my-counter.component';
import { MoviesPageComponent } from './components/movies-page/movies-page.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductListComponent } from './components/shopping-cart/product-list/product-list.component';
import { CartComponent } from './components/shopping-cart/cart/cart.component';
import { ProductItemComponent } from './components/shopping-cart/product-list/product-item/product-item.component';
import { ArticleComponent } from './components/article/article.component';
import { MovieEffects } from './state/movie/movie.effects';

@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent,
    MoviesPageComponent,
    ShoppingCartComponent,
    ProductListComponent,
    CartComponent,
    ProductItemComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    EffectsModule.forRoot([MovieEffects]), // 注册 root effects
    // The StoreModule.forRoot() method registers the global providers needed to access the Store throughout your application
    StoreModule.forRoot(APPLICATION_REDUCER, {metaReducers: META_REDUCERS}),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
