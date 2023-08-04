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
  selector: 'app-modal-promedio-academico',
  template: `
    <!-- <h2>Formulario</h2> -->
    <form [formGroup]="myForm" (ngSubmit)="submitForm()" class="text-center">

      <!-- <mat-form-field class="custom-form-field">
          <mat-select placeholder="NRC" formControlName="asignatura" name="asignatura">
            <mat-option *ngFor="let asignatura of datosAsignatura" [value]="asignatura">
              {{ asignatura.nrc  }} - - - - {{ asignatura.asignatura  }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="myForm.controls['asignatura'].hasError('required')"
          >Selecciona este campo</mat-error
        >
      </mat-form-field> -->
      <h2 style="display: inline-block;font-size:15px">ASIGNATURA:</h2><span style="font-size:15px">{{datosAsignatura.asignatura}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <h2 style="display: inline-block;font-size:15px">NRC:</h2><span style="font-size:15px">{{datosAsignatura.nrc}}</span>

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
          placeholder="# estudiantes promedio menor 14 I-UD"
          formControlName="tutoriaEstudiantesPromedioMenor14IUD"
          name="tutoriaEstudiantesPromedioMenor14IUD"
          required
        />
        <mat-error *ngIf="myForm.controls['tutoriaEstudiantesPromedioMenor14IUD'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['tutoriaEstudiantesPromedioMenor14IUD'].hasError('noEsEntero')"
          >Ingrese solo números enteros.</mat-error
        >
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="# estudiantes promedio menor 14 II-UD"
          formControlName="tutoriaEstudiantesPromedioMenor14IIUD"
          name="tutoriaEstudiantesPromedioMenor14IIUD"
          required
        />
        <mat-error *ngIf="myForm.controls['tutoriaEstudiantesPromedioMenor14IIUD'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['tutoriaEstudiantesPromedioMenor14IIUD'].hasError('noEsEntero')"
          >Ingrese solo números enteros.</mat-error
        >
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="# estudiantes promedio menor 14 III-UD"
          formControlName="tutoriaEstudiantesPromedioMenor14IIIUD"
          name="tutoriaEstudiantesPromedioMenor14IIIUD"
          required
        />
        <mat-error *ngIf="myForm.controls['tutoriaEstudiantesPromedioMenor14IIIUD'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['tutoriaEstudiantesPromedioMenor14IIIUD'].hasError('noEsEntero')"
          >Ingrese solo números enteros.</mat-error
        >
      </mat-form-field>
      <br>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="# estudiantes promedio menor 14 asistieron tutorías I-UD"
          formControlName="tutoriaEstudiantesPromedioMenor14AsistieronIUD"
          name="tutoriaEstudiantesPromedioMenor14AsistieronIUD"
          required
        />
        <mat-error *ngIf="myForm.controls['tutoriaEstudiantesPromedioMenor14AsistieronIUD'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['tutoriaEstudiantesPromedioMenor14AsistieronIUD'].hasError('noEsEntero')"
          >Ingrese solo números enteros.</mat-error
        >
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="# estudiantes promedio menor 14 asistieron tutorías II-UD"
          formControlName="tutoriaEstudiantesPromedioMenor14AsistieronIIUD"
          name="tutoriaEstudiantesPromedioMenor14AsistieronIIUD"
          required
        />
        <mat-error *ngIf="myForm.controls['tutoriaEstudiantesPromedioMenor14AsistieronIIUD'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['tutoriaEstudiantesPromedioMenor14AsistieronIIUD'].hasError('noEsEntero')"
          >Ingrese solo números enteros.</mat-error
        >
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="# estudiantes promedio menor 14 asistieron tutorías III-UD"
          formControlName="tutoriaEstudiantesPromedioMenor14AsistieronIIIUD"
          name="tutoriaEstudiantesPromedioMenor14AsistieronIIIUD"
          required
        />
        <mat-error *ngIf="myForm.controls['tutoriaEstudiantesPromedioMenor14AsistieronIIIUD'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['tutoriaEstudiantesPromedioMenor14AsistieronIIIUD'].hasError('noEsEntero')"
          >Ingrese solo números enteros.</mat-error
        >
      </mat-form-field>
      <br>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="# estudiantes promedio menor 14 asistieron tutorías y NO aprobaron"
          formControlName="tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron"
          name="tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron"
          required
        />
        <mat-error *ngIf="myForm.controls['tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron'].hasError('noEsEntero')"
          >Ingrese solo números enteros.</mat-error
        >
      </mat-form-field>
    <br>
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
  styleUrls: ['./modal-tutoria.component.css'],
})
export class ModalTutoriaComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalTutoriaComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public datosAsignatura: DatosAsignatura
  ) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      asignatura: ['', Validators.required],
      tutoriaEstudiantesPromedioMenor14IUD: ['', [Validators.required,validarEntero],],
      tutoriaEstudiantesPromedioMenor14IIUD: ['', [Validators.required,validarEntero],],
      tutoriaEstudiantesPromedioMenor14IIIUD: ['', [Validators.required,validarEntero],],
      tutoriaEstudiantesPromedioMenor14AsistieronIUD: ['',  [Validators.required,validarEntero],],
      tutoriaEstudiantesPromedioMenor14AsistieronIIUD: ['',  [Validators.required,validarEntero],],
      tutoriaEstudiantesPromedioMenor14AsistieronIIIUD: ['',  [Validators.required,validarEntero],],
      tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron: ['',  [Validators.required,validarEntero],]
    });
    if(this.datosAsignatura){

      this.myForm.patchValue({
        asignatura: this.datosAsignatura,
        tutoriaEstudiantesPromedioMenor14IUD: this.datosAsignatura.tutoriaEstudiantesPromedioMenor14?.primerParcial,
        tutoriaEstudiantesPromedioMenor14IIUD: this.datosAsignatura.tutoriaEstudiantesPromedioMenor14?.segundoParcial,
        tutoriaEstudiantesPromedioMenor14IIIUD: this.datosAsignatura.tutoriaEstudiantesPromedioMenor14?.tercerParcial,
        tutoriaEstudiantesPromedioMenor14AsistieronIUD: this.datosAsignatura.tutoriaEstudiantesPromedioMenor14Asistieron?.primerParcial,
        tutoriaEstudiantesPromedioMenor14AsistieronIIUD: this.datosAsignatura.tutoriaEstudiantesPromedioMenor14Asistieron?.segundoParcial,
        tutoriaEstudiantesPromedioMenor14AsistieronIIIUD: this.datosAsignatura.tutoriaEstudiantesPromedioMenor14Asistieron?.tercerParcial,
        tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron: this.datosAsignatura.tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron
      });
    }
  }

  validarDosDecimales(control: any): { dosDecimales: boolean } | null {
    const DECIMAL_REGEX = /^\d+(\.\d{1,2})?$/; // Expresión regular para verificar dos decimales.
    if (!DECIMAL_REGEX.test(control.value)) {
      return { dosDecimales: true }; // Retorna un objeto con una propiedad para identificar el error.
    }
    return null; // Si pasa la validación, retorna null.
  }


  submitForm() {
    const formValue = this.myForm.value;
    this.dialogRef.close(formValue);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
