import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { StatModule } from 'src/app/shared/modules/stat/stat.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DemoMaterialModule } from 'src/material-module';
import { MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriasComponent } from './categorias.component';
import { ModalCreateCategoriaComponent } from './modal-create-categoria/modal-create-categoria.component';

@NgModule({
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    StatModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    DemoMaterialModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CategoriasComponent, ModalCreateCategoriaComponent],
  entryComponents: [CategoriasComponent, ModalCreateCategoriaComponent]
})
export class CategoriasModule { }
