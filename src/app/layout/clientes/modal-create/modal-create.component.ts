import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {

  registerFormcli: FormGroup;
  submitted = false;

  constructor( public dialogRef: MatDialogRef<ModalCreateComponent>,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerFormcli = this.formBuilder.group({
      id:  new FormControl(null),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
      city: new FormControl(''),
      gender: new FormControl('1'),
      department: new FormControl(0),
      hireDate: new FormControl(''),
    });
}

get f() {return this.registerFormcli.controls; }

onSubmit() {
  this.submitted = true;
    if (this.registerFormcli.invalid) {
      return;
    }
  }

  onClose() {
    this.dialogRef.close();
    this.initializeFormGroup();
    console.log('No gracias');
  }

  initializeFormGroup() {
    this.registerFormcli.setValue({
      id: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: ''
    });
  }

}
