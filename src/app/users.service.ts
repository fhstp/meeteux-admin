import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { GodService } from './god.service';
import { USRLIST } from './locationslist';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient, private godService: GodService) { }

  public establishExhibitConnection(): void {
    this.godService.openNewExhibitConnection();
  }

  getUsers(): Observable<User[]> {
    this.godService.getAllUsers();
    return of(USRLIST);
  }
}
