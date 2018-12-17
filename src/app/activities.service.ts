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
    this.godService.openNewExhibitConnection();
  }

  getActivities(): Observable<Activity[]> {
    this.godService.getAllActivities();
    return of(LOGLIST);
  }
}
