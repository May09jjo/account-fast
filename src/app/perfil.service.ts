import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection , AngularFirestoreDocument} from 'angularfire2/firestore';
import { Perfil } from './models/perfil';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  perfilColletion: AngularFirestoreCollection<Perfil>;
  perfilObser: Observable<Perfil[]>;
  perfilDoc: AngularFirestoreDocument<Perfil>;
  pefilDoc: AngularFirestoreDocument<Perfil>;
  perfilget: Observable<Perfil>;

  constructor(private afs: AngularFirestore) {
    this.perfilColletion = afs.collection<Perfil>('usuarios');
  }


  getNameforId(id) {
    this.perfilDoc = this.afs.doc<Perfil>('usuarios/' + id);
   return this.perfilget = this.perfilDoc.valueChanges();
  }
  /* INSERT */

  insertPerfil(perfil: Perfil) {
    this.perfilColletion.doc(perfil.$key).set(perfil);
    console.log('REGISTRADO');
  }

  /* UPDATE */

  updatePerfil( perfil: Perfil) {

  }

  /* DELETE */

  deleteCliente() {

  }

}
