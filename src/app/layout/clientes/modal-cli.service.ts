import { ClientesService } from './../../services/clientes.service';
import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ModalCliService {

  registerFormcli: FormGroup;
  submitted = false;



  constructor(private formBuilder: FormBuilder,
    private clientesService: ClientesService) {

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

    setClienteModal(cliente) {
      this.registerFormcli.setValue(cliente);
    }

    /* CRUD */

    insertClient(client) {
      console.log('cliente agregado');
    }

    updateClient(cliente) {
      console.log('cliente editado');
    }
}
