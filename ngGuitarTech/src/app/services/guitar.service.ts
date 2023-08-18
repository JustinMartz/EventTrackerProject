import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guitar } from '../models/guitar';

@Injectable({
  providedIn: 'root'
})
export class GuitarService {
  private url = environment.baseUrl + 'api/guitars';

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Guitar[]> {
    return this.http.get<Guitar[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error(
              'GuitarService.index(): error retrieving Guitar list: ' + err
          )
        );
      })
    );
  }
}
