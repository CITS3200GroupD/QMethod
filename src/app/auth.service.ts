import { isDevMode, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Admin } from 'src/app/models';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ObjectOrientedRenderer3 } from '@angular/core/src/render3/interfaces/renderer';

@Injectable()
export class AuthService {

  /** Current authentication status of the application */
  logged_in = false;
  /** Variable to store the last URL so we can redirect to it after logging in */
  redirect_url: string;
  /** URL of the authentication api route on the express server */
  private uri: string;

  constructor( private http: HttpClient) {
    // DEBUG
    // if (isDevMode()) { console.log('auth.service init'); }
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

  /*
  * Authentication RESTful API Middleware
  * ============================================================================
  * See https://qmethod.gitbook.io/project/documentation/auth-api
  * ============================================================================
  * Note: API token (JWT) is passed along as a secure cookie for authentication (if exists)
  * this denotes administrator access for routes which handle sensitive data.
  */

  /**
   * Calls express server to validate SESSION_ID JWT token (in cookie)
   * Calls logout function if invalid
   * @returns Observable with success or invalid response
   */
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

  /**
   * Calls express server, sending login data for authentication.
   * Sets login flag to true if succesful.
   * @param admin Admin object (username/password) to be authenticated
   * @returns Observable with either success or invalid response
   * */
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

  /** Function called on log out, calls express server to override cookie
   * Sets login flag to false
   */
  logOut(): void {
    this.logged_in = false;
    // Since cookie is http only, we must get the express server to "Reset" the cookie.
    this.http.get(`${this.uri}/remove_token`, { withCredentials: true }).subscribe( (res) => {});
  }
}
