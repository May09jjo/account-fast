import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { CategoriaInterface } from '../../models/categorias';
import { CategoriasService } from '../../services/categorias.service';
import { AuthFireService } from '../../auth-fire.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['codigo', 'descripcion', 'fechaUpdate', 'padreId', 'actions'];
  categoriaInt: CategoriaInterface[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  public modeCategoria = '';

  constructor(private clientesService: CategoriasService,
        private dialog: MatDialog, public authFire: AuthFireService,
        activateRoute: ActivatedRoute, public router: Router) {
          this.modeCategoria = activateRoute.snapshot.params['mode'];
          console.log(this.modeCategoria);
           // override the route reuse strategy
         this.router.routeReuseStrategy.shouldReuseRoute = function() {
          return false; };

          this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
               // trick the Router into believing it's last link wasn't previously loaded
               this.router.navigated = false;
               // if you need to scroll back to top, here is the right place
               window.scrollTo(0, 0);
            }
        });
    }

  ngOnInit() {
        this.clientesService.getCategoriasPadres().subscribe(categoria => {
        this.categoriaInt = categoria;
        console.log(categoria);
        this.listData = new MatTableDataSource(this.categoriaInt);
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
    /* this.dialog.open(ModalCreateComponent, dialogConfig); */
  }

  onEdit(row) {
    this.clientesService.setCategoriaModal(row);
     const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (window.innerWidth > 992) {dialogConfig.width = '50%'; }
    /* this.dialog.open(ModalCreateComponent, dialogConfig); */
    console.log('ARRAY ROW CLIENTE: ', row);
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
    this.clientesService.deleteCategoria(id);
    }
   }
}
