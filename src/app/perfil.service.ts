import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection , AngularFirestoreDocument} from 'angularfire2/firestore';
import { Perfil } from './models/perfil';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  perfilCollection: AngularFirestoreCollection<Perfil>;
  perfilObser: Observable<Perfil[]>;
  perfilDoc: AngularFirestoreDocument<Perfil>;
  pefilDoc: AngularFirestoreDocument<Perfil>;
  perfilget: Observable<Perfil>;

  constructor(private afs: AngularFirestore) {
    this.perfilCollection = afs.collection<Perfil>('usuarios');
    /* Mejora : al filtrar los usuarios solo obtener los que tienen cliente creados */
    this.perfilObser = this.perfilCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Perfil;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }


  getNameforId(id) {
    this.perfilDoc = this.afs.doc<Perfil>('usuarios/' + id);
   return this.perfilget = this.perfilDoc.valueChanges();
  }

  getUser() {
    return this.perfilObser;
  }
  /* INSERT */

  insertPerfil(perfil: Perfil) {
    this.perfilCollection.doc(perfil.$key).set(perfil);
    console.log('REGISTRADO');
  }

  /* UPDATE */

  updatePerfil( perfil: Perfil) {

  }

  /* DELETE */

  deleteCliente() {

  }

}
