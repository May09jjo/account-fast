import { Clientes } from './../models/clientes';
import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection , AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientesColletion: AngularFirestoreCollection<Clientes>;
  clientesObser: Observable<Clientes[]>;
  clientesDoc: AngularFirestoreDocument<Clientes>;

  constructor(private afs: AngularFirestore) {
    this.clientesColletion = afs.collection<Clientes>('clientes');

    this.clientesObser = this.clientesColletion.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Clientes;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }

  getClientes() {
    return this.clientesObser;
  }
}
