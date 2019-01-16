import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BitacoraInterface } from '../models/bitacora';
import { AuthFireService } from '../auth-fire.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  bitacoraCollection: AngularFirestoreCollection<BitacoraInterface>;
  bitacoraObser: Observable<BitacoraInterface[]>;
  bitacoraDoc: AngularFirestoreDocument<BitacoraInterface>;
  registerFormbit: FormGroup;

  constructor(public afs: AngularFirestore,
    private formBuilder: FormBuilder,
    public authFire: AuthFireService) {
      this.bitacoraCollection = afs.collection<BitacoraInterface>('clientes');

      this.bitacoraObser = this.bitacoraCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as BitacoraInterface;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );

    this.registerFormbit = this.formBuilder.group({
      id:  [null],
      fecha: ['', [Validators.required, Validators.minLength(3)]],
      fechaEfectiva: ['', Validators.required],
      asunto: ['', Validators.required],
      tipoContacto: ['', Validators.email],
      detalle: ['', [Validators.required, Validators.minLength(8)]],
      pertenece: [null]
    });

    }

    getBitacora() {
      return this.bitacoraObser;
    }

    getBitacoraforCliente (pertenece) {

    }

    get bit() {return this.registerFormbit.controls; }
}
