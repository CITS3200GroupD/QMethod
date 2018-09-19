import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Survey';
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
  survey_id: string;
  users: User[];
  constructor(
    private route: ActivatedRoute,
    private userservice: MockUserService, // TODO: Replace with real user service
    private router: Router,
    private window: WindowWrap
  ) {}

  deleteUser(user_id: string): void {
    if (this.window.nativeWindow.confirm('Are you sure you wish to delete this user?')) {
      this.userservice.deleteUser(this.survey_id, user_id).subscribe(res => {
          this.ngOnInit();
          // console.log(res);
      });
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.survey_id = params['id'];
      this.userservice.getAllUsers(this.survey_id).subscribe((data: User[]) => {
        this.users = data;
      });
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
