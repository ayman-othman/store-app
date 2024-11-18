import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../models/interfaces/product.interface';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/production.environments';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Inject
  private _httpClient: HttpClient = inject(HttpClient);

  public getProducts(limit?: number): Observable<Array<IProduct>> {
    return this._httpClient.get<Array<IProduct>>(
      environment.fakeStoreApi + `/products/`
    );
  }

  public getProductDetails(productId: number): Observable<IProduct> {
    return this._httpClient.get<IProduct>(
      environment.fakeStoreApi + `/products/${productId}`
    );
  }

  public getCategories(): Observable<Array<string>> {
    return this._httpClient.get<Array<string>>(
      environment.fakeStoreApi + '/products/categories'
    );
  }

  public getProductsByCategory(category: string): Observable<Array<IProduct>> {
    return this._httpClient.get<Array<IProduct>>(
      environment.fakeStoreApi + `/products/category/${category}`
    );
  }
}
