import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { CookieController } from '../../utilis/cookie-controller.class';
import {
  ILoginRequest,
  ILoginResponse,
} from '../../pages/authentication/pages/login/models/interfaces/login.interface';
import { environment } from '../../../../environments/production.environments';
import { Roles } from '@store-app/core/pages/authentication/pages/login/models/types/role.type';

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
            CookieController.setCookie('role', user.role);
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

  public getUserRole(): Roles | null {
    return CookieController.getCookie('role') as Roles;
  }

  public logOut(): Observable<void> {
    return new Observable<void>((observer) => {
      try {
        // Perform logout actions
        CookieController.removeCookie('token');
        CookieController.removeCookie('role');

        // Notify observer of success
        observer.next();
        observer.complete();
      } catch (error) {
        // Notify observer of an error
        observer.error(error);
      }
    });
  }
}
