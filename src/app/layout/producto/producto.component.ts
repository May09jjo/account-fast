
import { AuthFireService } from './../../auth-fire.service';
import { CategoriasService } from './../../services/categorias.service';
import { ProductoInterface } from './../../models/producto';
import { CategoriaInterface } from './../../models/categorias';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
   animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductoComponent implements OnInit, OnDestroy{

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['codigo', 'descripcion', 'fechaUpdate', 'actions'];

  /* producto */
  productoInt: ProductoInterface[];
  expandedElement: CategoriaInterface | null;

  /* grupos */
  grupoIntList: CategoriaInterface[];
  grupoControl = new FormControl('', [Validators.required]);
  public Idgrupo: string;
  /* subgrupos */
  subgrupoIntList: CategoriaInterface[];
  subgrupoControl = new FormControl('', [Validators.required]);
  public IdSubgrupo: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  stateCtrl = new FormControl('', [Validators.required]);
  filteredStates: Observable<CategoriaInterface[]>;
  /* crear bitacora */
  crearProd = false;

  destroySubjectProd: Subject<void> = new Subject();
  constructor(private categoriaService: CategoriasService,
        private dialog: MatDialog, public aut: AuthFireService,
        public productoService: ProductoService) {

          this.getGroupsforSelect();
          this.grupoControl.valueChanges.pipe(takeUntil(this.destroySubjectProd)).subscribe( grupo => {
            console.log('POR VALUE CHANGES' + grupo.id);
            this.Idgrupo = grupo.id;
            this.crearProd = true;
            this.resetProducto();
            this.categoriaService.getSubgruposForProd(grupo.id).pipe(takeUntil(this.destroySubjectProd)).subscribe(
              subgrupo => {
                this.subgrupoIntList = subgrupo;
                this.subgrupoControl.valueChanges.pipe(takeUntil(this.destroySubjectProd)).subscribe( subgrupochange => {
                  console.log('POR VALUE CHANGES' + subgrupochange.id);
                  this.IdSubgrupo = subgrupochange.id;
                  this.getProductoofselect(this.IdSubgrupo);
                });
              }
            );
          });
        }

  ngOnInit() {
      this.resetProducto();
    }

  ngOnDestroy() {
      this.destroySubjectProd.next();
  }

  resetProducto() {
      this.productoInt = [];
      this.listData = new MatTableDataSource(this.productoInt);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      console.log('resetProducto');
  }

  getProductoofselect (subgrupoid): void {
        this.productoService.getProductoforSubgrupo(subgrupoid).pipe(takeUntil(this.destroySubjectProd)).subscribe(producto => {
        this.productoInt = producto;
        /* producto.map(vit => {
          const da = new Date (vit.fecha.seconds * 1000);
          const daefec = new Date (vit.fechaEfectiva.seconds * 1000);
          console.log(da.getDate());
          vit.fecha = da;
          vit.fechaEfectiva = daefec;
        });
 */      console.log(producto);
        this.listData = new MatTableDataSource(this.productoInt);
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
    this.productoService.initializeFormGroup();
    this.productoService.setPerteneceProd(this.IdSubgrupo);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {mode: this.Idgrupo};
    if (window.innerWidth > 992) {dialogConfig.width = '50%'; }
    this.dialog.open(ModalProductoComponent, dialogConfig);
    console.log('ARRAY ROW BITACORA: ', this.IdSubgrupo);
  }

  onEdit(row) {
    this.productoService.setProductoModal(row);
     const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {mode: this.Idgrupo};
    if (window.innerWidth > 992) {dialogConfig.width = '50%'; }
    this.dialog.open(ModalProductoComponent, dialogConfig);
    console.log('ARRAY ROW CLIENTE: ', row);
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
    this.productoService.deleteProducto(id);
    }
   }

   getGroupsforSelect() {
    this.categoriaService.getGrupoForProd().pipe(takeUntil(this.destroySubjectProd)).subscribe(grupos => {
      this.grupoIntList = grupos;
      console.log('LIST DE GRUPOS' + this.grupoIntList);
    });
   }

/*    modeAgregarBit (clientidUser , idUser): void {
      if (clientidUser === idUser) {
          this.crearProd = true;
      } else {
        this.crearProd = false;
      }
   } */
}
