import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import {
  ILoginRequest,
  ILoginResponse,
} from '@e-commerce-store/core/pages/authentication/pages/login/models/interfaces/login.interface';
import { CookieController } from '@e-commerce-store/core/utilis/cookie-controller.class';

import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/production.environments';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Inject
  private _httpClient: HttpClient = inject(HttpClient);
  private _Router: Router = inject(Router);
  // Observables
  private _isUserAuthorized: WritableSignal<boolean> = signal<boolean>(false);

  public get isUserAuthorized(): WritableSignal<boolean> {
    if (CookieController.getCookie('token')) {
      this.setAuthorizationState = true;
      return this._isUserAuthorized;
    }
    this.setAuthorizationState = false;
    return this._isUserAuthorized;
  }

  public set setAuthorizationState(state: boolean) {
    this._isUserAuthorized.set(state);
  }

  public userSignIn(
    payload: ILoginRequest
  ): Observable<Omit<ILoginResponse, 'password'>> {
    return this._httpClient
      .get<{ [key: string]: ILoginResponse }>(
        environment.staticJson + '/static-login.json'
      )
      .pipe(
        map((users) => {
          const user = users[payload.userName];
          if (user && user.password === payload.password) {
            this._setTokenInCookie(user.token);
            return { token: user.token, role: user.role };
          } else {
            throw new Error('Invalid username or password');
          }
        }),
        catchError((err) => {
          return throwError(
            () => new Error(err.message || 'Authentication failed')
          );
        })
      );
  }

  private _setTokenInCookie(token: string): void {
    CookieController.setCookie('token', token);
  }

  public logOut(): void {
    CookieController.removeCookie('token');
    this._Router.navigateByUrl('/login');
  }
}
