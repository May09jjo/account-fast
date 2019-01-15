
import { ClientesInterface } from './../../../models/clientes';
import { MatDialog, MatDialogRef} from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
import {AuthFireService } from '../../../auth-fire.service';


@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {

  submitted = false;

  clientesInter: ClientesInterface = {
    id: '',
    codigo: '',
    fullName: '',
    cedula: '',
    email: '',
    mobile: '',
    city: '',
    departmentName: '',
    idUser: ''
  };

  constructor( public dialogRef: MatDialogRef<ModalCreateComponent>,
              public serviceForm: ClientesService,
              private authFire: AuthFireService) { }

  ngOnInit() {}


onSubmit() {
  this.submitted = true;
    if (this.serviceForm.registerFormcli.invalid) {
      return;
    }
    this.clientesInter.id = this.serviceForm.f.id.value;
    this.clientesInter.codigo = this.serviceForm.f.codigo.value;
    this.clientesInter.fullName = this.serviceForm.f.fullName.value;
    this.clientesInter.cedula = this.serviceForm.f.cedula.value;
    this.clientesInter.email = this.serviceForm.f.email.value;
    this.clientesInter.mobile = this.serviceForm.f.mobile.value;
    this.clientesInter.city = this.serviceForm.f.city.value;
    this.clientesInter.departmentName = this.serviceForm.f.departmentName.value;
    this.clientesInter.idUser = this.authFire.afsAuth.auth.currentUser.uid;
    if (!this.serviceForm.registerFormcli.get('id').value) {
      this.serviceForm.addCliente(this.clientesInter);
    } else {
      this.serviceForm.updateClient(this.clientesInter);
    }
    this.dialogRef.close();
    this.serviceForm.registerFormcli.reset();
    this.serviceForm.initializeFormGroup();
  }
  onClose() {
    this.serviceForm.initializeFormGroup();
    this.serviceForm.registerFormcli.reset();
  }

}
