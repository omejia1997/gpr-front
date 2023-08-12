/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListarTareaDocenteInvestigacionComponent } from './listar-tarea-docente-investigacion.component';

describe('ListarTareaDocenteInvestigacionComponent', () => {
  let component: ListarTareaDocenteInvestigacionComponent;
  let fixture: ComponentFixture<ListarTareaDocenteInvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTareaDocenteInvestigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTareaDocenteInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
