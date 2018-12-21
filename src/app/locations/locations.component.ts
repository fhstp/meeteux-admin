import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '../location';
import { LocationsService } from '../locations.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  locations: Location[];
  filtered = false;
  option = 'all';
  timeLeft = 10;
  interval;

  constructor(private locationsService: LocationsService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('refresh', sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-refresh-24px.svg'));
    iconRegistry.addSvgIcon('reset', sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-lock_open-24px.svg'));
    iconRegistry.addSvgIcon('more', sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-more_vert-24px.svg'));
  }

  ngOnInit() {
    this.locationsService.establishExhibitConnection();
    this.getLocations('new');
    this.startTimer();
  }

  getLocations(mode: string): void {
    this.locationsService.getLocations(mode).subscribe(locations =>  this.locations = locations);
  }

  onSelect(opt: string): void {
    this.option = opt;
    if (opt === 'all') {
      this.filtered = false;
    } else if (opt === 'online' || opt === 'offline' || opt === 'free' || opt === 'occupied') {
      this.filtered = true;
    }
  }

  updateTable(): void {
    this.timeLeft = 10;
    this.getLocations('update');
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 10;
        // this.getLocations();
      }
    }, 1000);
  }

  freeSeats(id: any): void {
    this.locationsService.freeSeats(id);
    this.getLocations('new');
  }

  freeAllSeats(): void {
    this.locationsService.freeAllSeats();
    this.getLocations('new');
  }
}
