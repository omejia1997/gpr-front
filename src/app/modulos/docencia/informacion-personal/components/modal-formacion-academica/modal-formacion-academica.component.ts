import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormacionAcademicaAdicional } from '../../modelos/FormacionAcademicaAdicional';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DocenteInformacionService } from '../../servicios/DocenteInformacion.service';

@Component({
  selector: 'app-modal-formacion-academica',
  template: `
    <!-- <h2>Formulario</h2> -->
    <form [formGroup]="myForm" (ngSubmit)="submitForm()" class="text-center">
      <mat-form-field class="custom-form-field">
        <mat-select placeholder="Nivel de Instrucción" formControlName="nivelInstruccion" name="nivelInstruccion">
          <mat-option *ngFor="let nivelInstruccion of comboNivelInstruccion" [value]="nivelInstruccion">
            {{ nivelInstruccion }}
          </mat-option>
        </mat-select>
        <mat-error
          *ngIf="myForm.controls['nivelInstruccion'].hasError('required')"
          >Ingrese el nivel de Instrucción</mat-error
        >
      </mat-form-field>
      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="Institución"
          formControlName="institucion"
          name="institucion"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="Título Obtenido"
          formControlName="tituloObtenido"
          name="tituloObtenido"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="Nº. SENESCYT"
          formControlName="numeroSenescyt"
          name="numeroSenescyt"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="date"
          placeholder="Fecha de Registro Senescyt"
          formControlName="fechaRegistroSenescyt"
          name="fechaRegistroSenescyt"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="date"
          placeholder="Fecha de Graduación"
          formControlName="fechaGraduacion"
          name="fechaGraduacion"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field">
        <mat-select placeholder="País" formControlName="pais" name="pais">
          <mat-option *ngFor="let pais of paises" [value]="pais">
            {{ pais }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="number"
          placeholder="Tiempo de Estudio en Años"
          formControlName="tiempoEstudio"
          name="tiempoEstudio"
          required
        />
      </mat-form-field>

      <button
        type="submit"
        class="btn btn-success btn-sm"
        [disabled]="myForm.invalid"
      >
        Guardar
      </button>
      <button
        type="button"
        (click)="closeModal()"
        class="btn btn-outline-danger btn-sm"
      >
        Cancelar
      </button>
    </form>
  `,
  styleUrls: ['./modal-formacion-academica.component.css'],
})
export class ModalFormacionAcademicaComponent implements OnInit {
  myForm!: FormGroup;
  paises$: Observable<any>;
  paises: string[] = [];
  comboNivelInstruccion: string[] = [
    'BACHILLERATO',
    'CUARTO NIVEL - DIPLOMADO',
    'CUARTO NIVEL - ESPECIALIDAD',
    'CUARTO NIVEL - MAESTRIA',
    'CUARTO NIVEL-DOCTORADO',
    'EDUCACIÓN BÁSICA',
    'ESTUDIANTE UNIVERSITARIO',
    'PRIMARIA',
    'SECUNDARIA',
    'SIN INSTRUCCIÓN',
    'TÉCNICO SUPERIOR',
    'TECNOLOGÍA',
    'TERCER NIVEL',
  ];


  constructor(
    public dialogRef: MatDialogRef<ModalFormacionAcademicaComponent>,
    private formBuilder: FormBuilder,
    private docenteInformacionService: DocenteInformacionService,
    @Inject(MAT_DIALOG_DATA) public formacionAcademica: FormacionAcademicaAdicional
  ) {
    this.paises$ = this.docenteInformacionService.loadPaises();
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      nivelInstruccion: ['', Validators.required],
      institucion: ['', Validators.required],
      tituloObtenido: ['', Validators.required],
      numeroSenescyt: ['', Validators.required],
      fechaRegistroSenescyt: ['', Validators.required],
      fechaGraduacion: ['', Validators.required],
      pais: ['', Validators.required],
      tiempoEstudio: ['', Validators.required],
    });
    if(this.formacionAcademica){
      this.myForm.patchValue({
        nivelInstruccion: this.formacionAcademica.nivelInstruccion,
        institucion: this.formacionAcademica.institucion,
        tituloObtenido: this.formacionAcademica.tituloObtenido,
        numeroSenescyt: this.formacionAcademica.numeroSenescyt,
        fechaRegistroSenescyt: this.formacionAcademica.fechaRegistroSenescyt,
        fechaGraduacion: this.formacionAcademica.fechaGraduacion,
        pais: this.formacionAcademica.pais,
        tiempoEstudio: this.formacionAcademica.tiempoEstudio
      });
    }
    this.cargarPaises();
  }

  cargarPaises() {
    this.paises$.subscribe((data) => {
      this.paises = data.paises;
    console.log(this.paises)

    });
  }

  submitForm() {
    const formValue = this.myForm.value;
    this.dialogRef.close(formValue);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
