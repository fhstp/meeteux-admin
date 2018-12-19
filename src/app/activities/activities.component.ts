import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { ActivitiesService } from '../activities.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  activities: Activity[];
  filter = false;
  option = 'all';
  query = '';

  constructor(private activitiesService: ActivitiesService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-thumb_up-24px.svg'));
    iconRegistry.addSvgIcon('visibility-off', sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-visibility_off-24px.svg'));
  }

  ngOnInit() {
    this.activitiesService.establishExhibitConnection();
    this.getActivities();
  }

  getActivities(): void {
    this.activitiesService.getActivities().subscribe(activities =>  this.activities = activities);
  }

  filterSelect(opt: string): void {
    this.option = opt;
    if (opt === 'all') {
      this.filter = false;
    } else if (opt === 'uId' || opt === 'uName' || opt === 'lId' || opt === 'lName') {
      this.filter = true;
    }
  }

  getQuery(value: string) {
    this.query = value;
  }

  updateTable(): void {
    this.getActivities();
  }

}
