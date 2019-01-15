import { Component, OnInit } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


export interface BitCodCli {
  codigo: string;
  name: string;
}

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal-bitacora',
  templateUrl: './modal-bitacora.component.html',
  styleUrls: ['./modal-bitacora.component.scss']
})


export class ModalBitacoraComponent implements OnInit {

  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];


  // tslint:disable-next-line:member-ordering
  stateCtrl = new FormControl();
  // tslint:disable-next-line:member-ordering
  filteredStates: Observable<BitCodCli[]>;

  states: BitCodCli[] = [
    {
      codigo: '2.978M',
      name: 'Arkansas',
    },
    {
      codigo: '39.14M',
      name: 'California',

    },
    {
      codigo: '20.27M',
      name: 'Florida',

    },
    {
      codigo: '27.47M',
      name: 'Texas',
    }
  ];

  ngOnInit() {
  }

  private _filterStates(value: string): BitCodCli[] {
    const filterValue = value.toLowerCase();
    /* poner el valor de BitCodCli para filtrar */
    return this.states.filter(state => state.codigo.toLowerCase().indexOf(filterValue) === 0);
  }

}
