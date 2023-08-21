import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Setup } from '../models/setup';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  private url = environment.baseUrl + 'api/setups';

  constructor(private http: HttpClient) { }

  index(): Observable<Setup[]> {
    return this.http.get<Setup[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error(
              'SetupService.index(): error retrieving Setup list: ' + err
          )
        );
      })
    );
  }

  getCurrentByGuitarId(id: number): Observable<Setup> {
    return this.http.get<Setup>(this.url + '/current/' + id).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error(
              'SetupService.getCurrentByGuitarId(): error retrieving Setup: ' + err
          )
        );
      })
    );
  }
}
