import { Injectable } from '@angular/core';
import { ProductoInterface } from '../models/producto';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthFireService } from '../auth-fire.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoCollection: AngularFirestoreCollection<ProductoInterface>;
  productoObser: Observable<ProductoInterface[]>;
  productoDoc: AngularFirestoreDocument<ProductoInterface>;
  registerFormProd: FormGroup;

  constructor(public afs: AngularFirestore,
    private formBuilder: FormBuilder,
    public authFire: AuthFireService) {

     this.registerFormProd = this.formBuilder.group({
      id:  [null],
      codigo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.maxLength(100)]],
      pertenece: [null],
      creadorId: [null],
      fechaCreate: [new Date()],
      fechaUpdate: [new Date()],
    });

    }

    getProductoforSubgrupo (pertenece) {
      this.productoCollection = this.afs.collection<ProductoInterface>('producto', res => res.where('pertenece', '==', pertenece));
     return this.productoObser = this.productoCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as ProductoInterface;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    }

    get prod() {return this.registerFormProd.controls; }

    initializeFormGroup() {
      this.registerFormProd.setValue({
        id: null,
        codigo: '',
        descripcion: '',
        pertenece: null,
        creadorId: null,
        fechaCreate: '',
        fechaUpdate: ''
      });
    }

    setProductoModal(producto) {
      this.registerFormProd.setValue(producto);
    }
    setPerteneceProd(pertenece) {
      this.prod.pertenece.setValue(pertenece);
    }

      /* CRUD */

  addProducto(newproducto: ProductoInterface) {
    this.productoCollection.add({
      codigo: newproducto.codigo,
      descripcion: newproducto.descripcion,
      pertenece: newproducto.pertenece,
      creadorId: newproducto.creadorId,
      fechaCreate: newproducto.fechaCreate,
      fechaUpdate: newproducto.fechaUpdate,
    });
    console.log('producto agregado', newproducto.descripcion);
  }

  updateProducto(upProducto: ProductoInterface) {
    this.productoCollection.doc(upProducto.id).update({
      codigo: upProducto.codigo,
      descripcion: upProducto.descripcion,
      pertenece: upProducto.pertenece,
      creadorId: upProducto.creadorId,
      fechaUpdate: upProducto.fechaUpdate,
    });
  }

  deleteProducto(id) {
    this.productoCollection.doc(id).delete();
     console.log('Producto eliminada', id);
  }
}
