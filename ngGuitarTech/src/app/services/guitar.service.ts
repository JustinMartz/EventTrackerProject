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

  findByTuning(id: number): Observable<Guitar[]> {
    return this.http.get<Guitar[]>(this.url + '/tuning/' + id).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error(
              'GuitarService.findByTuning(): error retrieving Guitar list: ' + err
          )
        );
      })
    );
  }

  findByBridge(bridge: string): Observable<Guitar[]> {
    return this.http.get<Guitar[]>(this.url + '/bridge/' + bridge).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error(
              'GuitarService.findByBridge(): error retrieving Guitar list: ' + err
          )
        );
      })
    );
  }

  searchByColor(color: string): Observable<Guitar[]> {
    return this.http.get<Guitar[]>(this.url + '/color/' + color).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error(
              'GuitarService.searchByColor(): error retrieving Guitar list: ' + err
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
           () => new Error( 'GuitarService.delete(): error utterly destroying Guitar: ' + err )
        );
      })
    );
  }

  update(guitarToUpdate: Guitar): Observable<Guitar> {
    console.log('*** updated guitar');
    return this.http.put<Guitar>(this.url + '/' + guitarToUpdate.id, guitarToUpdate).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'GuitarService.update(): error updating Guitar: ' + err )
        );
      })
    );
  }
}
