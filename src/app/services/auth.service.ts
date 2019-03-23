import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserProfile } from '../model/user-profile';
import { EoiStudentService } from './eoi-student.service';
import { EoiBusinessService } from './eoi-business.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  auth: Subscription;
  private userDoc: AngularFirestoreDocument<UserProfile>;
  user: Observable<UserProfile>;
  userRole: string;
  isLoggedIn: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
    public eoiStudentService: EoiStudentService,
    public eoiBusinessService: EoiBusinessService) {

    this.auth = afAuth.authState.subscribe(authUser => {
      if (authUser) {
        localStorage.setItem('user', JSON.stringify(authUser));
        this.userDoc = this.afs.doc<UserProfile>('users/' + authUser.uid);
        if (eoiStudentService.getEoiStudentPath()) {
          this.userDoc.set({
            displayName: authUser.displayName,
            email: authUser.email,
            photoURL: authUser.photoURL,
            role: 'isStudent'
          }, { merge: true });
        } else if (eoiBusinessService.getEoiBusinessPath()) {
          this.userDoc.set({
            displayName: authUser.displayName,
            email: authUser.email,
            photoURL: authUser.photoURL,
            role: 'isBusiness'
          }, { merge: true });
        }
        this.isLoggedIn = true;
      } else {
        localStorage.setItem('user', null);
        this.isLoggedIn = false;
      }
    });
  }

  canActivate(): boolean {
    if (localStorage.getItem('user') === 'null' || !this.isAuthenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  get isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  get currentUser(): any {
    return this.isAuthenticated ? this.afAuth.authState : null;
  }

  loginWithFacebook() {
    return new Promise<any>((resolve, reject) => {
      const provider = new auth.FacebookAuthProvider();
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  loginWithGoogle() {
    return new Promise<any>((resolve, reject) => {
      const provider = new auth.GoogleAuthProvider();
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.eoiStudentService.setEoiStudentPath(null);
    this.eoiBusinessService.setEoiBusinessPath(null);
    this.userRole = null;
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  set role(role: string) {
    this.userRole = role;
  }

  get role(): string {
    return this.userRole;
  }
}
