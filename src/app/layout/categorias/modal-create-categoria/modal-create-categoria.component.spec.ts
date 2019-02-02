import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateCategoriaComponent } from './modal-create-categoria.component';

describe('ModalCreateCategoriaComponent', () => {
  let component: ModalCreateCategoriaComponent;
  let fixture: ComponentFixture<ModalCreateCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
