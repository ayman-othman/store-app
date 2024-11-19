import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAddProduct, IProduct } from '../models/interfaces/product.interface';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/production.environments';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Inject
  private _httpClient: HttpClient = inject(HttpClient);

  public getProducts(): Observable<Array<IProduct>> {
    return this._httpClient.get<Array<IProduct>>(
      environment.fakeStoreApi + `/products/`
    );
  }

  public getProductDetails(productId: string): Observable<IProduct> {
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

  public addProduct(product: IAddProduct): Observable<IAddProduct> {
    return this._httpClient.post<IAddProduct>(
      environment.fakeStoreApi + `/products`,
      product
    );
  }
}
