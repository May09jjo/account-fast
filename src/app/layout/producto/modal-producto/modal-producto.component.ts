import { CategoriasService } from './../../../services/categorias.service';
import { AuthFireService } from './../../../auth-fire.service';
import { ProductoInterface } from './../../../models/producto';
import { CategoriaInterface } from './../../../models/categorias';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductoService } from '../../../services/producto.service';
import { takeUntil } from 'rxjs/operators';


export interface DialogDataModePadre {
  mode: string;
}
@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.scss']
})
export class ModalProductoComponent implements OnInit, OnDestroy {

  submitted = false;
  subgrupoListAgregar: CategoriaInterface [];
  userControl = new FormControl('', [Validators.required]);
  IdSubgrupo: string;

  productoInter: ProductoInterface = {
    id: '',
    codigo: '',
    descripcion: '',
    pertenece: '',
    creadorId: '',
    fechaCreate: '',
    fechaUpdate: '',
  };

  destroySubjectModal: Subject<void> = new Subject();
  constructor( public dialogRef: MatDialogRef<ModalProductoComponent>,
              public serviceForm: ProductoService,
              private authFire: AuthFireService,
              private categoriaService: CategoriasService,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataModePadre) {

          this.categoriaService.getSubGrupoProdModal(this.data.mode).
          pipe(takeUntil(this.destroySubjectModal)).subscribe(categoria => {
            this.subgrupoListAgregar = categoria;
            this.subgrupoListAgregar.map( item => {
              if (this.serviceForm.prod.pertenece.value === item.id) {
                  console.log('OK' + item.descripcion);
                  this.userControl.setValue(item);
              }
            });
          });
        this.userControl.valueChanges.subscribe( subgrupoItem => {
          this.IdSubgrupo = subgrupoItem.id;
          console.log(this.IdSubgrupo);
        });
}

ngOnInit() {}
ngOnDestroy() {
  this.destroySubjectModal.next();
}

onSubmit() {
  this.submitted = true;
    if (this.serviceForm.registerFormProd.invalid) {
      return;
    }
    this.productoInter.pertenece = this.IdSubgrupo;
    this.productoInter.id = this.serviceForm.prod.id.value;
    this.productoInter.creadorId = this.authFire.afsAuth.auth.currentUser.uid;
    this.productoInter.codigo = this.serviceForm.prod.codigo.value;
    this.productoInter.descripcion = this.serviceForm.prod.descripcion.value;
    this.productoInter.fechaUpdate = Date.now();

    if (!this.serviceForm.registerFormProd.get('id').value) {
      this.productoInter.fechaCreate = Date.now();
      this.serviceForm.addProducto(this.productoInter);
    } else {
      this.serviceForm.updateProducto(this.productoInter);
    }
    this.dialogRef.close();
    this.serviceForm.registerFormProd.reset();
    this.serviceForm.initializeFormGroup();
  }
  onClose() {
    this.serviceForm.initializeFormGroup();
    this.serviceForm.registerFormProd.reset();
  }

}
