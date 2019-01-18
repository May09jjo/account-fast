import { ModalBitacoraComponent } from './modal-bitacora/modal-bitacora.component';
import { ClientesInterface } from 'src/app/models/clientes';
import { ClientesService } from '../../services/clientes.service';
import { BitacoraInterface } from './../../models/bitacora';
import { Perfil } from './../../models/perfil';
import { PerfilService } from './../../perfil.service';
import { AuthFireService } from 'src/app/auth-fire.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { ModalCreateComponent } from '../clientes/modal-create/modal-create.component';
import { BitacoraService } from '../../services/bitacora.service';
import { auth } from 'firebase';
import { trigger, style, state, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BitacoraComponent implements OnInit {

  public cliName: string;
  public userName: string;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['tipoContacto', 'fecha', 'asunto', 'actions'];

  clientsInt: ClientesInterface[];
  bitacoraInt: BitacoraInterface[];
  userIntList: Perfil[];
  userList: Observable<Perfil>;
  expandedElement: ClientesInterface | null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  stateCtrl = new FormControl('', [Validators.required]);
  filteredStates: Observable<ClientesInterface[]>;

  /* form control para usuarios */
  userControl = new FormControl('', [Validators.required]);
  usertest: any;

  constructor(private clientesService: ClientesService,
        private dialog: MatDialog, public aut: AuthFireService, public userService: PerfilService,
        public bitacoraService: BitacoraService) {
          this.filtrarclientforUser();
          this.userControl.valueChanges.subscribe( user => {
            console.log('POR VALUE CHANGES' + user.id);
            this.resetBitacora();
            this.clientesService.getClientesforUser(user.id).subscribe(
              client => {
                this.clientsInt = client;
                this.filteredStates = this.stateCtrl.valueChanges
                .pipe(
                  startWith(''),
                  map(filtroClient => filtroClient ? this._filterStates(filtroClient) : this.clientsInt.slice())
                );
              }
            );
          });
        }

  ngOnInit() {
      this.resetBitacora();
    }

    private _filterStates(value: string): ClientesInterface[] {
      const filterValue = value.toLowerCase();
      return this.clientsInt.filter(filtroClient => filtroClient.codigo.toLowerCase().indexOf(filterValue) === 0);
    }

  public selectionChange(item) {
      this.cliName = item.fullName;
      this.getBitacoraforCliente(item.id);
          /* this.cliName = item.fullName;
          if (item.idUser) {
          console.log('USER :' + item.idUser);
          this.userService.getNameforId(item.idUser).subscribe(
            users => {
              this.userName = users.firstName;
              console.log(this.userName);
              this.getBitacoraforCliente(item.id);
            }
          );
          } else {
            console.log('No tiene dueños');
            this.userName = 'No tiene dueño';
          } */

          console.log('select cliente' + item.fullName);
        }

  resetBitacora() {
      this.bitacoraInt = [];
      this.listData = new MatTableDataSource(this.bitacoraInt);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      console.log('resetBitacora');
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
    this.dialog.open(ModalBitacoraComponent, dialogConfig);
  }

  onEdit(row) {
    this.clientesService.setClienteModal(row);
     const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (window.innerWidth > 992) {dialogConfig.width = '50%'; }
    this.dialog.open(ModalBitacoraComponent, dialogConfig);
    console.log('ARRAY ROW CLIENTE: ', row);
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
    this.clientesService.deleteClient(id);
    }

   }

   filtrarclientforUser() {
    this.userService.getUser().subscribe(users => {
      this.userIntList = users;
      console.log('LIST DE USUARIOS' + this.userIntList);

    });
   }


}
