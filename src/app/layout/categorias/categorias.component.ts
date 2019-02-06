import { Component, OnInit, ViewChild , OnDestroy} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { CategoriaInterface } from '../../models/categorias';
import { CategoriasService } from '../../services/categorias.service';
import { AuthFireService } from '../../auth-fire.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalCreateCategoriaComponent } from './modal-create-categoria/modal-create-categoria.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit , OnDestroy {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['codigo', 'descripcion', 'fechaUpdate', 'actions'];
  categoriaPadres: CategoriaInterface[];
  grupoList: CategoriaInterface [];
  userControl = new FormControl('', [Validators.required]);
  categoriasHijas: CategoriaInterface[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  public modeCategoria = '';
  public padreIdModal = '';
  /* Listar Categorias input*/
  grupo: any;


  destroySubject$: Subject<void> = new Subject();

  constructor(private categoriaService: CategoriasService,
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
          /* le paso el id del padre select en subgrupo y luego lo paso por set al modal */
          this.padreIdModal = padres.id;
          this.categoriaService.getSubgruposForIdPadre(padres.id).pipe(takeUntil(this.destroySubject$)).subscribe(hijos => {
              this.categoriasHijas = hijos;
              console.log('HIJOS :' + hijos);
              this.listData = new MatTableDataSource(this.categoriasHijas);
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;
            }
          );
        });

      }/* end else */
    }

    ngOnDestroy() {
      this.destroySubject$.next();
/*       this.listData = null;
      this.categoriaPadres = null;
      this.categoriasHijas = null;
      this.grupoList = null; */
    }

    getCategorias() {
        this.categoriaService.getCategoriasPadres().pipe(takeUntil(this.destroySubject$)).subscribe(categoria => {
        this.categoriaPadres = categoria;
        console.log('PADRES :' + categoria);
        this.listData = new MatTableDataSource(this.categoriaPadres);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
    }

    getCategoriasParaHijos() {
     this.categoriaService.getGruposForSelect().pipe(takeUntil(this.destroySubject$)).subscribe(categoria => {
        this.grupoList = categoria;
        console.log('select father');

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
    this.categoriaService.initializeFormGroup();
    /* si es subgrupo le paso el padreId de la select */
    if (this.modeCategoria === 'subgrupos') {
      this.categoriaService.setPadreidModal(this.padreIdModal);
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {mode: this.modeCategoria};
    if (window.innerWidth > 992) {dialogConfig.width = '50%'; }
    this.dialog.open(ModalCreateCategoriaComponent, dialogConfig);
  }

  onEdit(row) {
    this.categoriaService.setCategoriaModal(row);
     const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {mode: this.modeCategoria};
    if (window.innerWidth > 992) {dialogConfig.width = '50%'; }
    this.dialog.open(ModalCreateCategoriaComponent, dialogConfig);
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
    this.categoriaService.deleteCategoria(id);
    }
   }
}
