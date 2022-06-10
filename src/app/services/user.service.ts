import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): any {
    return this.http.get<any>('http://localhost:8080/user');
  }

  getUserById(id): Observable<any> {
    return this.http.get<any>(`${this.host}/user/${id}`);
  }
}
