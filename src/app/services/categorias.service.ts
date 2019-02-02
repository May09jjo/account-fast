import { Injectable } from '@angular/core';
import { CategoriaInterface } from '../models/categorias';
import { AngularFirestoreCollection ,AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthFireService } from '../auth-fire.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  categoriaCollection: AngularFirestoreCollection<CategoriaInterface>;
  categoriaObser: Observable<CategoriaInterface[]>;
  categoriaDoc: AngularFirestoreDocument<CategoriaInterface>;
  registerFormcli: FormGroup;
  constructor(public afs: AngularFirestore,
        private formBuilder: FormBuilder,
        public authFire: AuthFireService) {

    this.categoriaCollection = this.afs.collection<CategoriaInterface>('categoria', res => res.where('padreId', '==', '0'));

    this.categoriaObser = this.categoriaCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CategoriaInterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

      this.registerFormcli = this.formBuilder.group({
        id:  [null],
        codigo: ['', [Validators.required, Validators.minLength(3)]],
        descripcion: ['', [Validators.required, Validators.maxLength(100)]],
        padreId: [null],
        creadorId: [null],
        fechaCreate: [''],
        fechaUpdate: [''],
      });
   }

   getCategoriasPadres() {
    return this.categoriaObser;
  }


  getCategoriasHijas(idPadre) {
    this.categoriaCollection = this.afs.collection<CategoriaInterface>('categoria', res => res.where('padreId', '==', idPadre));
     return this.categoriaObser = this.categoriaCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as CategoriaInterface;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

   get f() {return this.registerFormcli.controls; }

   initializeFormGroup() {
     this.registerFormcli.setValue({
       id: null,
       codigo: '',
       descripcion: '',
       padreId: null,
       creadorId: null,
       fechaCreate: '',
       fechaUpdate: ''
     });
   }

   setCategoriaModal(categoria) {
    this.registerFormcli.setValue(categoria);
  }

    /* CRUD */

  addCategoria(newcateg: CategoriaInterface) {
    this.categoriaCollection.add({
      codigo: newcateg.codigo,
      descripcion: newcateg.descripcion,
      padreId: newcateg.padreId,
      creadorId: newcateg.creadorId,
      fechaCreate: newcateg.fechaCreate,
      fechaUpdate: newcateg.fechaUpdate,
    });
    console.log('categoria agregada', newcateg.descripcion);
  }

  updateCateg(upCateg: CategoriaInterface) {
    this.categoriaCollection.doc(upCateg.id).update({
      codigo: upCateg.codigo,
      descripcion: upCateg.descripcion,
      padreId: upCateg.padreId,
      creadorId: upCateg.creadorId,
      fechaCreate: upCateg.fechaCreate,
      fechaUpdate: upCateg.fechaUpdate,
    });
  }

  deleteCategoria(id) {
    this.categoriaCollection.doc(id).delete();
     console.log('Categoria eliminado : ', id);
  }
}
