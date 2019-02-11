import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserProfile } from '../model/user-profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  auth: Subscription;
  private userDoc: AngularFirestoreDocument<UserProfile>;
  user: Observable<UserProfile>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore) {

    this.auth = afAuth.authState.subscribe(authUser => {
      if (authUser) {
        this.userDoc = this.afs.doc<UserProfile>('users/' + authUser.uid);
        this.userDoc.set({
          displayName: authUser.displayName,
          email: authUser.email,
          photoURL: authUser.photoURL
        }, { merge: true });
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  canActivate(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  get isAuthenticated(): boolean {
    return this.afAuth.authState !== null;
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
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
