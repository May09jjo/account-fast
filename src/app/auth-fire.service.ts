import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { map} from 'rxjs/operators';
import { auth } from 'firebase/app';
import { resolve } from 'url';
import { reject } from 'q';
@Injectable({
  providedIn: 'root'
})
export class AuthFireService {

  constructor(private afsAuth: AngularFireAuth) {}

  logininEmailUser(email: string , pass: string) {
    return new Promise(( resolve, reject ) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  logoutUser() {
    return this.afsAuth.auth.signOut();
  }
}
