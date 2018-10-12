import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Admin } from 'src/app/models';




@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  message: string;
  submitted = false;
  loginForm: FormGroup;
  returnUrl: string;
  admin: Admin;

  constructor(public authservice: AuthService,
    public router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  )   {

    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authservice.logged_in ? 'in' : 'out');
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
  }



  logIn() {
    this.message = 'Trying to log in ...';
    //TODO
    //Add validation
    //HotFix collecting input data
    this.authservice.logIn( this.admin ).subscribe(res => {
      this.setMessage();
      if (this.authservice.logged_in) {
        // Receive redirect URL from authservice. If no redirect has been set, go to admin index
        const redirect = this.authservice.redirect_url ? this.authservice.redirect_url : '/admin';

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
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

}
