import { Component, OnInit } from '@angular/core';
import { EoiBusiness } from '../model/eoi-business';
import { Observable } from 'rxjs';
import { EoiBusinessService } from '../services/eoi-business.service';
import { UserProfile } from '../model/user-profile';

@Component({
  selector: 'app-profile-business',
  templateUrl: './profile-business.component.html',
  styleUrls: ['./profile-business.component.scss']
})
export class ProfileBusinessComponent implements OnInit {
  user: UserProfile;
  eoiBusinessUrl: string;
  eois: Observable<EoiBusiness[]>;
  isLoading: boolean;
  constructor(
    private eoiBusinessService: EoiBusinessService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.eoiBusinessUrl = '/users/' + this.user.uid + '/eoiBusiness';
    this.eoiBusinessService.setCollection(this.eoiBusinessUrl);
    this.eois = this.eoiBusinessService.list();
    this.eois.subscribe(e => {
      this.isLoading = false;
    });
  }

}
