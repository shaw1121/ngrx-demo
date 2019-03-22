import { Movie } from './../../models/movie';
import { Action } from '@ngrx/store';

export enum MovieActionTypes {
    Success = '[Movies API] Movies Loaded Success',
    Error = '[Movies API] Movies Loaded Error',
    postMovies = '[Movies Page] Load Movies'
}

export class Error implements Action {
    readonly type = MovieActionTypes.Error;
    constructor(public payload: Object) {}
}

export class Success implements Action {
    readonly type = MovieActionTypes.Success;
    constructor(public payload: Object) {}
}

export class postMovies implements Action{
    readonly type = MovieActionTypes.postMovies;
    constructor(public payload: string) {}
}


export type MovieActions = Error | Success | postMovies
