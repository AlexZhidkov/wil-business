import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  login: boolean;
  photoURL: string;

  constructor(public authService: AuthService) {
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
}
