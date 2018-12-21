import { Component, OnInit } from '@angular/core';
import { MSGLIST } from '../locationslist';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {
  localmessage = MSGLIST[MSGLIST.length - 1];

  constructor() {
    if (this.localmessage.indexOf(']') !== -1) {
      this.localmessage = MSGLIST[MSGLIST.length - 1].split(']')[1];
    }

    // console.log(MSGLIST);
  }

  ngOnInit() {
  }

}
