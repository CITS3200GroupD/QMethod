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
/**
 * A component for the admin logon page
 */
export class AdminLoginComponent implements OnInit {

  /** Flag which checks if user has submitted a login request */
  submitted = false;
  /** Login form (Ng reactive form) */
  loginForm: FormGroup;
  /** The url to redirect to after login */
  returnUrl: string;

  /**
   * AdminLoginComponent Constructor
   * @param authservice Authentication service middleware
   * @param router ng router
   * @param formBuilder ng reactive forms
   * @param route ng activatedroute from url
   * @param window window wrapper
   */
  constructor(public authservice: AuthService,
    public router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private window: WindowWrap
  )   {
  }

  /**
   * Function called on submission of form.
   */
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
  }

  /**
   * Function which calls authentication middleware to authenticate the user with user/pwd data
   * If authenticated, a secure httponly cookie is returned and stored by the browser.
   */
  logIn() {
    const input: Admin = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    };
    this.authservice.logIn(input).subscribe((res: HttpResponse<string>) => {
      /* DEBUG
       * if (isDevMode()) {
       *   console.log('-------- admin-login.component.ts.logIn() -----------');
       *   console.log(res.headers);
       *   console.log(`RES <= ${res.body.substring(0, 30)}...`);
       *   console.log(res.headers);
       * }
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
      this.window.nativeWindow.confirm('Bad password');
      // TODO: A better bad password popup for user
    });
  }

  /**
   * Function which calls authentication service to remove the httponly secure cookie
   * containing the JWT token
   */
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
