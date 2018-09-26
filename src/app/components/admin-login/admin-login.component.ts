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
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authservice.logged_in ? 'in' : 'out');
  }

  logIn() {
    this.message = 'Trying to log in ...';

    this.authservice.logIn().subscribe(res => {
      this.setMessage();
      if (this.authservice.logged_in) {
        // Receive redirect URL from authservice. If no redirect has been set, go to admin index
        let redirect = this.authservice.redirect_url ? this.authservice.redirect_url : '/admin';

        // Redirect the user
        this.router.navigate([redirect]);
      }
    });
  }

  logOut() {
    this.authservice.logOut();
    this.setMessage();
  }

  ngOnInit() {
  }

}
