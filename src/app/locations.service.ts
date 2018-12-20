import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Location } from './location';
import { GodService } from './god.service';
import { LOCLIST } from './locationslist';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  constructor(private http: HttpClient, private godService: GodService) { }

  public establishExhibitConnection(): void {
    this.godService.openNewExhibitConnection();
  }

  getLocations(): Observable<Location[]> {
    this.godService.getAllLocations();
    return of(LOCLIST);
  }

  freeSeats(id: any): void {
    this.godService.resetLocations(id);
  }

  freeAllSeats(): void {
    this.godService.resetAllLocations();
  }
}
