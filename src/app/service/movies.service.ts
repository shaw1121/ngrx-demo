import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor (private http: HttpClient) {}

  getAll() {
    return this.http.get('https://www.easy-mock.com/mock/5c93528a933c7c3297e514d4/example/mock');
  }
}