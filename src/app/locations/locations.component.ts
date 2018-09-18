import { Component, OnInit } from '@angular/core';
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
  filtered: boolean = false;
  option: string = 'all';
  timeLeft: number = 10;
  interval;

  constructor(private locationsService: LocationsService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon('refresh', sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-refresh-24px.svg'));
    iconRegistry.addSvgIcon('reset', sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-lock_open-24px.svg'));
    iconRegistry.addSvgIcon('more', sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-more_vert-24px.svg'));
  }

  ngOnInit() {
    this.getLocations();
    this.startTimer();
  }

  getLocations(): void {
    this.locationsService.getLocations().subscribe(locations =>  this.locations = locations); 
  }

  onSelect(opt: string): void {
    this.option = opt;
    if(opt == "all") this.filtered = false;
    else if(opt == "online" || opt == "offline") this.filtered = true;
  }

  updateTable(): void{
    this.timeLeft = 10;
    this.getLocations();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 10;
        this.getLocations();
      }
    },1000)
  }

  freeSeats(): void{
    this.locationsService.freeSeats().subscribe(locations =>  this.locations = locations);
  }

}
