import { MoviesService } from './movies.service';
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
          map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
          catchError(() => of({type: '[Movies API] Movies Loaded Error'}))
        )
      )
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}