import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IAddProduct,
  ICategoryResponse,
  IDeleteProduct,
  IProduct,
  IProductListResponse,
} from '../models/interfaces/product.interface';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/production.environments';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Inject
  private _httpClient: HttpClient = inject(HttpClient);

  public getProducts(): Observable<IProductListResponse> {
    return this._httpClient.get<IProductListResponse>(
      environment.fakeStoreApi + `/products`
    );
  }

  public getProductDetails(productId: string): Observable<IProduct> {
    return this._httpClient.get<IProduct>(
      environment.fakeStoreApi + `/products/${productId}`
    );
  }

  public getCategories(): Observable<ICategoryResponse> {
    return this._httpClient.get<ICategoryResponse>(
      environment.fakeStoreApi + '/products/category'
    );
  }

  public getProductsByCategory(category: string): Observable<Array<IProduct>> {
    return this._httpClient.get<Array<IProduct>>(
      environment.fakeStoreApi + `/products/category/${category}`
    );
  }

  public addProduct(product: IAddProduct): Observable<IAddProduct> {
    return this._httpClient.post<IAddProduct>(
      environment.fakeStoreApi + `/products`,
      product
    );
  }

  public deleteProduct(payload: IDeleteProduct): Observable<IDeleteProduct> {
    if (payload.id) {
      return this._httpClient
        .delete<Object>(environment.fakeStoreApi + `/products/${payload.id}`)
        .pipe(map(() => payload));
    } else {
      return of(payload);
    }
  }

  public updateProduct(product: IProduct): Observable<IProduct> {
    return this._httpClient
      .put<IAddProduct>(
        environment.fakeStoreApi + `/products/${product.id}`,
        product
      )
      .pipe(map(() => product));
  }
}
