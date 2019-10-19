import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor( private _http: HttpClient) { }

  getData(link: string) {
    return this._http.get(link);
  }
  postData(link: string, data: any) {
    return this._http.post(link, data);
  }
}
