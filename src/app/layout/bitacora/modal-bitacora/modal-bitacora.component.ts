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
      this.bitacoraInter.fecha = this.serviceFormBit.bit.fecha.value;
      this.bitacoraInter.id = this.serviceFormBit.bit.id.value;
      this.bitacoraInter.fechaEfectiva = this.serviceFormBit.bit.fechaEfectiva.value;
      this.bitacoraInter.asunto = this.serviceFormBit.bit.asunto.value;
      this.bitacoraInter.tipoContacto = this.serviceFormBit.bit.tipoContacto.value;
      this.bitacoraInter.detalle = this.serviceFormBit.bit.detalle.value;
      this.bitacoraInter.pertenece = this.serviceFormBit.bit.pertenece.value;

      if (!this.serviceFormBit.registerFormbit.get('id').value) {
       /*  this.serviceFormBit.addCliente(this.bitacoraInter); */
       console.log('BITACORA AGREGADA:' + this.serviceFormBit.bit.fecha.value);
      } else {
        /* this.serviceFormBit.updateClient(this.bitacoraInter); */
      }
      this.dialogRef.close();
      this.serviceFormBit.registerFormbit.reset();
      this.serviceFormBit.initializeFormGroup();
    }
    onClose() {
      this.serviceFormBit.initializeFormGroup();
      this.serviceFormBit.registerFormbit.reset();
      /* Al hacer reset al editar un elemento el id se elimina ver error */
    }

}
