import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { EoiStudentService } from '../services/eoi-student.service';
import { EoiBusinessService } from '../services/eoi-business.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router,
              public eoiStudentService: EoiStudentService,
              public eoiBusinessService: EoiBusinessService) { }

  ngOnInit() {
  }

  loginFacebook() {
    if (this.eoiStudentService.getEoiStudentPath() != null) {
      this.authService.loginWithFacebook().then(() => this.router.navigate(
        [this.eoiStudentService.getEoiStudentPath()]));
    } else if (this.eoiBusinessService.getEoiBusinessPath() != null) {
      this.authService.loginWithFacebook().then(() => this.router.navigate(
        [this.eoiBusinessService.getEoiBusinessPath()]));
    } else if (this.authService.isStudent) {
      this.authService.loginWithFacebook().then(() => this.router.navigate(['student']));
    } else if (this.authService.isBusiness) {
      this.authService.loginWithFacebook().then(() => this.router.navigate(['business']));
    }
  }

  loginGoogle() {
    if (this.eoiStudentService.getEoiStudentPath() != null) {
      this.authService.loginWithGoogle().then(() => this.router.navigate(
        [this.eoiStudentService.getEoiStudentPath()]));
    } else if (this.eoiBusinessService.getEoiBusinessPath() != null) {
      this.authService.loginWithGoogle().then(() => this.router.navigate(
        [this.eoiBusinessService.getEoiBusinessPath()]));
    } else if (this.authService.isStudent) {
      this.authService.loginWithGoogle().then(() => this.router.navigate(['student']));
    } else if (this.authService.isBusiness) {
      this.authService.loginWithGoogle().then(() => this.router.navigate(['business']));
    }
  }
}
