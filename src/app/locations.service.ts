import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    if (!this.godService.connection()) {
      this.godService.openNewExhibitConnection();
    }
  }

  getLocations(mode: string): Observable<Location[]> {
    this.godService.getAllLocations(mode);
    return of(LOCLIST);
  }

  freeSeats(id: any): void {
    this.godService.resetLocations(id);
  }

  freeAllSeats(): void {
    this.godService.resetAllLocations();
  }
}
