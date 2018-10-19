import { Component, OnInit, isDevMode } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Admin } from 'src/app/models';
import { HttpResponse } from '@angular/common/http';
import { WindowWrap } from 'src/app/window-wrapper';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;
  returnUrl: string;

  constructor(public authservice: AuthService,
    public router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private window: WindowWrap
  )   {
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
  }

  logIn() {
    // TODO
    // Add validation
    // HotFix collecting input data
    // this.authservice.logIn( this.admin ).subscribe(res => {
    const input: Admin = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    };
    this.authservice.logIn(input).subscribe((res: HttpResponse<string>) => {
      /*
      if (isDevMode()) {
        console.log('-------- admin-login.component.ts.logIn() -----------');
        console.log(res.headers);
        console.log(`RES <= ${res.body.substring(0, 30)}...`);
        // console.log(res.headers);
      }
      */
      if (this.authservice.logged_in) {
        // Receive redirect URL from authservice. If no redirect has been set, go to admin index
        const redirect = this.authservice.redirect_url ? this.authservice.redirect_url : '/admin';
        // Redirect the user
        this.router.navigate([redirect]);
      }
    },
    (err) => {
      console.error(err);
      console.error('Bad Password');
      this.window.nativeWindow('Bad password');
      // TODO: A better bad password popup for user
    });
  }

  logOut() {
    this.authservice.logOut();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
