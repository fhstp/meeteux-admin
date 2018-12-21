import { Injectable } from '@angular/core';
import { GodSocketService } from './god-socket.service';
import { LOCLIST, USRLIST, LOGLIST, MSGLIST } from './locationslist';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@Injectable()
export class GodService {
  private _connection: GodSocketService;

  constructor(public snackBar: MatSnackBar) { }

  public openNewExhibitConnection(): void {
    if (this._connection) { this._connection.disconnect(); }
    this._connection = new GodSocketService();

    this._connection.on('news', data => {
      this.displayMessage(data.text, false);
    });

    this._connection.on('disconnect', () => {
      this.displayMessage('Lost connection to Server', true);
    });

    this._connection.on('reconnect', () => {
      this.displayMessage('Reconnected to Server', true);
    });
  }

  public connection(): boolean {
    if (this._connection) {
      return true;
    } else {
      return false;
    }
  }

  public getAllLocations(mode: string): any {
    enum statusType { online, offline, free, occupied }
    enum locType { room, activeExhibitOn, activeExhibitAt, passiveExhibit, door, activeExhibitBehaviorAt, activeExhibitBehaviorOn }

    this._connection.emit('getLocationData', );

    this._connection.on('getLocationaDataResult', locations => {
      const loc = locations.data;
      const message = locations.message;

      if (message.code > 299) {
        this.displayMessage('(E' + message.code + ') Failed to get locations', true);
        return;
      } else {
        LOCLIST.length = 0;
        locations.data.forEach(location => {
          if (!location.currentSeat) { location.currentSeat = 0; }
          LOCLIST.push({
            id: location.id,
            description: location.description,
            currentSeat: location.currentSeat,
            maxSeat: location.maxSeat,
            isStartPoint: location.isStartPoint,
            parentId: location.parentId,
            locationtype: locType[location.locationTypeId - 1],
            status: statusType[location.statusId - 1]
          });
        });
      }

      if (mode === 'update') { this.displayMessage('Updated Locations', true); }
      this._connection.removeAllListeners('getLocationDataResult');
    });
  }

  public resetLocations(id: any): void {

    this._connection.emit('resetLocationData', id);

    this._connection.on('resetLocationDataResult', message => {
      if (message.message.code > 299) {
        this.displayMessage('(E' + message.message.code + ') Failed reseting tables', true);
        return;
      }
      this.displayMessage(message.message.message, true);
      this._connection.removeAllListeners('resetLocationDataResult');
    });
  }

  public resetAllLocations(): void {

    this._connection.emit('resetAllLocationData', );

    this._connection.on('resetAllLocationDataResult', message => {
      if (message.message.code > 299) {
        this.displayMessage('(E' + message.message.code + ') Failed reseting all tables', true);
        return;
      }
      this.displayMessage(message.message.message, true);
      this._connection.removeAllListeners('resetAllLocationDataResult');
    });
  }

  public getAllUsers(mode: string): any {
    this._connection.emit('getUserData', );

    this._connection.on('getUserDataResult', users => {
      const loc = users.data;
      const message = users.message;

      if (message.code > 299) {
        this.displayMessage('(E' + message.code + ') Failed when getting users', true);
        return;
      } else {
        USRLIST.length = 0;
        let idx = 1;
        users.data.forEach(user => {
          if (!user.curLocId) { user.curLocId = ''; }
          USRLIST.push({
            id: idx,
            name: user.name,
            isGuest: user.isGuest,
            curLocId: user.curLocId,
            curLocDesc: user.currentLocation,
            avatar: user.avatar,
            deviceAdd: user.deviceAddress,
            ipAdd: user.ipAdd,
            deviceOs: user.deviceOS,
            deviceVersion: user.deviceVersion,
            deviceModel: user.deviceModel,
          });
          idx++;
        });
      }
      if (mode === 'update') { this.displayMessage('Updated Users', true); }
      this._connection.removeAllListeners('getUserDataResult');
    });
  }

  public getAllActivities(mode: string): any {
    this._connection.emit('getActivityData', );

    this._connection.on('getActivityDataResult', activities => {
      const loc = activities.data;
      const message = activities.message;
      if (message.code > 299) {
        this.displayMessage('(E' + message.code + ') Failed when getting activities', true);
        return;
      } else {
        LOGLIST.length = 0;
        activities.data.forEach(activity => {
          LOGLIST.push({
            id: activity.id,
            liked: activity.liked,
            createdAt: activity.createdAt.split('T')[0],
            updatedAt: activity.updatedAt.split('T')[0],
            userName: activity.user.userName,
            locationId: activity.locationId.toString(),
            locationDesc: activity.location.locationDesc
          });
        });
      }
      if (mode === 'update') { this.displayMessage('Updated Activities', true); }
      this._connection.removeAllListeners('getActivityDataResult');
    });
  }

  public displayMessage(msg: String, display: boolean): void {
    MSGLIST.push('[' + new Date().toLocaleString() + ']' + msg);
    if (display) { this.snackBar.openFromComponent(SnackBarComponent, { duration: 1000, }); }
  }
}
