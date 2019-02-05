import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
              path: 'clientes',
              loadChildren: './clientes/clientes.module#ClientesModule'
            },
            {
              path: 'bitacora',
              loadChildren: './bitacora/bitacora.module#BitacoraModule'
            },
            {
                path: 'categorias/:mode',
                loadChildren: './categorias/categorias.module#CategoriasModule',
            },
            {
                path: 'producto',
                loadChildren:
                    './producto/producto.module#ProductoModule'
            }
            /*,
            {
                path: 'forms',
                loadChildren: './forms/forms.module#FormsModule'
            },
            {
                path: 'grid',
                loadChildren: './grid/grid.module#GridModule'
            },
            {
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule'
            },
            {
                path: 'blank-page',
                loadChildren: './blank-page/blank-page.module#BlankPageModule'
            } */
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
