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
    this.checkAuth();  // Load authkey from cookie (if it exists)
    if (isDevMode()) {
      this.uri = 'http://localhost:8080/auth';

    } else {
      this.uri = '/auth';
    }
  }

  /** Check Session ID (in cookie) vs Auth Server */
  checkAuth() {
    // TODO: CALL Auth API to ensure this is a valid session
    if (this.cookieservice.get('SESSION_ID')) {
      this.logged_in = true;
    }
  }

  /**
   * Send user/password fields to the server, returns cookie with JWT token
   */
  createCookie(username: string, password: string) {
  }

  // TODO
  // Fix token_authenticate
  logIn(admin: Admin): Observable<Object> {
    return this.http.post(this.uri, admin,
      {
        headers: this.headers,
        observe: 'response'
      }).pipe(
      tap((res: HttpResponse<string>) => {
        this.logged_in = true;
        if (isDevMode()) {
          this.cookieservice.put('SESSION_ID', res.body, { httpOnly: true });    // TODO: replace placeholder cookie with token cookie
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
