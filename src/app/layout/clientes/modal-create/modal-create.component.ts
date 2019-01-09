import { ClientesInterface } from './../../../models/clientes';
import { MatDialog, MatDialogRef} from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';



@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {

  registerFormcli: FormGroup;
  submitted = false;

  clientesInter: ClientesInterface = {
    id: '',
    codigo: '',
    fullName: '',
    cedula: '',
    email: '',
    mobile: '',
    city: '',
    departamentName: ''
  };

  constructor( public dialogRef: MatDialogRef<ModalCreateComponent>,
              private formBuilder: FormBuilder, private clientesService: ClientesService) { }

  ngOnInit() {
    this.registerFormcli = this.formBuilder.group({
      id:  [''],
      codigo: ['', [Validators.required, Validators.minLength(3)]],
      fullName: ['', Validators.required],
      cedula: ['', Validators.required],
      email: ['', Validators.email],
      mobile: ['', [Validators.required, Validators.minLength(8)]],
      city: ['', Validators.required],
      departmentName: ['', Validators.required]
    });
}

get f() {return this.registerFormcli.controls; }

onSubmit() {
  this.submitted = true;
    if (this.registerFormcli.invalid) {
      return;
    }

    this.clientesInter.codigo = this.f.codigo.value;
    this.clientesInter.fullName = this.f.fullName.value;
    this.clientesInter.cedula = this.f.cedula.value;
    this.clientesInter.email = this.f.email.value;
    this.clientesInter.mobile = this.f.mobile.value;
    this.clientesInter.city = this.f.city.value;
    this.clientesInter.departamentName = this.f.departamentName.value;
    this.clientesService.addCliente(this.clientesInter);
    this.dialogRef.close();
    console.log('CLIENTE AGREGADO', this.f.fullName.value);
  }

  onClose() {
    this.dialogRef.close();
    this.initializeFormGroup();
    this.registerFormcli.reset();
  }

  initializeFormGroup() {
    this.registerFormcli.setValue({
      id: null,
      codigo: '',
      fullName: '',
      cedula: '',
      email: '',
      mobile: '',
      city: '',
      department: ''
    });
  }

}
