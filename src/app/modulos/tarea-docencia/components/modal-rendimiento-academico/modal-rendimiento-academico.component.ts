import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatosAsignatura } from '../../modelos/InformeFinal/DatosAsignatura';

@Component({
  selector: 'app-modal-rendimiento-academico',
  template: `
    <!-- <h2>Formulario</h2> -->
    <form [formGroup]="myForm" (ngSubmit)="submitForm()" class="text-center">

      <mat-form-field class="custom-form-field">
          <mat-select placeholder="NRC" formControlName="asignatura" name="asignatura">
            <mat-option *ngFor="let asignatura of datosAsignatura" [value]="asignatura">
              {{ asignatura.nrc  }} - - - - {{ asignatura.asignatura  }}
            </mat-option>
          </mat-select>
        <!-- <mat-error
          *ngIf="myForm.controls['carrera'].hasError('required')"
          >Seleccione una Carrera</mat-error
        > -->
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Estudiantes Matriculados (Hombres)"
          formControlName="estudiantesMatriculadosHombres"
          name="estudiantesMatriculadosHombres"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Estudiantes Matriculados (Mujeres)"
          formControlName="estudiantesMatriculadosMujeres"
          name="estudiantesMatriculadosMujeres"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Estudiantes Retirados (Hombres)"
          formControlName="estudiantesRetiradosHombres"
          name="estudiantesMatriculadosMujeres"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Estudiantes Retirados (Mujeres)"
          formControlName="estudiantesRetiradosMujeres"
          name="estudiantesRetiradosMujeres"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Estudiantes Reprobados (Hombres)"
          formControlName="estudiantesReprobadosHombres"
          name="estudiantesReprobadosHombres"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Estudiantes Reprobados (Mujeres)"
          formControlName="estudiantesReprobadosMujeres"
          name="estudiantesReprobadosMujeres"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Estudiantes Aprobados (Hombres)"
          formControlName="estudiantesAprobadosHombres"
          name="estudiantesAprobadosHombres"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Estudiantes Aprobados (Mujeres)"
          formControlName="estudiantesAprobadosMujeres"
          name="estudiantesAprobadosMujeres"
          required
        />
      </mat-form-field>

      <!-- <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Promedio de Rendimiento Académico I-UD"
          formControlName="promedioRendimientoAcademicoIUD"
          name="promedioRendimientoAcademicoIUD"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Promedio de Rendimiento Académico II-UD"
          formControlName="promedioRendimientoAcademicoIIUD"
          name="promedioRendimientoAcademicoIIUD"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Promedio de Rendimiento Académico III-UD"
          formControlName="promedioRendimientoAcademicoIIIUD"
          name="promedioRendimientoAcademicoIIIUD"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Desviación Estándar I-UD"
          formControlName="desviacionEstandarIUD"
          name="desviacionEstandarIUD"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Desviación Estándar II-UD"
          formControlName="desviacionEstandarIIUD"
          name="desviacionEstandarIIUD"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Desviación Estándar III-UD"
          formControlName="desviacionEstandarIIIUD"
          name="desviacionEstandarIIIUD"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Promedio final de Rendimiento Académico"
          formControlName="promedioFinalRendimientoAcademico"
          name="promedioFinalRendimientoAcademico"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Promedio final de desv. estándar"
          formControlName="promedioFinalDesviacionEstandar"
          name="promedioFinalDesviacionEstandar"
          required
        />
      </mat-form-field> -->

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
  styleUrls: ['./modal-rendimiento-academico.component.css'],
})
export class ModalRendimientoAcademicoComponent implements OnInit {
  myForm!: FormGroup;
  comboCarrera: string[] = [
    'MECÁNICA',
    'MECATRÓNICA'
  ];


  constructor(
    public dialogRef: MatDialogRef<ModalRendimientoAcademicoComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public datosAsignatura: DatosAsignatura[]
  ) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      asignatura: ['', Validators.required],
      estudiantesMatriculadosHombres: ['', Validators.required],
      estudiantesMatriculadosMujeres: ['', Validators.required],
      estudiantesRetiradosHombres: ['', Validators.required],
      estudiantesRetiradosMujeres: ['', Validators.required],
      estudiantesReprobadosHombres: ['', Validators.required],
      estudiantesReprobadosMujeres: ['', Validators.required],
      estudiantesAprobadosHombres: ['', Validators.required],
      estudiantesAprobadosMujeres: ['', Validators.required],
      // promedioRendimientoAcademicoIUD: ['', Validators.required],
      // promedioRendimientoAcademicoIIUD: ['', Validators.required],
      // promedioRendimientoAcademicoIIIUD: ['', Validators.required],
      // desviacionEstandarIUD: ['', Validators.required],
      // desviacionEstandarIIUD: ['', Validators.required],
      // desviacionEstandarIIIUD: ['', Validators.required],
      // promedioFinalRendimientoAcademico: ['', Validators.required],
      // promedioFinalDesviacionEstandar: ['', Validators.required]
    });
    // if(this.datosAsignatura){

    //   this.myForm.patchValue({
    //     nivelInstruccion: this.formacionAcademica.nivelInstruccion,
    //     institucion: this.formacionAcademica.institucion,
    //     tituloObtenido: this.formacionAcademica.tituloObtenido,
    //     numeroSenescyt: this.formacionAcademica.numeroSenescyt,
    //     fechaRegistroSenescyt: this.formacionAcademica.fechaRegistroSenescyt,
    //     fechaGraduacion: this.formacionAcademica.fechaGraduacion,
    //     pais: this.formacionAcademica.pais,
    //     tiempoEstudio: this.formacionAcademica.tiempoEstudio
    //   });
    // }
  }


  submitForm() {
    const formValue = this.myForm.value;
    this.dialogRef.close(formValue);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
