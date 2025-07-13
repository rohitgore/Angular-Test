import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCalls {
  viewDetails: any;
   private apiUrl = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json';
   private http = inject(HttpClient);
    constructor() {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
