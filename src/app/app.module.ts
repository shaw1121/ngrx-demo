import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment'; // Angular CLI environemnt
import { counterReducer } from './state/counter.reducer';

import { AppComponent } from './app.component';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { MovieEffects } from './state/movie.effects';
import { MoviesPageComponent } from './movies-page/movies-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent,
    MoviesPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    EffectsModule.forRoot([MovieEffects]), // 注册 root effects
    StoreModule.forRoot({ 
      count: counterReducer
    }),
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
