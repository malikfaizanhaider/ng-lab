import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private dataUrl = 'assets/data/response.json';

  constructor(private http: HttpClient) {
  }

  getData(): Observable<any> {
    return this.http.get<any>(this.dataUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return Promise.reject(error.message || error);
  }
}
