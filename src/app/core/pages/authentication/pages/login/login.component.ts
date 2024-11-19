import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { LOGIN_FROM_FIELD } from './models/const/login.const';
import { IsUserAuthorizedSelector } from '../../store/authentication.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, take } from 'rxjs';
import { AuthenticationActions } from '../../store/authentication.actions';
import { IAppState } from '../../../../../store/app.store';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Roles } from './models/types/role.type';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    NgOptimizedImage
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // Inject
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _store: Store<IAppState> = inject(Store);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);

  // Public
  public LOGIN_FROM_FIELD = LOGIN_FROM_FIELD;
  // FLAGS
  public isLogin: boolean = this._logVariableInit();
  // FORM
  public loginForm = this._formBuilder.group({
    [LOGIN_FROM_FIELD.userName]: ['', [Validators.required]],
    [LOGIN_FROM_FIELD.password]: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this._listenTOLoginSuccessfully();
  }

  private _logVariableInit(): boolean {
    return true;
  }

  public signIn(): void {
    this._store.dispatch(
      AuthenticationActions.lOGIN({
        payload: {
          userName: this.loginForm.get([LOGIN_FROM_FIELD.userName])?.value,
          password: this.loginForm.get([LOGIN_FROM_FIELD.password])?.value,
        },
      })
    );
  }

  private _listenTOLoginSuccessfully(): void {
    this._store
      .select(IsUserAuthorizedSelector)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        filter((f) => !!f),
        take(1)
      )
      .subscribe({
        next: () => {
          // Navigate to home page
          this._router.navigateByUrl('/');
        },
      });
  }


}
