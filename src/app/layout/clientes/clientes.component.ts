import { Clientes } from './../../models/clientes';
import { ClientesService } from './../../services/clientes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthFireService } from '../../auth-fire.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { forEach } from '@angular/router/src/utils/collection';
import { ValueTransformer } from '@angular/compiler/src/util';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {


  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['codigo', 'fullName', 'cedula', 'email', 'mobile', 'city', 'departmentName', 'actions'];
  clients: Clientes[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private clientesService: ClientesService) {}

  ngOnInit() {
      this.clientesService.getClientes().subscribe(clients => {
          this.clients = clients;
        this.listData = new MatTableDataSource(this.clients);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };

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
   /*  this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
 */  }

  onEdit(row) {
/*     this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent,dialogConfig); */
  }

  onDelete($key) {
    /* if(confirm('Are you sure to delete this record ?')){
    this.service.deleteEmployee($key);
    this.notificationService.warn('! Deleted successfully');
    }
 */  }

}


