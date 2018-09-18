import { Injectable } from '@angular/core';
import {GodSocketService} from './god-socket.service';

@Injectable({
  providedIn: 'root'
})
export class GodService {

  constructor(private socket: GodSocketService) { 

    this.socket.on('news', msg => {
      console.log('SOCKET_ON: ' + msg);
      //this.utilitiesService.sendToNative(msg, 'print');
    });

    this.socket.on('disconnect', () => {
      //const error: Message = {code: ErrorTypes.LOST_CONNECTION_TO_GOD, message: 'Lost connection to Server'};
      //this.store.dispatch(this.statusActions.changeErrorMessage(error));
    });

    this.socket.on('reconnect', () => {
      //const success: Message = {code: SuccessTypes.SUCCESS_RECONNECTED_TO_GOD, message: 'Reconnected to Server'};
      //this.store.dispatch(this.statusActions.changeSuccessMessage(success));
    });
  }
}
