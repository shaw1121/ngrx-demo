import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Movie } from 'src/app/models/movie';
import { postMovies } from '../../state/movie/movie.actions'


@Component({
  selector: 'app-movies',
  templateUrl: 'movies-page.component.html'
})
export class MoviesPageComponent implements OnInit {
  
  val;
  errorShow = false;
  movies$: Observable<any[]> = this.store.select('movie');

  constructor(private store: Store<{ movies: Movie[]}>) { }

  ngOnInit() {
    // let data = new postMovies("发送数据组合");
    // this.store.dispatch(data);

    this.store.dispatch({ type: '[Movies Page] Load Movies' });
  }

  show() {
    this.movies$.subscribe( val => {
      console.log(val);
      this.val = val;
    })
  }

}
