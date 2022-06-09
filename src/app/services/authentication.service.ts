import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host = environment.apiUrl;
  private accessToken: string;
  private refreshToken: string;
  private loggedInUsername: string;
  private roles: any;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  public login(user): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.host}/login`, user, { observe: 'response' }).pipe(tap(res => {
      this.saveTokens(res.body.access_token, res.body.refresh_token);
    }));
  }

  public register(user): Observable<any> {
    return this.http.post<any>(`${this.host}/register`, user);
  }

  public logOut(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  // public addUserToLocalCache(user): void {
  //   localStorage.setItem('user', JSON.stringify(user));
  // }
  //
  // public getUserFromLocalCache(): any {
  //   return JSON.parse(localStorage.getItem('user'));
  // }

  public loadAccessToken(): void {
    this.accessToken = localStorage.getItem('access_token');
  }

  public loadRefreshToken(): void {
    this.refreshToken = localStorage.getItem('refresh_token');
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  getUser(): any {
    return this.loggedInUsername;
  }

  getRoles(): any {
    return this.roles;
  }

  public refreshTokens(): any {
    this.loadRefreshToken();
    const headers = new HttpHeaders({Authorization: `Bearer ${this.getRefreshToken()}`});
    return this.http.get<any>(`${environment.apiUrl}/refreshToken`, {headers}).pipe(tap((tokens) => {
      this.saveTokens(tokens.access_token, tokens.refresh_token);
    }));
  }

  public isUserLoggedIn(): boolean {
    this.loadAccessToken();
    if (this.accessToken != null && this.accessToken !== ''){
      if (this.jwtHelper.decodeToken(this.accessToken).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.accessToken)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.accessToken).sub;
          this.roles = this.jwtHelper.decodeToken(this.accessToken).roles;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
  }

}
