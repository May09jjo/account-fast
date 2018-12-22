import { Component, OnInit, Inject} from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthFireService } from '.././auth-fire.service';

/* Firebase Login & Sign-In*/
import { AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { EmailValidator } from '@angular/forms';

export interface DialogData {
  email: string;
  password: string;
}
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  emailadd: string;
  passwordadd: string;

    constructor(private router: Router ,
      public dialog: MatDialog,
      public afAuth: AngularFireAuth,
      private authfire: AuthFireService) {}

 public email = '';
 public password = '';

    ngOnInit() {}

    onLoginEmailPass() {
        this.authfire.logininEmailUser(this.email, this.password )
        .then((res) => {
          localStorage.setItem('isLoggedin', 'true');
          this.router.navigate(['/dashboard']);
          console.log('res', res);
          console.log('mensaje');
        }).catch(err => console.log('err', err.message));
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(SignInDialog, {
        width: '450px',
        data: {emailadd: this.emailadd, passwordadd: this.passwordadd}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.emailadd = result.email;
        this.passwordadd = result.password;
        console.log('EMAIL', this.emailadd + 'PASS', this.passwordadd);
        this.onAddUser(this.emailadd, this.passwordadd);
      });
    }

    onAddUser(emailAdd: string, passwordAdd: string) {
      this.authfire.registerUser(emailAdd, passwordAdd).then((res) => {
          localStorage.setItem('isLoggedin', 'true');
          this.router.navigate(['/dashboard']);
      }).catch(err => console.log('err', err.message));
    }

}



/* Sing In Dialog */

@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: 'sign-in-dialog.html',
  styleUrls: ['./login.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class SignInDialog {

  public email = '';
  public password = '';

  constructor(
    public dialogRef: MatDialogRef<SignInDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private authfire: AuthFireService) {}

  onNoClick(): void {
    this.dialogRef.close();
    console.log('No gracias');
  }



}
