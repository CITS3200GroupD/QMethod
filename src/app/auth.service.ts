import { isDevMode, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
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


  constructor(private cookieservice: CookieService,
    private http: HttpClient) {
    if (isDevMode()) { console.log('auth.service init'); }
    if (isDevMode()) {
      this.uri = 'http://localhost:8080/auth';

    } else {
      this.uri = '/auth';
    }
    this.checkAuth();
  }

  /** Check Session ID (in cookie) vs Auth Server */
  checkAuth() {
    if (isDevMode()) { console.log('---------- auth.service.checkAuth() -----------'); }
    // TODO: CALL Auth API to ensure this is a valid session
    const token = this.cookieservice.get('SESSION_ID');
    if (isDevMode()) {
      if (token) {
        console.log(`TOKEN: ${token.substring(0, 30)}...`);
      } else {
        console.log('TOKEN: undefined');
      }
    }
    const input = {
      'SESSION_ID': token
    };
    return this.http.post(`${this.uri}/check_token`, input,
    {
      headers: new HttpHeaders({ 'Content-Type' : 'application/json'}),
      withCredentials: true
    }).pipe(
      tap((res: HttpResponse<Object>) => {
        this.logged_in = true;
        if (isDevMode()) { console.log(`RES <= ${token.substring(0, 30)}...`); }
      },
      (err) => {
        // this.logOut();
      })
    );
  }

  /** Send login data to authentication route */
  logIn(admin: Admin): Observable<Object> {
    return this.http.post(this.uri, admin,
      {
        headers: new HttpHeaders({ 'Content-Type' : 'application/json'}),
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

  /** Function called on log out, removes cookie and sets login flag to falsdse */
  logOut(): void {
    this.logged_in = false;
    this.cookieservice.remove('SESSION_ID');
  }
}
