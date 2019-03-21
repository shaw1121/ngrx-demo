import { Action } from '@ngrx/store';

export enum MovieActionTypes {
    Success = '[Movies API] Movies Loaded Success',
    Error = '[Movies API] Movies Loaded Error',
}

export class Error implements Action {
    readonly type = MovieActionTypes.Error;
    constructor(public payload: Object) {}
}

export class Success implements Action {
    readonly type = MovieActionTypes.Success;
    constructor(public payload: Object) {}
}


export type MovieActions = Error | Success
