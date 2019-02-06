import { Subject } from 'rxjs';

import { ClientesInterface } from './../../models/clientes';
import { ClientesService } from './../../services/clientes.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthFireService } from '../../auth-fire.service';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig} from '@angular/material';
import { forEach } from '@angular/router/src/utils/collection';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ModalCreateComponent } from './modal-create/modal-create.component';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, OnDestroy{


  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['codigo', 'fullName', 'cedula', 'email', 'mobile', 'city', 'departmentName', 'actions'];
  clientsInt: ClientesInterface[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  destroySubjectCli: Subject<void> = new Subject();
  constructor(private clientesService: ClientesService,
        private dialog: MatDialog, public authFire: AuthFireService) { }

  ngOnInit() {
      this.clientesService.getClientes().pipe(takeUntil(this.destroySubjectCli)).subscribe(clients => {
        this.clientsInt = clients;
        this.listData = new MatTableDataSource(this.clientsInt);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
    }

  ngOnDestroy() {
    this.destroySubjectCli.next();
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
    if (window.innerWidth > 992) {dialogConfig.width = '50%'; }
    this.dialog.open(ModalCreateComponent, dialogConfig);
  }

  onEdit(row) {
    this.clientesService.setClienteModal(row);
     const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (window.innerWidth > 992) {dialogConfig.width = '50%'; }
    this.dialog.open(ModalCreateComponent, dialogConfig);
    console.log('ARRAY ROW CLIENTE: ', row);
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
    this.clientesService.deleteClient(id);
    /* this.notificationService.warn('! Deleted successfully'); */
    }

   }

}


