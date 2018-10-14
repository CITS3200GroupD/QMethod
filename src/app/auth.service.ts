import { isDevMode, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Admin } from 'src/app/models';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

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
    if (isDevMode()) {
      this.uri = 'http://localhost:8080/auth';

    } else {
      this.uri = '/auth';
    }
    this.checkAuth();  // Load authkey from cookie (if it exists)
  }

  /** Check Session ID (in cookie) vs Auth Server */
  checkAuth() {
    if (isDevMode()) { console.log('checkAuth'); }
    // TODO: CALL Auth API to ensure this is a valid session
    const token = this.cookieservice.get('SESSION_ID');
    const input = {
      'SESSION_ID': token
    };
    this.http.post(`${this.uri}/check_token`, input).subscribe(
      res => {
        this.logged_in = true;
      },
      err => {
        this.logged_in = false;
        this.logOut();
      }
    );
  }

  /** Send login data to authentication route */
  logIn(admin: Admin): Observable<Object> {
    return this.http.post(this.uri, admin,
      {
        headers: this.headers,
        observe: 'response'
      }).pipe(
      tap((res: HttpResponse<string>) => {
        this.logged_in = true;
        // Cookie will be imported by browser automatically
        if (isDevMode()) {
          // For offline testing, we have to manually create the cookie.
          this.cookieservice.put('SESSION_ID', res.body, { httpOnly: true });
        }
      },
      (err) => {})
    );
  }

  /** Function called on log out, removes cookie and sets login flag to falsdse */
  logOut(): void {
    this.logged_in = false;
    this.cookieservice.remove('SESSION_ID');
  }
}
