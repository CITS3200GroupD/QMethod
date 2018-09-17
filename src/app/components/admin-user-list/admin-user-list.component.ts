import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Survey, User } from '../../Survey';
import { MockUserService } from '../../mockuser.service';
import { WindowWrap } from '../../window-wrapper';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  user_filter: string;
  page: number;
  surveys: User[];

  constructor(
    private userservice: MockUserService, // TODO: Replace with real user service
    private router: Router,
    private window: WindowWrap
  ) {}

  deleteUser(id: string) {
    // TODO: Implement deleteUser
  }

  ngOnInit() {
    this.userservice.getAllUsers('').subscribe((data: User[]) => {
      this.surveys = data;
    });
  }

}
/**
 * Pipe for searching through survey data
 * from https://stackoverflow.com/questions/51649758/contact-list-with-search-filter
 */
@Pipe({name: 'filterUserNames'})
export class UserPipe implements PipeTransform {
  transform(users: User[], user_filter: string): User[] {
    if (!users) { return null; }
    if (!user_filter) { return users; }
    return users.filter(n => n._id.indexOf(user_filter) >= 0 );
  }
}
