// import { MoviesService } from '../../service/movies.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MoviesService } from 'src/app/service/movies.service';
import { postMovies } from '../movie/movie.actions'

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
      // 会把参数通过 [Movies Page] Load Movies 对应的payload 传到mergeMap中的回调函数
      mergeMap((action:postMovies) => this.moviesService.getAll(action.payload).pipe(
          // The MoviesService#getAll() method returns an observable that maps the movies to a new action on success, 
          // The action is dispatched to the Store where it can be handled by reducers when a state change is needed
          map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
          // return an observable of a new action that is dispatched to the Store in case an error occurs whil fetching movies
          //  The inner observable handles any errors or completions and returns a new observable so that the outer stream does not die. 
          // You still use the catchError operator to handle error events, but return an observable of a new action that is dispatched to 
          // the Store.
          catchError(() => of({type: '[Movies API] Movies Loaded Error'}))
        )
      )
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
  ) {}
}