import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormacionAcademicaAdicional } from '../../modelos/FormacionAcademicaAdicional';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-formacion-academica',
  template: `
    <h2>Formulario</h2>
    <form [formGroup]="myForm" (ngSubmit)="submitForm()">
      <!-- Agrega los campos de tu formulario aquí -->
      <mat-form-field class="custom-form-field">
        <input
          matInput
          placeholder="Nivel de Instrucción"
          formControlName="nivelInstruccion"
          name="nivelInstruccion"
          class="custom-input"
          required
        />
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
        <input
          matInput
          type="text"
          placeholder="País"
          formControlName="pais"
          name="pais"
          required
        />
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
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="myForm.invalid"
      >
        Guardar
      </button>
      <button
        type="button"
        (click)="closeModal()"
        class="btn btn-outline-success btn-sm"
      >
        Cancelar
      </button>
    </form>
  `,
  styleUrls: ['./modal-formacion-academica.component.css'],
})
export class ModalFormacionAcademicaComponent implements OnInit {
  formacionAcademicaAdicional: FormacionAcademicaAdicional = {};
  myForm!: FormGroup;
  @Inject(MAT_DIALOG_DATA) public data: any

  constructor(
    public dialogRef: MatDialogRef<ModalFormacionAcademicaComponent>,
    private formBuilder: FormBuilder
  ) {}

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
  }

  submitForm() {
    const formValue = this.myForm.value;
    this.dialogRef.close(formValue);
  }

  closeModal() {
    this.dialogRef.close();
  }
}

// import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { FormacionAcademicaAdicional } from '../../modelos/FormacionAcademicaAdicional';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-modal-formacion-academica',
//   template: `
//     <h2>Formulario</h2>
//     <form [formGroup]="myForm" (ngSubmit)="submitForm()">
//       <!-- Agrega los campos de tu formulario aquí -->
//       <mat-form-field class="custom-form-field">
//         <input
//           matInput
//           placeholder="Nivel de Instrucción"
//           [(ngModel)]="formacionAcademicaAdicional.nivelInstruccion"
//           formControlName="nivelInstruccion"
//           name="nivelInstruccion"
//           class="custom-input"
//           required
//         />
//         <mat-error
//           *ngIf="myForm.controls['nivelInstruccion'].hasError('required')"
//           >Ingrese el nivel de Instrucción</mat-error
//         >
//       </mat-form-field>
//       <mat-form-field class="custom-form-field">
//         <input
//           matInput
//           type="text"
//           placeholder="Institución"
//           [(ngModel)]="formacionAcademicaAdicional.institucion"
//           formControlName="institucion"
//           name="institucion"
//           required
//         />
//       </mat-form-field>

//       <mat-form-field class="custom-form-field">
//         <input
//           matInput
//           type="text"
//           placeholder="Título Obtenido"
//           [(ngModel)]="formacionAcademicaAdicional.tituloObtenido"
//           formControlName="tituloObtenido"
//           name="tituloObtenido"
//           required
//         />
//       </mat-form-field>

//       <mat-form-field class="custom-form-field">
//         <input
//           matInput
//           type="text"
//           placeholder="Nº. SENESCYT"
//           [(ngModel)]="formacionAcademicaAdicional.numeroSenescyt"
//           formControlName="numeroSenescyt"
//           name="numeroSenescyt"
//           required
//         />
//       </mat-form-field>

//       <mat-form-field class="custom-form-field-medium">
//         <input
//           matInput
//           type="date"
//           placeholder="Fecha de Registro Senescyt"
//           [(ngModel)]="formacionAcademicaAdicional.fechaRegistroSenescyt"
//           formControlName="fechaRegistroSenescyt"
//           name="fechaRegistroSenescyt"
//           required
//         />
//       </mat-form-field>

//       <mat-form-field class="custom-form-field-medium">
//         <input
//           matInput
//           type="date"
//           placeholder="Fecha de Graduación"
//           [(ngModel)]="formacionAcademicaAdicional.fechaGraduacion"
//           formControlName="fechaGraduacion"
//           name="fechaGraduacion"
//           required
//         />
//       </mat-form-field>

//       <mat-form-field class="custom-form-field">
//         <input
//           matInput
//           type="text"
//           placeholder="País"
//           [(ngModel)]="formacionAcademicaAdicional.pais"
//           formControlName="pais"
//           name="pais"
//           required
//         />
//       </mat-form-field>

//       <mat-form-field class="custom-form-field">
//         <input
//           matInput
//           type="number"
//           placeholder="Tiempo de Estudio en Años"
//           [(ngModel)]="formacionAcademicaAdicional.tiempoEstudio"
//           formControlName="tiempoEstudio"
//           name="tiempoEstudio"
//           required
//         />
//       </mat-form-field>

//       <button
//         mat-raised-button
//         color="primary"
//         type="submit"
//         [disabled]="myForm.invalid"
//       >
//         Guardar
//       </button>
//       <button
//         type="button"
//         (click)="closeModal()"
//         class="btn btn-outline-success btn-sm"
//       >
//         Cancelar
//       </button>
//     </form>
//   `,
//   styleUrls: ['./modal-formacion-academica.component.css'],
// })
// export class ModalFormacionAcademicaComponent implements OnInit {
//   formacionAcademicaAdicional: FormacionAcademicaAdicional = {};
//   myForm!: FormGroup;
//   @Inject(MAT_DIALOG_DATA) public data: any

//   constructor(
//     public dialogRef: MatDialogRef<ModalFormacionAcademicaComponent>,
//     private formBuilder: FormBuilder
//   ) {}

//   ngOnInit() {
//     this.myForm = this.formBuilder.group({
//       nivelInstruccion: ['', Validators.required],
//       institucion: ['', Validators.required],
//       tituloObtenido: ['', Validators.required],
//       numeroSenescyt: ['', Validators.required],
//       fechaRegistroSenescyt: ['', Validators.required],
//       fechaGraduacion: ['', Validators.required],
//       pais: ['', Validators.required],
//       tiempoEstudio: ['', Validators.required],
//     });
//   }

//   submitForm() {
//     const formValue = this.myForm.value;
//     this.dialogRef.close(formValue);
//   }

//   closeModal() {
//     this.dialogRef.close();
//   }
// }
