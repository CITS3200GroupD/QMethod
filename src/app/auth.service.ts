import { isDevMode, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable()
export class AuthService {

  logged_in = false;

  // store the URL so we can redirect after logging in
  redirect_url: string;


  constructor(private cookieservice: CookieService) {
    if (isDevMode()) { console.log('AuthService Init'); }
    this.checkAuth();  // Load authkey from cookie (if it exists)
  }

  /** Check Session ID (in cookie) vs Auth Server */
  checkAuth() {
    // TODO: CALL Auth API to ensure this is a valid session
    if (this.cookieservice.get('SESSION_ID')) {
      this.logged_in = true;
    }
  }

  logIn(): Observable<boolean> {
    return of(true).pipe(
      delay(250),
      tap(() => {
        this.logged_in = true;
        this.cookieservice.put('SESSION_ID', 'valid-token');
      })
    );
  }

  logOut(): void {
    this.logged_in = false;
    this.cookieservice.remove('SESSION_ID');
  }
}
