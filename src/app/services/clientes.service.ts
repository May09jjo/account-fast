import { ClientesInterface } from './../models/clientes';
import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection , AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthFireService } from '../auth-fire.service';




@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientesCollection: AngularFirestoreCollection<ClientesInterface>;
  clientesObser: Observable<ClientesInterface[]>;
  clientesDoc: AngularFirestoreDocument<ClientesInterface>;
  registerFormcli: FormGroup;
  constructor(public afs: AngularFirestore,
        private formBuilder: FormBuilder,
        public authFire: AuthFireService) {

  this.clientesCollection = afs.collection<ClientesInterface>('clientes');

    this.clientesObser = this.clientesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ClientesInterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

      this.registerFormcli = this.formBuilder.group({
        id:  [null],
        codigo: ['', [Validators.required, Validators.minLength(3)]],
        fullName: ['', Validators.required],
        cedula: ['', Validators.required],
        email: ['', Validators.email],
        mobile: ['', [Validators.required, Validators.minLength(8)]],
        city: ['', Validators.required],
        departmentName: ['', Validators.required],
        idUser: [null]
      });
   }

   getClientes() {
    return this.clientesObser;
  }

  getClientesforId(iduser) {

    return this.afs.collection('clientes').doc(iduser);
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
       departmentName: '',
       idUser: null
     });
   }

   setClienteModal(cliente) {
    this.registerFormcli.setValue(cliente);
  }

    /* CRUD */

  addCliente(newclient: ClientesInterface) {
    this.clientesCollection.add({
      fullName: newclient.fullName,
      codigo: newclient.codigo,
      cedula: newclient.cedula,
      email: newclient.email,
      city: newclient.city,
      mobile: newclient.mobile,
      departmentName: newclient.departmentName,
      idUser: newclient.idUser
    });
    console.log('cliente agregado', newclient.fullName);
  }

  updateClient(upClient: ClientesInterface) {
    this.clientesCollection.doc(upClient.id).update({
      fullName:  upClient.fullName,
         codigo: upClient.codigo,
         cedula: upClient.cedula,
         email:  upClient.email,
         city:   upClient.city,
         mobile: upClient.mobile,
         departmentName: upClient.departmentName
    });
  }

  deleteClient(id) {
    this.clientesCollection.doc(id).delete();
     console.log('cliente eliminado', id);
  }
}
