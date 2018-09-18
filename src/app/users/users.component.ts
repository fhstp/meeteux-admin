import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  locFilter: boolean = false;
  option: string = 'all';
 
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe(users =>  this.users = users); 
  }

  locSelect(opt: string): void {
    this.option = opt;
    if(opt == "all") this.locFilter = false;
    else if(opt == "at" || opt == "out") this.locFilter = true;
  }

  updateTable(): void{
    this.getUsers();
  }

}
