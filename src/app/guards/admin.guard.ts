import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authservice: AuthService,
    private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const url: string = state.url;
      this.checkLogin(url);
    return true;
  }

  /**
   * Call auth service's checkAuth method to determine if this route should be allowed
   * @param url URL
   */
  checkLogin(url: string) {
    // Call check auth (in auth service), and check for logged_in variable.
    this.authservice.checkAuth().subscribe(
      (res) => {
        // Logged In = true, no action needed
      },
      (err) => {
        // Logged In = false, redirect to login page
        this.authservice.redirect_url = url;
        this.router.navigate(['/login']);
      }
    );
  }
  // Note that it doesn't matter that this isn't very robust as this is client-side code, which could be maliciously modified anyway.
  // As long as the routes (for accessing sensitive data) are protected on the express server side this is fine.
}

