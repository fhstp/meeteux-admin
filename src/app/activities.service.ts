import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Activity } from './activity';
import { GodService } from './god.service';
import { LOGLIST } from './locationslist';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private http: HttpClient, private godService: GodService) { }

  public establishExhibitConnection(): void {
    if (!this.godService.connection()) {
      this.godService.openNewExhibitConnection();
    }
  }

  getActivities(mode: string): Observable<Activity[]> {
    this.godService.getAllActivities(mode);
    return of(LOGLIST);
  }
}
