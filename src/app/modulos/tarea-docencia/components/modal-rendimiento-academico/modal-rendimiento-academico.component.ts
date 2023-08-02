import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatosAsignatura } from '../../modelos/InformeFinal/DatosAsignatura';

function validarEntero(control: AbstractControl): { [key: string]: any } | null {
  if (control.value && !Number.isInteger(control.value)) {
    return { noEsEntero: true };
  }
  return null;
}

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
        <mat-error *ngIf="myForm.controls['asignatura'].hasError('required')"
          >Seleccione este campo</mat-error
        >
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
        <mat-error *ngIf="myForm.controls['estudiantesMatriculadosHombres'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['estudiantesMatriculadosHombres'].hasError('noEsEntero')"
          >Ingrese solo números enteros.</mat-error
        >
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
        <mat-error *ngIf="myForm.controls['estudiantesMatriculadosMujeres'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['estudiantesMatriculadosMujeres'].hasError('noEsEntero')"
          >Ingrese solo números enteros.</mat-error
        >
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Estudiantes Retirados (Hombres)"
          formControlName="estudiantesRetiradosHombres"
          name="estudiantesRetiradosHombres"
          required
        />
        <mat-error *ngIf="myForm.controls['estudiantesRetiradosHombres'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['estudiantesRetiradosHombres'].hasError('noEsEntero')"
          >Ingrese solo números enteros.</mat-error
        >
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
        <mat-error *ngIf="myForm.controls['estudiantesRetiradosMujeres'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['estudiantesRetiradosMujeres'].hasError('noEsEntero')"
          >Ingrese solo números enteros.</mat-error
        >
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
        <mat-error *ngIf="myForm.controls['estudiantesReprobadosHombres'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['estudiantesReprobadosHombres'].hasError('noEsEntero')"
          >Ingrese solo números enteros.</mat-error
        >
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
        <mat-error *ngIf="myForm.controls['estudiantesReprobadosMujeres'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['estudiantesReprobadosMujeres'].hasError('noEsEntero')"
          >Ingrese solo números enteros.</mat-error
        >
      </mat-form-field>
<!--
      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Estudiantes Aprobados (Hombres)"
          formControlName="estudiantesAprobadosHombres"
          name="estudiantesAprobadosHombres"
          required
        />
        <mat-error *ngIf="myForm.controls['estudiantesAprobadosHombres'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['estudiantesAprobadosHombres'].hasError('noEsEntero')"
          >Ingrese solo números enteros.</mat-error
        >
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
        <mat-error *ngIf="myForm.controls['estudiantesAprobadosMujeres'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['estudiantesAprobadosMujeres'].hasError('noEsEntero')"
          >Ingrese solo números enteros.</mat-error
        >
      </mat-form-field> -->

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
      estudiantesMatriculadosHombres: ['', [Validators.required,validarEntero],],
      estudiantesMatriculadosMujeres: ['', [Validators.required,validarEntero],],
      estudiantesRetiradosHombres: ['',[Validators.required,validarEntero],],
      estudiantesRetiradosMujeres: ['', [Validators.required,validarEntero],],
      estudiantesReprobadosHombres: ['', [Validators.required,validarEntero],],
      estudiantesReprobadosMujeres: ['', [Validators.required,validarEntero],],
      // estudiantesAprobadosHombres: ['', [Validators.required,validarEntero],],
      // estudiantesAprobadosMujeres: ['', [Validators.required,validarEntero],],
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
