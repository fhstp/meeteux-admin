import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { LocationsService } from '../locations.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  locFilter = false;
  option = 'all';

  constructor(private usersService: UsersService,
    private locationsService: LocationsService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('refresh', sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-refresh-24px.svg'));
    iconRegistry.addSvgIcon('reset', sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-lock_open-24px.svg'));
    iconRegistry.addSvgIcon('more', sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-more_vert-24px.svg'));
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.establishExhibitConnection();
    this.usersService.getUsers().subscribe(users =>  this.users = users);
  }

  locSelect(opt: string): void {
    this.option = opt;
    if (opt === 'all') {
      this.locFilter = false;
    } else if (opt === 'at' || opt === 'out') {
      this.locFilter = true;
    }
  }

  updateTable(): void {
    this.getUsers();
  }

}
