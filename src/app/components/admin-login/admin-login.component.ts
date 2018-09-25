import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  message: string;

  constructor(public authservice: AuthService, public router: Router) {
    // this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authservice.logged_in ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authservice.login().subscribe(() => {
      this.setMessage();
      if (this.authservice.logged_in) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authservice.redirect_url ? this.authservice.redirect_url : '/login';

        // Redirect the user
        this.router.navigate([redirect]);
      }
    });
  }

  logout() {
    this.authservice.logout();
    this.setMessage();
  }

  ngOnInit() {
  }

}
