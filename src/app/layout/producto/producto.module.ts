import { DemoMaterialModule } from './../../../material-module';
import { StatModule } from './../../shared/modules/stat/stat.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatDatepickerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoComponent } from './producto.component';

@NgModule({
  imports: [
    CommonModule,
    ProductoRoutingModule,
    StatModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    DemoMaterialModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ],
  declarations: [ProductoComponent, ModalProductoComponent],
  entryComponents: [ProductoComponent, ModalProductoComponent]
})
export class ProductoModule { }
