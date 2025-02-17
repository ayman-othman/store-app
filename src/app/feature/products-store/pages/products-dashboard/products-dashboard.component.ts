import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductsListSelector } from '../../store/product.selector';
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/internal/operators/tap';
import { Store } from '@ngrx/store';
import { IAppState } from '@store-app/store/app.store';
import {
  IDeleteProduct,
  IProduct,
} from '../../models/interfaces/product.interface';
import { ProductsActions } from '../../store/product.action';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductFieldsComponent } from '../../components/product-fields/product-fields.component';
import { MatIconModule } from '@angular/material/icon';
import { CRUD_ACTIONS, CrudActions } from '../../models/const/product.cont';
import { MatButtonModule } from '@angular/material/button';
import { SvgIconComponent } from '@store-app/shared/components/svg-icon/svg-icon.component';
import { ICONS } from '@store-app/core/models/icons/icon.const';

@Component({
  selector: 'app-products-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    SvgIconComponent,
    NgOptimizedImage
  ],
  templateUrl: './products-dashboard.component.html',
  styleUrl: './products-dashboard.component.scss',
})
export class ProductsDashboardComponent implements OnInit {
  // Inject
  private readonly _translateService = inject(TranslateService);
  private readonly _store: Store<IAppState> = inject(Store);
  private readonly _matDialog = inject(MatDialog);

  //ViewChild
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // Signals
  public productList: WritableSignal<Array<IProduct> | null> = signal(null);
  public productListShimmer: WritableSignal<boolean> = signal(false);
  // public
  dataSource: MatTableDataSource<IProduct> = new MatTableDataSource();
  public displayedColumns: string[] = [
    'image',
    'title',
    'price',
    'category',
    'rating',
    'action',
  ];
  public ICONS = ICONS;
  constructor() {}

  ngOnInit(): void {
    this._selectProductList();
  }

  ngAfterViewInit() {
    this._dispatchProductList();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public _dispatchProductList(): void {
    this.productListShimmer.set(true);
    this._store.dispatch(ProductsActions.gET_PRODUCT_LIST());
  }

  private _selectProductList(): void {
    this._store
      .select(ProductsListSelector)
      .pipe(
        filter((f) => !!f?.length),
        tap(() => {
          this.productList.set(null);
          this.productListShimmer.set(false);
        })
      )
      .subscribe({
        next: (list) => {
          this.dataSource = new MatTableDataSource(list as IProduct[]);
          this.dataSource.paginator = this.paginator;

        },
        complete: () => {},
      });
  }

  private _openDialog(
    action: CrudActions,
    product?: IProduct
  ): MatDialogRef<ProductFieldsComponent, any> {
    const dialogRef = this._matDialog.open(ProductFieldsComponent, {
      data: {
        action,
        product
      },
    });

    return dialogRef;
  }

  public createProduct() {
    this._openDialog(CRUD_ACTIONS.create)
      .afterClosed()
      .subscribe({
        next: (result) => {
          result.product && this._dispatchAddProduct(result.product);
        },
      });
  }

  private _dispatchAddProduct(product: IProduct) {
    this._store.dispatch(
      ProductsActions.aDD_PRODUCT({
        payload: product,
      })
    );
  }
  public deleteProduct(payload: IDeleteProduct) {
    this._dispatchDeleteProduct(payload);
  }

  private _dispatchDeleteProduct(payload: IDeleteProduct) {
    this._store.dispatch(
      ProductsActions.dELETE_PRODUCT({
        payload: payload,
      })
    );
  }

  public editProduct(product: IProduct) {
    this._openDialog(CRUD_ACTIONS.update,product)
      .afterClosed()
      .subscribe({
        next: (result) => {
          result.product && this._dispatchEditProduct(result.product);
        },
      });
  }

  private _dispatchEditProduct(payload: IProduct) {
    this._store.dispatch(
      ProductsActions.uPDATE_PRODUCT({
        payload: payload,
      })
    );
  }
}
