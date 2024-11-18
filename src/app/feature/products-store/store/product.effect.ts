import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../services/products.service';
import { ProductsActions } from './product.action';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class ProductsEffects {
  // Injects
  private _actions$: Actions = inject(Actions);
  private _productsService: ProductsService = inject(ProductsService);

  // Get Products List
  getProductsList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProductsActions.gET_PRODUCT_LIST),
      switchMap((action) => {
        return this._productsService.getProducts(action.payload.perPage).pipe(
          switchMap((response) =>
            of(ProductsActions.gET_PRODUCT_LIST_SUCCESS({ payload: response }))
          ),
          catchError((error) =>
            of(ProductsActions.gET_PRODUCT_LIST_FAIL({ error }))
          )
        );
      })
    )
  );

    // Get Categories List
    getCategoriesList$ = createEffect(() =>
      this._actions$.pipe(
        ofType(ProductsActions.gET_CATEGORY_LIST),
        switchMap((action) => {
          return this._productsService.getCategories().pipe(
            switchMap((response) =>
              of(ProductsActions.gET_CATEGORY_LIST_SUCCESS({ payload: response }))
            ),
            catchError((error) =>
              of(ProductsActions.gET_CATEGORY_LIST_FAIL({ error }))
            )
          );
        })
      )
    );
}
