import { Product } from '../models/product';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { PRODUCTS } from '../mock-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(PRODUCTS);
  }
}
