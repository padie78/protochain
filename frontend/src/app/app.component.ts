import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  user: User | null = null;

  constructor(public auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(u => this.user = u);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
