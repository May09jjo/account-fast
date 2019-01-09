import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DemoMaterialModule} from '../../../material-module';
import { ClientesRoutingModule } from './clientes-routing.module';
import { StatModule } from '../../shared/modules/stat/stat.module';
import { ClientesComponent } from './clientes.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModalCreateComponent} from './modal-create/modal-create.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule,
    StatModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    DemoMaterialModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ClientesComponent,ModalCreateComponent],
  entryComponents: [ClientesComponent, ModalCreateComponent]
})
export class ClientesModule {}
