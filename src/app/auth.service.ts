import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable()
export class AuthService {
  logged_in = false;

  // store the URL so we can redirect after logging in
  redirect_url: string;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.logged_in = true)
    );
  }

  logout(): void {
    this.logged_in = false;
  }
}
