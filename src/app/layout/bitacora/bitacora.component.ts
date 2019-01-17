import { ClientesService } from '../../services/clientes.service';
import { BitacoraInterface } from './../../models/bitacora';
import { Perfil } from './../../models/perfil';
import { PerfilService } from './../../perfil.service';
import { AuthFireService } from 'src/app/auth-fire.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { ClientesInterface } from 'src/app/models/clientes';
import { ModalCreateComponent } from '../clientes/modal-create/modal-create.component';
import { BitacoraService } from '../../services/bitacora.service';


@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss']
})
export class BitacoraComponent implements OnInit {

  public cliName: string;
  public userName: string;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fecha', 'fechaEfectiva', 'tipoContacto', 'asunto', 'detalle', 'actions'];
  clientsInt: ClientesInterface[];
  bitacoraInt: BitacoraInterface[];
  userList: Observable<Perfil>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private clientesService: ClientesService,
        private dialog: MatDialog, public aut: AuthFireService, public user: PerfilService,
        public bitacoraService: BitacoraService) {
          this.clientesService.getClientes().subscribe(client => {
            this.clientsInt = client;
            this.filteredStates = this.stateCtrl.valueChanges
            .pipe(
              startWith(''),
              map(state => state ? this._filterStates(state) : this.clientsInt.slice())
            );
          });
        }

        stateCtrl = new FormControl();
        filteredStates: Observable<ClientesInterface[]>;


  ngOnInit() {
      this.bitacoraService.getBitacora().subscribe(bitacora => {
        this.bitacoraInt = bitacora;

        this.listData = new MatTableDataSource(this.bitacoraInt);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.filteredStates = this.stateCtrl.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this._filterStates(state) : this.clientsInt.slice())
        );
      });
      console.log('EJECUCIÓN  DE NG-ONINIT');
    }

    private _filterStates(value: string): ClientesInterface[] {
      const filterValue = value.toLowerCase();
      /* poner el valor de BitCodCli para filtrar */
      return this.clientsInt.filter(state => state.codigo.toLowerCase().indexOf(filterValue) === 0);
    }

    public selectionChange(item) {
          this.cliName = item.fullName;
          if (item.idUser) {
          console.log('USER :' + item.idUser);
          this.user.getNameforId(item.idUser).subscribe(
            users => {
              this.userName = users.firstName;
              console.log(this.userName);
              this.getBitacoraforCliente(item.id);
            }
          );
          } else {
            console.log('No tiene dueños');
            this.userName = 'No tiene dueño';
          }
        }

    getBitacoraforCliente (clienteid): void {
        this.bitacoraService.getBitacoraforCliente(clienteid).subscribe(bitacora => {
        this.bitacoraInt = bitacora;
        console.log(bitacora);
        this.listData = new MatTableDataSource(this.bitacoraInt);
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
