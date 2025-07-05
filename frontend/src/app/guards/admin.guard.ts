import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.auth.getUser();

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    if (user.role !== 'admin') {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
