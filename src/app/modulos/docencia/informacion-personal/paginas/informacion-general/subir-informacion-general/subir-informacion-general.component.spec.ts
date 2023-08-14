import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { RouterTestingModule } from '@angular/router/testing';

import { SubirInformacionGeneralComponent } from './subir-informacion-general.component';
import { MessageService } from 'primeng/api';
import { MatDialogModule } from '@angular/material/dialog';

describe('SubirInformacionGeneralComponent', () => {
  let component: SubirInformacionGeneralComponent;
  let fixture: ComponentFixture<SubirInformacionGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubirInformacionGeneralComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        FormsModule
      ],
      providers: [MessageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirInformacionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
