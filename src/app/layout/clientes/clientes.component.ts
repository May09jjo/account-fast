import { ModalCliService } from './modal-cli.service';
import { ClientesInterface } from './../../models/clientes';
import { ClientesService } from './../../services/clientes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthFireService } from '../../auth-fire.service';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig} from '@angular/material';
import { forEach } from '@angular/router/src/utils/collection';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ModalCreateComponent } from './modal-create/modal-create.component';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {


  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['codigo', 'fullName', 'cedula', 'email', 'mobile', 'city', 'departmentName', 'actions'];
  clientsInt: ClientesInterface[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private clientesService: ClientesService,
        private dialog: MatDialog,
        private serviceForm: ModalCliService) {}

  ngOnInit() {
      this.clientesService.getClientes().subscribe(clients => {
          this.clientsInt = clients;
        this.listData = new MatTableDataSource(this.clientsInt);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

      });


    }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


  onCreate() {
    /* this.service.initializeFormGroup(); */
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ModalCreateComponent, dialogConfig);
  }

  onEdit(row) {
    this.serviceForm.setClienteModal(row);
     const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ModalCreateComponent, dialogConfig);
    console.log('ARRAY ROW CLIENTE: ', row);
  }

  onDelete($key) {
    /* if(confirm('Are you sure to delete this record ?')){
    this.service.deleteEmployee($key);
    this.notificationService.warn('! Deleted successfully');
    }
 */  }

}


