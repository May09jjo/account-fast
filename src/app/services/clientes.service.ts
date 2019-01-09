import { ClientesInterface } from './../models/clientes';
import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection , AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientesCollection: AngularFirestoreCollection<ClientesInterface>;
  clientesObser: Observable<ClientesInterface[]>;
  clientesDoc: AngularFirestoreDocument<ClientesInterface>;

  constructor(private afs: AngularFirestore) {

  this.clientesCollection = afs.collection<ClientesInterface>('clientes');

    this.clientesObser = this.clientesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ClientesInterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }

  getClientes() {
    return this.clientesObser;
  }

  addCliente(newcliente: ClientesInterface) {
    this.clientesCollection.add(newcliente);
  }
}
