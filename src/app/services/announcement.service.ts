import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  public host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllAnnouncements(): Observable<any> {
    return this.http.get<any>(`${this.host}/announcement`);
  }
}
