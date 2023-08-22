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

  delete(id: number) {
    return this.http.delete(this.url + '/' + id).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'SetupService.delete(): error utterly destroying Setup: ' + err )
        );
      })
    );
  }

  update(updatedSetup: Setup): Observable<Setup> {
    return this.http.put<Setup>(this.url + '/' + updatedSetup.id, updatedSetup).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'SetupService.update(): error updating Setup: ' + err )
        );
      })
    );
  }
}
