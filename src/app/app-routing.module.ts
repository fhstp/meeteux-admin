import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent }      from './locations/locations.component';
import { UsersComponent }      from './users/users.component';
import { ActivitiesComponent }      from './activities/activities.component';

const routes: Routes = [
  { path: '', redirectTo: '/locations', pathMatch: 'full' },
  { path: 'locations', component: LocationsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'activities', component: ActivitiesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}