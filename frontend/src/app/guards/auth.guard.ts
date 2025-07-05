import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.auth.getUser();

    // Si no hay usuario, redirige a login
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    // Si se definieron roles permitidos
    const allowedRoles = route.data['roles'] as string[];
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      this.router.navigate(['/unauthorized']); // Página de acceso denegado
      return false;
    }

    return true; // Acceso permitido
  }
}
