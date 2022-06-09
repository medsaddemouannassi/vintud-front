import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthenticationService} from './services/authentication.service';
import {catchError, filter, switchMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authenticationService: AuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.authenticationService.host}/login`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.authenticationService.host}/register`)) {
      return httpHandler.handle(httpRequest);
    }
    this.authenticationService.loadAccessToken();
    let token = this.authenticationService.getAccessToken();
    let request = this.addToken(httpRequest, token);
    if (httpRequest.url.includes(`${this.authenticationService.host}/refreshToken`)) {
      token = this.authenticationService.getRefreshToken();
      request = this.addToken(httpRequest, token);
      return httpHandler.handle(request);
    }
    // @ts-ignore
    return httpHandler.handle(request).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && !httpRequest.url.includes('/login') && error.status === 401) {
          return this.handle401Error(request, httpHandler);
        }
        return throwError(error);
      }));
  }
  private addToken = (request: HttpRequest<any>, token: string) => request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
  // tslint:disable-next-line:typedef
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authenticationService.refreshTokens().pipe(
          switchMap((token: any) => {
              this.isRefreshing = false;
              this.refreshTokenSubject.next(token.access_token);
              return next.handle(this.addToken(request, token.access_token));
          }));

    } else {
      return this.refreshTokenSubject.pipe(
          filter(token => token != null),
          take(1),
          switchMap(jwt => {
            return next.handle(this.addToken(request, jwt));
          }));
    }
  }
}
