import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';     // @ng core
import { ActivatedRoute, Router } from '@angular/router';                   // @ng router
import { User } from '../../models';                                        // QMd Models
import { UserService } from '../../user.service';                           // QMd User Service
import { WindowWrap } from '../../window-wrapper';                          // wrapper for window
import * as Settings from '../../../../config/Settings';                    // QMd Settings
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
/**
 * Component to display list of users for a given survey
 */
export class AdminUserListComponent implements OnInit {
  /** The maximum number of users to display per page */
  PAGINATE_TABLES = Settings.PAGINATE_TABLES;
  /** Filter string for UUID */
  user_filter: string;
  /** Var for pagination - current page */
  page: number;
  /** Parent Survey ID */
  survey_id: string;
  /** Userdata array */
  users: User[];
  /** Filter string*/
  key_string = '{progress:any}';
  /**
   * Constructor for AdminUserListComponent
   * @param route @ng ActivatedRoute
   * @param userservice User Service Middleware to communicate with express RESTful API server
   * @param router @ng Router
   * @param window Wrapper for window
   */
  constructor(
    private authservice: AuthService,
    private route: ActivatedRoute,
    private userservice: UserService,
    private router: Router,
    private window: WindowWrap
  ) {
    /* Deprecated 0.1.4a
      this.userservice.addAuthHeader('true');
    */
    this.getUserData();
  }

  /**
   * Delete (with confirmation) a particular user by UUID from the survey results (sync with database)
   * @param user_id The UUID corresponding to the user to be deleted
   */
  deleteUser(user_id: string): void {
    if (this.window.nativeWindow.confirm('Are you sure you wish to delete this user?')) {
      this.userservice.deleteUser(this.survey_id, user_id).subscribe(
      (res) => {
        this.getUserData();
      },
      (err) => {
        // Error message if not successful
        console.error(err);
        if (this.window.nativeWindow.confirm(err.message)) { }
      });
    }
  }

  /**
   * Pull user data using User MW from database
   */
  private getUserData() {
    this.route.params.subscribe(params => {
      this.survey_id = params['id'];
      this.userservice.getAllUsers(this.survey_id).subscribe((data: User[]) => {
        this.users = data;
      });
    });
  }

  togComplete() {
    if (this.user_filter !== this.key_string) {
      this.user_filter = this.key_string;
    } else {
      this.user_filter = '';
    }
  }

  logOut() {
    this.authservice.logOut();
    this.router.navigate(['/login']);
  }

  /** Function run on init */
  ngOnInit(): void {}

}
/**
 * Pipe for searching through survey data
 * from https://stackoverflow.com/questions/51649758/contact-list-with-search-filter
 */
@Pipe({name: 'filterUserNames'})
export class UserPipe implements PipeTransform {
  transform(users: User[], user_filter: string): User[] {
    const key_string = '{progress:any}';
    const key_string2 = '{progress:incomplete}';
    if (!users) { return null; }
    if (!user_filter) {
      return users.filter( n => n.progress >= 3);
    }
    if (user_filter === key_string) {
      return users;
    } else if (user_filter.indexOf(key_string) >= 0) {
      const new_filter = user_filter.replace(key_string, '');
      return users.filter(n => (n._id.indexOf(new_filter) >= 0));
    } else if (user_filter.indexOf(key_string2) >= 0) {
      const new_filter = user_filter.replace(key_string2, '');
      return users.filter(n => (n._id.indexOf(new_filter) >= 0 && n.progress < 3));
    } else {
      return users.filter(n => ( n._id.indexOf(user_filter) >= 0 && n.progress >= 3));
    }
  }
}
