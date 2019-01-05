import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DemoMaterialModule} from '../../../material-module';
import { ClientesRoutingModule } from './clientes-routing.module';
import { StatModule } from '../../shared/modules/stat/stat.module';
import { ClientesComponent } from './clientes.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule,
    StatModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    DemoMaterialModule
  ],
  declarations: [ClientesComponent]
})
export class ClientesModule {}
