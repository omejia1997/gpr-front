import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatosAsignatura } from '../../modelos/DatosAsignatura';


@Component({
  selector: 'app-modal-mejora-docente',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="submitForm()" class="text-center">

      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="ÁREA DE CONOCIMIENTO"
          formControlName="areaConocimiento"
          name="areaConocimiento"
          required
        />
        <mat-error *ngIf="myForm.controls['areaConocimiento'].hasError('required')"
          >Ingrese este campo</mat-error
        >
      </mat-form-field>

      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="TEMA 1"
          formControlName="tema1"
          name="tema1"
          required
        />
        <mat-error *ngIf="myForm.controls['tema1'].hasError('required')"
          >Ingrese este campo</mat-error
        >
      </mat-form-field>

      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="TEMA 2"
          formControlName="tema2"
          name="tema2"
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="TEMA 3"
          formControlName="tema3"
          name="tema3"
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="TEMA 4"
          formControlName="tema4"
          name="tema4"
        />
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
  styleUrls: ['./modal-mejora-docente.component.css'],
})
export class ModalMejoraDocenteComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalMejoraDocenteComponent>,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      areaConocimiento: ['', [Validators.required],],
      tema1: ['', [Validators.required],],
      tema2: ['', ],
      tema3: ['', ],
      tema4: ['', ],
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
