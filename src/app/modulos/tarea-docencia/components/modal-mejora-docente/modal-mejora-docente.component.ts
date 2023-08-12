import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TematicaCapacitacion } from '../../modelos/InformeFinal/TematicaCapacitacion';


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
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public tematicaCapacitacion: TematicaCapacitacion
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
    if(this.tematicaCapacitacion){
      this.myForm.patchValue({
        areaConocimiento: this.tematicaCapacitacion.areaConocimiento,
        tema1: this.tematicaCapacitacion.tema1,
        tema2: this.tematicaCapacitacion.tema2,
        tema3: this.tematicaCapacitacion.tema3,
        tema4: this.tematicaCapacitacion.tema4
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
