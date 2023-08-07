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

      <div>
        <h2 style="display: inline-block;font-size:15px">ASIGNATURA:</h2><span style="font-size:15px">{{datosAsignatura.asignatura}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h2 style="display: inline-block;font-size:15px">NRC:</h2><span style="font-size:15px">{{datosAsignatura.nrc}}</span>
      </div>

      <mat-form-field class="custom-form-field" *ngIf="false">
        <input
          matInput
          type="text"
          placeholder="Asignatura"
          formControlName="asignatura"
          name="asignatura"
          required

        />
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


  constructor(
    public dialogRef: MatDialogRef<ModalRendimientoAcademicoComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public datosAsignatura: DatosAsignatura
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
    });
    if(this.datosAsignatura){
      this.myForm.patchValue({
        asignatura: this.datosAsignatura,
        estudiantesMatriculadosHombres: this.datosAsignatura.estudiantesMatriculados?.numeroHombres,
        estudiantesMatriculadosMujeres: this.datosAsignatura.estudiantesMatriculados?.numeroMujeres,
        estudiantesRetiradosHombres: this.datosAsignatura.estudiantesRetirados?.numeroHombres,
        estudiantesRetiradosMujeres: this.datosAsignatura.estudiantesRetirados?.numeroMujeres,
        estudiantesReprobadosHombres: this.datosAsignatura.estudiantesReprobados?.numeroHombres,
        estudiantesReprobadosMujeres: this.datosAsignatura.estudiantesReprobados?.numeroMujeres
      });
    }
  }


  submitForm() {
    const formValue = this.myForm.value;
    this.dialogRef.close(formValue);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
