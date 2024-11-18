import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsListSelector } from '../../store/product.selector';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  take,
  tap,
} from 'rxjs';
import { ProductsActions } from '../../store';
import { IPagination } from '../../models/interfaces/pagination.interface';
import { IAppState } from '../../../../store/app.store';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { LocalPaginationPipe } from '../../../../shared/pipes/pagination/local-pagination/local-pagination.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  PRODUCTS_QUERY_PARAM,
  ProductsQueryParam,
} from './models/product-query-param.const';

@Component({
  selector: 'products-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    PaginationComponent,
    LocalPaginationPipe,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  private _store: Store<IAppState> = inject(Store);
  private _router: Router = inject(Router);
  private _destroyRef: DestroyRef = inject(DestroyRef);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  // Observables
  public productList$ = this._store.select(ProductsListSelector).pipe(
    tap((t) => {
      !t.length && this._dispatchProductList();
    }),
    shareReplay(1)
  );
  public paginationConfiguration: IPagination = {
    perPage: 10,
    pageNumber: 1,
  };

  ngOnInit(): void {
    this._listenForPaginationQueryParamChanges();
  }

  ngAfterViewInit(): void {
    // this._dispatchProductCategories();
  }

  public _dispatchProductList(): void {

    this._store.dispatch(
      ProductsActions.gET_PRODUCT_LIST({
        payload: {
          perPage: this.paginationConfiguration.perPage,
          pageNumber: this.paginationConfiguration.pageNumber,
        },
      })
    );
  }


  public onPaginationChange(pageNumber: number): void {
    this._setQueryParam({ pageNumber: pageNumber });
  }

  private _setQueryParam(query: {}): void {
    this._router.navigate([], {
      queryParams: query,
      queryParamsHandling: 'merge',
    });
  }

  private _listenForPaginationQueryParamChanges(): void {
    this._activatedRoute.queryParamMap
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        map((m) => m.get(PRODUCTS_QUERY_PARAM.pageNumber)),
        distinctUntilChanged(),
        filter((f) => !!f),
        map((m) => +m!),
        tap((t) => {
          if (!t || t === 1) {
            this._deleteQuery(PRODUCTS_QUERY_PARAM.pageNumber);
          }
        })
      )
      .subscribe({
        next: (res) => {
          this.paginationConfiguration = {
            ...this.paginationConfiguration,
            pageNumber: res,
          };
        },
      });
  }

  private _deleteQuery(queryName: ProductsQueryParam): void {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        [queryName]: null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
