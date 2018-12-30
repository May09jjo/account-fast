import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { map} from 'rxjs/operators';
import { auth } from 'firebase/app';
import { resolve } from 'url';
import { reject } from 'q';
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class AuthFireService {

  constructor(public afsAuth: AngularFireAuth) {}

  logininEmailUser(email: string , pass: string) {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise(( resolve, reject ) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }

  registerUser (email: string, pass: string) {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }


  loginGoogleUser() {
    return  this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  isAuth() {
    // tslint:disable-next-line:no-shadowed-variable
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

}
