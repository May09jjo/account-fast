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
      this.bitacoraCollection = afs.collection<BitacoraInterface>('bitacora');

      this.bitacoraObser = this.bitacoraCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as BitacoraInterface;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    this.registerFormbit = this.formBuilder.group({
      id:  [null],
      fecha: [new Date()],
      fechaEfectiva: ['', Validators.required],
      asunto: ['', [Validators.required, Validators.maxLength(50)]],
      tipoContacto: ['', Validators.required],
      detalle: ['', [Validators.required, Validators.maxLength(125)]],
      pertenece: [null]
    });

    }

    getBitacora() {
      return this.bitacoraObser;
    }

    getBitacoraforCliente (pertenece) {
      this.bitacoraCollection = this.afs.collection<BitacoraInterface>('bitacora', res => res.where('pertenece', '==', pertenece));
     return this.bitacoraObser = this.bitacoraCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as BitacoraInterface;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    }

    get bit() {return this.registerFormbit.controls; }

    initializeFormGroup() {
      this.registerFormbit.setValue({
        id: null,
        fecha: '',
        fechaEfectiva: '',
        asunto: '',
        tipoContacto: '',
        detalle: '',
        pertenece: null
      });
    }

    setBitacoraModal(bitacora) {
      this.registerFormbit.setValue(bitacora);
    }
    setPerteneceCli(pertenece) {
      this.bit.pertenece.setValue(pertenece);
    }

      /* CRUD */

  addCliente(newbitacora: BitacoraInterface) {
    this.bitacoraCollection.add({
      fecha: newbitacora.fecha,
      fechaEfectiva: newbitacora.fechaEfectiva,
      tipoContacto: newbitacora.tipoContacto,
      asunto: newbitacora.asunto,
      detalle: newbitacora.detalle,
      pertenece: newbitacora.pertenece
    });
    console.log('bitacora agregada', newbitacora.asunto);
  }

  updateClient(upBitacora: BitacoraInterface) {
    this.bitacoraCollection.doc(upBitacora.id).update({
         fecha:  upBitacora.fecha,
         fechaEfectiva: upBitacora.fechaEfectiva,
         tipoContacto: upBitacora.tipoContacto,
         asunto:  upBitacora.asunto,
         detalle:   upBitacora.detalle,
         pertenece: upBitacora.pertenece,
    });
  }

  deleteClient(id) {
    this.bitacoraCollection.doc(id).delete();
     console.log('Bitacora eliminada', id);
  }
}
