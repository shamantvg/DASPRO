import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  constructor(private http: HttpClient) { }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/myjsondata.json");
  }

  public getSearchDescAPI(): Observable<any> {
    return this.http.get("./assets/searchDesc.json");
  }
}
