import { isDevMode, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Admin } from 'src/app/models';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  logged_in = false;
  valid = false;
  // store the URL so we can redirect after logging in
  redirect_url: string;
  private uri: string;
  headers: HttpHeaders;

  constructor(private cookieservice: CookieService,
    private http: HttpClient) {
    if (isDevMode()) { console.log('AuthService Init'); }
    this.checkAuth();  // Load authkey from cookie (if it exists)
    if (isDevMode()) {
      this.uri = 'http://localhost:8080/admin';

    } else {
      this.uri = '/api';
    }
  }

  /** Check Session ID (in cookie) vs Auth Server */
  checkAuth() {
    // TODO: CALL Auth API to ensure this is a valid session
    if (this.cookieservice.get('SESSION_ID')) {
      this.logged_in = true;
    }
    // TODO: This code is in the wrong place, this function is purely for checking if
    // an existing session key exists. This should go in logIn().
    /*
    const token_authenticate = this.cookieservice.get('SESSION_ID')
    return this
           .http
           .post(this.uri, token_authenticate, { headers: this.headers });
    */
  }

  /**
   * Send user/password fields to the server, returns token
   */
  sendLoginInfo() {
    return this
            .http
            .post(this.uri, )
  }

  // TODO
  // Fix token_authenticate
  // logIn(admin: Admin): Observable<boolean> {
  logIn(): Observable<boolean> {
    // TODO: Replace with proper login function
    return of(true).pipe(
      delay(250),
      tap(() => {
        this.logged_in = true;
        this.cookieservice.put('SESSION_ID', 'valid-token');    // Placeholder function that puts a placeholder cookie
      })
    );
  }

  /** Function called on log out, removes cookie and sets login flag to false */
  logOut(): void {
    this.logged_in = false;
    this.cookieservice.remove('SESSION_ID');
  }
}
