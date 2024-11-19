import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CrudActions, PRODUCT_FIELD } from '../../models/const/product.cont';
import { IProduct } from '../../models/interfaces/product.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { IAppState } from '@store-app/store/app.store';
import { CategoriesSelector } from '../../store/product.selector';
import { tap } from 'rxjs/internal/operators/tap';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { ProductsActions } from '../../store/product.action';
import { CategoriesPipe } from '../../pages/products-list/pipes/categories.pipe';
@Component({
  selector: 'app-product-fields',
  standalone: true,
  templateUrl: './product-fields.component.html',
  styleUrl: './product-fields.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    MatSelectModule,
    MatIconModule,
    CategoriesPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFieldsComponent {
  // Injects
  private readonly _dialog = inject(MatDialog);
  private _productDialogRef = inject(MatDialogRef<ProductFieldsComponent>);
  private _fb: FormBuilder = inject(FormBuilder);
  private _store: Store<IAppState> = inject(Store);
  // Observables
  public CategoriesList$ = this._store.select(CategoriesSelector).pipe(
    tap((t) => {
      !t.length && this._dispatchProductCategories();
    }),
    shareReplay(1)
  );
  // Forms
  public productForm = this._fb.group({
    [PRODUCT_FIELD.title]: ['', [Validators.required]],
    [PRODUCT_FIELD.price]: ['', [Validators.required]],
    [PRODUCT_FIELD.description]: ['', [Validators.required]],
    [PRODUCT_FIELD.category]: ['', [Validators.required]],
    [PRODUCT_FIELD.image]: ['', [Validators.required]],
    [PRODUCT_FIELD.rating]: ['', [Validators.required]],
    [PRODUCT_FIELD.count]: ['', [Validators.required]],
  });

  // Signals
  public dialogAction: WritableSignal<CrudActions | null> =
    signal<CrudActions | null>(null);
  public productImagePath: WritableSignal<string | null> = signal(null);
  // Public
  public PRODUCT_FIELD = PRODUCT_FIELD;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { action: CrudActions; product: IProduct }
  ) {
    this.dialogAction.set(data.action);
  }

  public _dispatchProductCategories(): void {
    this._store.dispatch(ProductsActions.gET_CATEGORY_LIST());
  }
  
  onSave() {
    this._productDialogRef.close({
      action: this.dialogAction(),
      product: this.productForm.value,
    });
  }

  onCancel() {
    this._productDialogRef.close(null);
  }

  setFileData(event: Event): void {
    const eventTarget: HTMLInputElement | null =
      event.target as HTMLInputElement | null;
    if (eventTarget?.files?.[0]) {
      const file: File = eventTarget.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        this.productImagePath.set(reader.result! as unknown as string);
        this.productForm
          .get(PRODUCT_FIELD.image)
          ?.setValue(this.productImagePath()!);
      });
      reader.readAsDataURL(file);
    }
  }
}