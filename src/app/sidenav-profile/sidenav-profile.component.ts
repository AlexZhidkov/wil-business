import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidenav-profile',
  templateUrl: './sidenav-profile.component.html',
  styleUrls: ['./sidenav-profile.component.scss']
})
export class SidenavProfileComponent implements OnInit {
  displayName: string;
  email: string;
  photoURL: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      this.displayName = user.displayName;
      this.email = user.email;
      this.photoURL = user.photoURL;
    });
  }
}
