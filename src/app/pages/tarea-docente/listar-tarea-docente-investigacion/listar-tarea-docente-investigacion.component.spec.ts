/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { RouterTestingModule } from '@angular/router/testing';
import { ListarTareaDocenteInvestigacionComponent } from './listar-tarea-docente-investigacion.component';

describe('ListarTareaDocenteInvestigacionComponent', () => {
  let component: ListarTareaDocenteInvestigacionComponent;
  let fixture: ComponentFixture<ListarTareaDocenteInvestigacionComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTareaDocenteInvestigacionComponent ],
      imports: [ ReactiveFormsModule,HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTareaDocenteInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
