import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  login: boolean;
  photoURL: string;

  constructor(public authService: AuthService,
              private router: Router) {
    this.authService.initialDetails.subscribe(obj => {
      this.login = obj.isLogin;
      this.photoURL = obj.photoURL;
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  logout() {
    this.authService.logout();
  }

  navigateToProfilePage() {
    if (this.authService.isStudent) {
      this.router.navigateByUrl('/student/profile');
    } else if (this.authService.isBusiness) {
      this.router.navigateByUrl('/business/profile');
    }
  }
}
