import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { ClientesService } from 'src/app/services/clientes.service';
import { ClientesInterface } from 'src/app/models/clientes';
import { ModalCreateComponent } from '../clientes/modal-create/modal-create.component';


@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss']
})
export class BitacoraComponent implements OnInit {

  public cliName: string;
  public userName: string;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['codigo', 'fullName', 'cedula', 'email', 'mobile', 'city', 'departmentName', 'actions'];
  clientsInt: ClientesInterface[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private clientesService: ClientesService,
        private dialog: MatDialog) {

        }

        stateCtrl = new FormControl();
        // tslint:disable-next-line:member-ordering
        filteredStates: Observable<ClientesInterface[]>;


  ngOnInit() {
      this.clientesService.getClientes().subscribe(clients => {
        this.clientsInt = clients;
        this.listData = new MatTableDataSource(this.clientsInt);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

        this.filteredStates = this.stateCtrl.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this._filterStates(state) : this.clientsInt.slice())
        );
      });
    }

    private _filterStates(value: string): ClientesInterface[] {
      const filterValue = value.toLowerCase();
      /* poner el valor de BitCodCli para filtrar */
      return this.clientsInt.filter(state => state.codigo.toLowerCase().indexOf(filterValue) === 0);
    }

    public selectionChange(item) {
          this.cliName = item.fullName;
          this.userName = item.idUser;
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
