import { Component, OnInit, Inject} from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export interface DialogData {
  animal: string;
  name: string;
}
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  animal: string;
  name: string;

    constructor(private router: Router , public dialog: MatDialog) {}

    ngOnInit() {}

    onLogin() {
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/dashboard']);
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(SignInDialog, {
        width: '450px',
        data: {name: this.name, animal: this.animal}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
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

  constructor(
    public dialogRef: MatDialogRef<SignInDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
