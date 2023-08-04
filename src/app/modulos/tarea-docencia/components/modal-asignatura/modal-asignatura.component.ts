import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatosAsignatura } from '../../modelos/InformeFinal/DatosAsignatura';

@Component({
  selector: 'app-modal-asignatura',
  template: `
    <!-- <h2>Formulario</h2> -->
    <form [formGroup]="myForm" (ngSubmit)="submitForm()" class="text-center">
      <mat-form-field class="custom-form-field-medium">
        <mat-select placeholder="CARRERA" formControlName="carrera" name="carrera">
          <mat-option *ngFor="let carrera of comboCarrera" [value]="carrera">
            {{ carrera }}
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
          type="text"
          placeholder="ASIGNATURA"
          formControlName="asignatura"
          name="asignatura"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="text"
          placeholder="COMPONENTE DOCENCIA/PRACTICO"
          formControlName="componente"
          name="componente"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="text"
          placeholder="NRC"
          formControlName="nrc"
          name="nrc"
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
  styleUrls: ['./modal-asignatura.component.css'],
})
export class ModalAsignaturaComponent implements OnInit {
  myForm!: FormGroup;
  paises: string[] = [];
  comboCarrera: string[] = [
    'MECÁNICA',
    'MECATRÓNICA'
  ];


  constructor(
    public dialogRef: MatDialogRef<ModalAsignaturaComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public datosAsignatura: DatosAsignatura
  ) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      carrera: ['', Validators.required],
      asignatura: ['', Validators.required],
      componente: ['', Validators.required],
      nrc: ['', Validators.required],
    });
    if(this.datosAsignatura){
      this.myForm.patchValue({
        carrera: this.datosAsignatura.carrera,
        asignatura: this.datosAsignatura.asignatura,
        componente: this.datosAsignatura.componente,
        nrc: this.datosAsignatura.nrc
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
