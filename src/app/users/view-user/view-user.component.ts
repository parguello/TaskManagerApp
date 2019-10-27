import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { Subscription, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  msgs: Message[] = [];
  subscription: Subscription
  loading: boolean;
  users: User[] = [];
  selectedUser: any;
  userProps: any;

  public cols: any;




  constructor(private router: Router,
    private userService: UserService

  ) {

  }

  ngOnInit() {


    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'surname', header: 'Last Name' },
      { field: 'email', header: 'Email' }
    ];

    this.fetchUsers();

  }

  fetchUsers() {
    /*this.users = [{
      'id': 1,
      'firstName': 'a',
      'surname': 'a',
      'email': 'a'
    }]*/

    /*this.userService.getUsers().subscribe(resp => {
      this.users.push(resp);
      console.log(resp);
      console.log(this.users);
    });*/

    this.userService.getUsers().pipe(map(data => Object.keys(data).map(k => data[k])),
      catchError(error => of(null)))
      .subscribe(data => {
        this.users = data;
        console.log(data);
        this.loading = false;
      });

  }

  onAddUser() {
    this.router.navigate(['add-user']);
  }

  onRowSelect(event) {

    this.selectedUser = event.data;

    this.router.navigate(['/edit-user', this.selectedUser.id]);
  }

}

