import { BitacoraInterface } from './../../../models/bitacora';
import { BitacoraService } from './../../../services/bitacora.service';
import { Component, OnInit } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {AuthFireService } from '../../../auth-fire.service';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-modal-bitacora',
  templateUrl: './modal-bitacora.component.html',
  styleUrls: ['./modal-bitacora.component.scss']
})


export class ModalBitacoraComponent implements OnInit {

submitted = false;

bitacoraInter: BitacoraInterface = {
  id: '',
  fecha: '',
  fechaEfectiva: '',
  asunto: '',
  tipoContacto: '',
  detalle: '',
  pertenece: ''
};


  constructor(public dialogRef: MatDialogRef<ModalBitacoraComponent> ,
    public serviceFormBit: BitacoraService,
    private authFire: AuthFireService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
      if (this.serviceFormBit.registerFormbit.invalid) {
        return;
      }
      /* this.clientesInter.id = this.serviceForm.f.id.value;
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
      this.serviceForm.initializeFormGroup(); */
    }
    onClose() {
      /* this.serviceFormBit.initializeFormGroup();
      this.serviceFormBit.registerFormbit.reset(); */
    }

}
