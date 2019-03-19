import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { EoiStudentService } from '../services/eoi-student.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router,
              public eoiStudentService: EoiStudentService) { }

  ngOnInit() {
  }

  loginFacebook() {
    if (this.eoiStudentService.getEoiStudentPath() != null) {
      this.authService.loginWithFacebook().then(() => this.router.navigate(
        [this.eoiStudentService.getEoiStudentPath()]));
    } else {
      this.authService.loginWithFacebook().then(() => this.router.navigate(['home']));
    }
  }

  loginGoogle() {
    if (this.eoiStudentService.getEoiStudentPath() != null) {
      this.authService.loginWithGoogle().then(() => this.router.navigate(
        [this.eoiStudentService.getEoiStudentPath()]));
    } else {
      this.authService.loginWithGoogle().then(() => this.router.navigate(['home']));
    }
  }
}
