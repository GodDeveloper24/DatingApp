import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}
  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data.roles as Array<string>;

    if (roles)
    {
      const match = this.authService.roleMatch(roles);
      if (match)
      {
        return true;
      }
      else {
        this.router.navigate(['members']);
        this.alertify.error('You are not allowed bruh');
      }
    }

    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('YOU SHALL NOT PASS!!!');
    this.router.navigate(['/home']);
    return false;
  }
}
