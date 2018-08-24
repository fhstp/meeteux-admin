import { Component, OnInit } from '@angular/core';
import { Location } from '../location';
import { LocationsService } from '../locations.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  
  locations: Location[];
  filtered: boolean = false;
  option: string = 'all';
 
  constructor(private locationsService: LocationsService) { }

  ngOnInit() {
    this.getLocations();
  }

  getLocations(): void {
    this.locationsService.getLocations().subscribe(locations =>  this.locations = locations); 
  }

  onSelect(opt: string): void {
    this.option = opt;
    if(opt == "all") this.filtered = false;
    else if(opt == "online" || opt == "offline") this.filtered = true;
  }

}
