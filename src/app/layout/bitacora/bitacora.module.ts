import { BitacoraComponent } from './bitacora.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BitacoraRoutingModule } from './bitacora-routing.module';
import { StatModule } from 'src/app/shared/modules/stat/stat.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DemoMaterialModule } from 'src/material-module';
import { MatFormFieldModule, MatDatepickerModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalBitacoraComponent } from './modal-bitacora/modal-bitacora.component';

@NgModule({
  imports: [
    CommonModule,
    BitacoraRoutingModule,
    StatModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    DemoMaterialModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ],
  declarations: [BitacoraComponent, ModalBitacoraComponent]
})
export class BitacoraModule { }
