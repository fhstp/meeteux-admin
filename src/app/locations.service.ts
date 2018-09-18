import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Location } from './location';
import { LOCLIST } from './locationslist';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]>{
    //return of(LOCLIST)

    return this.http.get<Location[]>('../php/locations.php');
  } 

  freeSeats(): Observable<Location[]>{
    return this.http.get<Location[]>('../php/resetLocations.php');
  } 
}
