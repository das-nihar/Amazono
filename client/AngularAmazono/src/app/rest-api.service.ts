import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor( private _http: HttpClient) { }

  getHeaders() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', token) : null;
  }

  getData(link: string) {
    return this._http.get(link, {headers: this.getHeaders()});
  }
  postData(link: string, data: any) {
    return this._http.post(link, data, {headers: this.getHeaders()});
  }
}
