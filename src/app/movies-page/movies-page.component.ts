import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Movie } from '../movie';


@Component({
  selector: 'app-movies',
  template: `
    <p>Effects</p>
    <div *ngFor="let movie of movies$ | async">
      {{ movie.name }}
    </div>
  `
})
export class MoviesPageComponent implements OnInit {

  movies$: Observable<any[]> = this.store.select(state => state.movies);

  constructor(private store: Store<{ movies: Movie[]}>) { }

  ngOnInit() {
    this.store.dispatch({ type: '[Movies Page] Load Movies' });
  }

}
