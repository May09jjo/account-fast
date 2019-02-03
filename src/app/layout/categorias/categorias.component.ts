import { Component, OnInit, ViewChild , OnDestroy} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { CategoriaInterface } from '../../models/categorias';
import { CategoriasService } from '../../services/categorias.service';
import { AuthFireService } from '../../auth-fire.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit , OnDestroy {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['codigo', 'descripcion', 'fechaUpdate', 'actions'];
  categoriaInt: CategoriaInterface[];
  grupoList: CategoriaInterface [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  public modeCategoria = '';
  public onCategoria = true;
  /* Listar Categorias input*/
  userControl = new FormControl('', [Validators.required]);
  grupo: any;


  destroySubject$: Subject<void> = new Subject();

  constructor(private clientesService: CategoriasService,
        private dialog: MatDialog, public authFire: AuthFireService,
        activateRoute: ActivatedRoute, public router: Router) {
          this.modeCategoria = activateRoute.snapshot.params['mode'];
          console.log(this.modeCategoria);

          this.router.routeReuseStrategy.shouldReuseRoute = function() {
          return false; };
          this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
               this.router.navigated = false;
               window.scrollTo(0, 0);
              }

          });
  }

    ngOnInit() {
      if (this.modeCategoria === 'grupos') {
        this.getCategorias();
      } else {
        this.getCategoriasParaHijos();
        this.userControl.valueChanges.subscribe( padres => {
          this.clientesService.getCategoriasHijas(padres.id).pipe(takeUntil(this.destroySubject$)).subscribe(hijos => {
              this.categoriaInt = hijos;
              this.listData = new MatTableDataSource(this.categoriaInt);
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;
            }
          );
        });

      }/* end else */
    }

    ngOnDestroy() {
      this.destroySubject$.next();
    }

    getCategorias() {
        this.clientesService.getCategoriasPadres().pipe(takeUntil(this.destroySubject$)).subscribe(categoria => {
        this.categoriaInt = categoria;
        console.log('LISTA :' + categoria);
        this.listData = new MatTableDataSource(this.categoriaInt);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
    }

    getCategoriasHijas() {
      this.clientesService.getCategoriasHijas(this.modeCategoria).pipe(takeUntil(this.destroySubject$)).subscribe(categoria => {
        this.categoriaInt = categoria;
        console.log('LISTA :' + categoria);
        this.listData = new MatTableDataSource(this.categoriaInt);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
    }

    getCategoriasParaHijos() {
     this.clientesService.getCategoriasPadres().pipe(takeUntil(this.destroySubject$)).subscribe(categoria => {
        this.grupoList = categoria;
        console.log('entramos a subs');

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
