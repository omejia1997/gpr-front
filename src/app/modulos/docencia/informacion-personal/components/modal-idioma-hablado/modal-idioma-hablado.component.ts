import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocenteInformacionService } from '../../servicios/DocenteInformacion.service';
import { Idioma } from '../../modelos/Idioma';

@Component({
  selector: 'app-modal-idioma-hablado',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="submitForm()" class="text-center">
      <mat-form-field class="custom-form-field">
        <mat-select placeholder="Idioma" formControlName="idioma" name="idioma">
          <mat-option *ngFor="let idioma of idiomas" [value]="idioma">
            {{ idioma }}
          </mat-option>
        </mat-select>
        <mat-error *ngIf="myForm.controls['idioma'].hasError('required')"
          >Seleccione un idioma</mat-error
        >
      </mat-form-field>
      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="number"
          placeholder="Hablado %"
          formControlName="porcentajeHablado"
          name="porcentajeHablado"
          required
        />
        <mat-error *ngIf="myForm.controls['porcentajeHablado'].hasError('required')"
          >Ingrese un porcentaje</mat-error
        >
        <mat-error *ngIf="myForm.controls['porcentajeHablado'].hasError('min')"
          >El valor mínimo permitido es 0.</mat-error
        >
        <mat-error *ngIf="myForm.controls['porcentajeHablado'].hasError('max')"
          >El valor máximo permitido es 100.</mat-error
        >
      </mat-form-field>


      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="number"
          placeholder="Escrito %"
          formControlName="porcentajeEscrito"
          name="porcentajeEscrito"
          required
        />
        <mat-error *ngIf="myForm.controls['porcentajeEscrito'].hasError('required')"
          >Ingrese un porcentaje</mat-error
        >
        <mat-error *ngIf="myForm.controls['porcentajeEscrito'].hasError('min')"
          >El valor mínimo permitido es 0.</mat-error
        >
        <mat-error *ngIf="myForm.controls['porcentajeEscrito'].hasError('max')"
          >El valor máximo permitido es 100.</mat-error
        >
      </mat-form-field>

      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="number"
          placeholder="Comprensión %"
          formControlName="porcentajeComprension"
          name="porcentajeComprension"
          required
        />
        <mat-error *ngIf="myForm.controls['porcentajeComprension'].hasError('required')"
          >Ingrese un porcentaje</mat-error
        >
        <mat-error *ngIf="myForm.controls['porcentajeComprension'].hasError('min')"
          >El valor mínimo permitido es 0.</mat-error
        >
        <mat-error *ngIf="myForm.controls['porcentajeComprension'].hasError('max')"
          >El valor máximo permitido es 100.</mat-error
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
  styleUrls: ['./modal-idioma-hablado.component.css'],
})
export class ModalIdiomaHabladoComponent implements OnInit {
  myForm!: FormGroup;
  idiomas$: Observable<any>;
  idiomas: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalIdiomaHabladoComponent>,
    private formBuilder: FormBuilder,
    private docenteInformacionService: DocenteInformacionService,
    @Inject(MAT_DIALOG_DATA) public idioma: Idioma
  ) {
    this.idiomas$ = this.docenteInformacionService.loadIdiomas();
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      idioma: ['', Validators.required],
      porcentajeHablado: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      porcentajeEscrito: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      porcentajeComprension: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
    if(this.idioma){
      this.myForm.patchValue({
        idioma: this.idioma.idioma,
        porcentajeHablado: this.idioma.porcentajeHablado,
        porcentajeEscrito: this.idioma.porcentajeEscrito,
        porcentajeComprension: this.idioma.porcentajeComprension
      });
    }
    this.cargarIdiomas();
  }

  submitForm() {
    const formValue = this.myForm.value;
    this.dialogRef.close(formValue);
  }

  cargarIdiomas() {
    this.idiomas$.subscribe((data) => {
      this.idiomas = data.idiomas;
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
