import { Component, OnInit, Inject} from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { AuthFireService } from '.././auth-fire.service';

/* Firebase Login & Sign-In*/
import { AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

import { MustMatch } from './must-match.validator';


export interface DialogData {
  email: string;
  password: string;
  confirm: string;
}
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    constructor(private router: Router ,
      public dialog: MatDialog,
      public afAuth: AngularFireAuth,
      private authfire: AuthFireService,
      public snackBar: MatSnackBar) {}

  emailadd: string;
  passwordadd: string;
  confirm: string;

  /* validar email & password*/
  emailv = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

 // tslint:disable-next-line:member-ordering
 public email = '';
 public password = '';

  getErrorMessage() {
    return this.emailv.hasError('required') ? 'Debe introducir un correo' :
    this.emailv.hasError('email') ? 'Correo no valido' : '';
  }

    ngOnInit() {}

    onLoginEmailPass() {
        this.authfire.logininEmailUser(this.email, this.password )
        .then((res) => {
          localStorage.setItem('isLoggedin', 'true');
          this.router.navigate(['/dashboard']);
          console.log('res', res);
          console.log('mensaje');
        }).catch(err => {

          switch (err.code) {
            case 'auth/invalid-email':
                console.log('correo invalido');
                this.openSnackBar('Correo Invalido', 'Error');
            break;
            case 'auth/user-not-found':
                console.log('USUARIO NO VALIDO');
                this.openSnackBar('¡Usuario no encontrado!', 'Error');
              break;
            case 'auth/wrong-password':
                console.log('contraseña invalida');
                this.openSnackBar('¡Contraseña invalida!', 'Error');
            break;
            default:
                console.log('err', err.code);
                this.openSnackBar(err.message, 'Error');
            break;
          }
        });
    }

  public  openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000,
      });
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(SignInDialog, {
        width: '500px',
        data: {emailadd: this.emailadd, passwordadd: this.passwordadd, confirm: this.confirm }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.emailadd = result.email;
        this.passwordadd = result.password;
        this.confirm = result.confirm;
        console.log('EMAIL', this.emailadd + 'PASS', this.passwordadd + 'CONFIRMA' , this.confirm );
       /*  this.onAddUser(this.emailadd, this.passwordadd); */
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
export class SignInDialog implements OnInit {

  public email = '';
  public password = '';

  registerForm: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<SignInDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private authfire: AuthFireService,
    private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    get f() {return this.registerForm.controls; }

    onSubmit() {
      this.submitted = true;

      if (this.registerForm.invalid) {
        return;
      }

      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
    }

  onNoClick(): void {
    this.dialogRef.close();
    console.log('No gracias');
  }



}
