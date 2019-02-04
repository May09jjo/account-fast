import { CategoriasService } from 'src/app/services/categorias.service';
import { AuthFireService } from './../../../auth-fire.service';
import { CategoriaInterface } from 'src/app/models/categorias';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


export interface DialogDataMode {
  mode: string;
}
@Component({
  selector: 'app-modal-create-categoria',
  templateUrl: './modal-create-categoria.component.html',
  styleUrls: ['./modal-create-categoria.component.scss']
})

export class ModalCreateCategoriaComponent implements OnInit {

  submitted = false;
  grupoListAgregar: CategoriaInterface [];
  userControl = new FormControl('', [Validators.required]);
  IDPADRE: string;
  categoriaInter: CategoriaInterface = {
    id: '',
    codigo: '',
    descripcion: '',
    padreId: '',
    creadorId: '',
    fechaCreate: '',
    fechaUpdate: '',
  };

  destroySubjectModal: Subject<void> = new Subject();
  constructor( public dialogRef: MatDialogRef<ModalCreateCategoriaComponent>,
              public serviceForm: CategoriasService,
              private authFire: AuthFireService, @Inject(MAT_DIALOG_DATA) public data: DialogDataMode,
              private categoriaService: CategoriasService) {

         if (this.data.mode === 'subgrupos') {
          this.categoriaService.getCategoriasPadresModal().pipe(takeUntil(this.destroySubjectModal)).subscribe(categoria => {
            this.grupoListAgregar = categoria;
            this.grupoListAgregar.map( item => {
              if (this.serviceForm.f.padreId.value === item.id) {
                  console.log('OK' + item.descripcion);
                  this.userControl.setValue(item);
              }
            });
          });
          this.userControl.valueChanges.subscribe( padreItem => {
            this.IDPADRE = padreItem.id;
            console.log(this.IDPADRE);
          });
         } else {
          console.log('Agregando Grupo');
         }
        }

  ngOnInit() {}


onSubmit() {
  this.submitted = true;
    if (this.serviceForm.registerFormcatg.invalid) {
      return;
    }
    if (this.data.mode === 'subgrupos') {
      this.categoriaInter.padreId = this.IDPADRE;
    } else {
      this.categoriaInter.padreId = '0';
    }
    this.categoriaInter.id = this.serviceForm.f.id.value;
    this.categoriaInter.creadorId = this.authFire.afsAuth.auth.currentUser.uid;
    this.categoriaInter.codigo = this.serviceForm.f.codigo.value;
    this.categoriaInter.descripcion = this.serviceForm.f.descripcion.value;
    this.categoriaInter.fechaUpdate = Date.now();

    if (!this.serviceForm.registerFormcatg.get('id').value) {
      this.categoriaInter.fechaCreate = Date.now();
      this.serviceForm.addCategoria(this.categoriaInter);
    } else {
      this.serviceForm.updateCateg(this.categoriaInter);
    }
    this.dialogRef.close();
    this.serviceForm.registerFormcatg.reset();
    this.serviceForm.initializeFormGroup();
  }
  onClose() {
    this.serviceForm.initializeFormGroup();
    this.serviceForm.registerFormcatg.reset();
  }

}
