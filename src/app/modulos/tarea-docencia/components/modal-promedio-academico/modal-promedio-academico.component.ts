import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatosAsignatura } from '../../modelos/DatosAsignatura';

@Component({
  selector: 'app-modal-promedio-academico',
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
          >Selecciona este campo</mat-error
        >
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Promedio de Rendimiento Académico I-UD"
          formControlName="promedioRendimientoAcademicoIUD"
          name="promedioRendimientoAcademicoIUD"
          required
        />
        <mat-error *ngIf="myForm.controls['promedioRendimientoAcademicoIUD'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['promedioRendimientoAcademicoIUD'].hasError('min')"
          >El valor mínimo permitido es 0.</mat-error
        >
        <mat-error *ngIf="myForm.controls['promedioRendimientoAcademicoIUD'].hasError('max')"
          >El valor máximo permitido es 20.</mat-error
        >
        <mat-error *ngIf="myForm.controls['promedioRendimientoAcademicoIUD'].hasError('dosDecimales')"
          >El valor debe tener dos decimales.</mat-error
        >
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
        <mat-error *ngIf="myForm.controls['promedioRendimientoAcademicoIIUD'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['promedioRendimientoAcademicoIIUD'].hasError('min')"
          >El valor mínimo permitido es 0.</mat-error
        >
        <mat-error *ngIf="myForm.controls['promedioRendimientoAcademicoIIUD'].hasError('max')"
          >El valor máximo permitido es 20.</mat-error
        >
        <mat-error *ngIf="myForm.controls['promedioRendimientoAcademicoIIUD'].hasError('dosDecimales')"
          >El valor debe tener dos decimales.</mat-error
        >
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
        <mat-error *ngIf="myForm.controls['promedioRendimientoAcademicoIIIUD'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['promedioRendimientoAcademicoIIIUD'].hasError('min')"
          >El valor mínimo permitido es 0.</mat-error
        >
        <mat-error *ngIf="myForm.controls['promedioRendimientoAcademicoIIIUD'].hasError('max')"
          >El valor máximo permitido es 20.</mat-error
        >
        <mat-error *ngIf="myForm.controls['promedioRendimientoAcademicoIIIUD'].hasError('dosDecimales')"
          >El valor debe tener dos decimales.</mat-error
        >
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
        <mat-error *ngIf="myForm.controls['desviacionEstandarIUD'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['desviacionEstandarIUD'].hasError('min')"
          >El valor mínimo permitido es 0.</mat-error
        >
        <mat-error *ngIf="myForm.controls['desviacionEstandarIUD'].hasError('dosDecimales')"
          >El valor debe tener dos decimales.</mat-error
        >
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
        <mat-error *ngIf="myForm.controls['desviacionEstandarIIUD'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['desviacionEstandarIIUD'].hasError('min')"
          >El valor mínimo permitido es 0.</mat-error
        >
        <mat-error *ngIf="myForm.controls['desviacionEstandarIIUD'].hasError('dosDecimales')"
          >El valor debe tener dos decimales.</mat-error
        >
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
        <mat-error *ngIf="myForm.controls['desviacionEstandarIIIUD'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['desviacionEstandarIIIUD'].hasError('min')"
          >El valor mínimo permitido es 0.</mat-error
        >
        <mat-error *ngIf="myForm.controls['desviacionEstandarIIIUD'].hasError('dosDecimales')"
          >El valor debe tener dos decimales.</mat-error
        >
      </mat-form-field>

      <!-- <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="Promedio final de Rendimiento Académico"
          formControlName="promedioFinalRendimientoAcademico"
          name="promedioFinalRendimientoAcademico"
          required
        />
        <mat-error *ngIf="myForm.controls['promedioFinalRendimientoAcademico'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['promedioFinalRendimientoAcademico'].hasError('min')"
          >El valor mínimo permitido es 0.</mat-error
        >
        <mat-error *ngIf="myForm.controls['promedioFinalRendimientoAcademico'].hasError('max')"
          >El valor máximo permitido es 20.</mat-error
        >
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
        <mat-error *ngIf="myForm.controls['promedioFinalDesviacionEstandar'].hasError('required')"
          >Ingrese este campo</mat-error
        >
        <mat-error *ngIf="myForm.controls['promedioFinalDesviacionEstandar'].hasError('min')"
          >El valor mínimo permitido es 0.</mat-error
        >
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
  styleUrls: ['./modal-promedio-academico.component.css'],
})
export class ModalPromedioAcademicoComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalPromedioAcademicoComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public datosAsignatura: DatosAsignatura[]
  ) {
  }



  ngOnInit() {
    this.myForm = this.formBuilder.group({
      asignatura: ['', Validators.required],
      promedioRendimientoAcademicoIUD: ['', [Validators.required, Validators.min(0), Validators.max(20),this.validarDosDecimales],],
      promedioRendimientoAcademicoIIUD: ['',[Validators.required, Validators.min(0), Validators.max(20),this.validarDosDecimales],],
      promedioRendimientoAcademicoIIIUD: ['',[Validators.required, Validators.min(0), Validators.max(20),this.validarDosDecimales],],
      desviacionEstandarIUD: ['', [Validators.required, Validators.min(0),this.validarDosDecimales],],
      desviacionEstandarIIUD: ['', [Validators.required, Validators.min(0),this.validarDosDecimales],],
      desviacionEstandarIIIUD: ['', [Validators.required, Validators.min(0),this.validarDosDecimales],],
      // promedioFinalRendimientoAcademico: ['',[Validators.required, Validators.min(0), Validators.max(20)],],
      // promedioFinalDesviacionEstandar: ['',[Validators.required, Validators.min(0)],],
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
