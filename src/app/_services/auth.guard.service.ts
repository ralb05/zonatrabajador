import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.authenticationService.loggedIn()) {
      return true;
    } else {
      this.authenticationService.logout();
      this.router.navigate( ['/login'] );
      return false;
    }
  }
}
