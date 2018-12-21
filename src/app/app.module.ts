import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LocationsComponent } from './locations/locations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatChipsModule} from '@angular/material/chips';
import { ActivitiesComponent } from './activities/activities.component';
import { UsersComponent } from './users/users.component';
import { MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './/app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { GodSocketService } from './god-socket.service';
import { GodService } from './god.service';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    ActivitiesComponent,
    UsersComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatChipsModule,
    MatIconModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    GodSocketService,
    GodService
  ],
  entryComponents: [ SnackBarComponent ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
