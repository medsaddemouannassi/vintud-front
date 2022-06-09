import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  accessJWT: string;
  refreshJWT: string;
  username: string;
  roles: any;

  constructor(private http: HttpClient) { }

  getAllUsers(): any {
    return this.http.get<any>('http://localhost:8080/user');
  }
}
