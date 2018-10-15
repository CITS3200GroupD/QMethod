import { isDevMode, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Admin } from 'src/app/models';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ObjectOrientedRenderer3 } from '@angular/core/src/render3/interfaces/renderer';

@Injectable()
export class AuthService {

  logged_in = false;
  valid = false;
  // store the URL so we can redirect after logging in
  redirect_url: string;
  private uri: string;


  constructor( private http: HttpClient) {
    if (isDevMode()) { console.log('auth.service init'); }
    if (isDevMode()) {
      this.uri = 'http://localhost:8080/auth';
    } else {
      this.uri = '/auth';
    }
    try {
      this.checkAuth();
    } catch (err) {
      console.error(err);
    }
  }

  /** Check Session ID (in cookie) vs Auth Server */
  checkAuth() {
    // Call Auth API to ensure this is a valid session
    return this.http.get(`${this.uri}/token`,
    {
      withCredentials: true
    }).pipe(
      tap((res: HttpResponse<Object>) => {
        this.logged_in = true;
      },
      (err) => {
        this.logOut();
      })
    );
  }

  /** Send login data to authentication route */
  logIn(admin: Admin): Observable<Object> {
    return this.http.post(this.uri, admin,
      {
        observe: 'response',
        withCredentials: true
      }).pipe(
      tap((res: HttpResponse<string>) => {
        this.logged_in = true;
        // Cookie will be imported by browser automatically
      },
      (err) => {})
    );
  }

  /** Function called on log out, call delete route to override cookie and sets login flag to falsdse */
  logOut() {
    this.logged_in = false;
    // Since cookie is http only, we must get the express server to "Reset" the cookie.
    this.http.get(`${this.uri}/remove_token`, { withCredentials: true }).subscribe( (res) => {});
  }
}
