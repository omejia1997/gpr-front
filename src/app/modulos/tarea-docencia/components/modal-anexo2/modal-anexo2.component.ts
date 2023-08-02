import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-asignatura',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="submitForm()" class="text-center">
      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="COMPONENTE"
          formControlName="componente"
          name="asignatura"
          required
        />
      </mat-form-field>

      <!-- <div *ngFor="let option of optionsRadioButton">
        <mat-radio-button
          [value]="option"
          formControlName="respuestaCerrada"
          name="respuestaCerrada"
        >
          {{ option }}
        </mat-radio-button>
      </div> -->
      <mat-radio-group formControlName="respuestaCerrada">
      <mat-radio-button value="SI" name="respuestaCerrada">SI</mat-radio-button>
        <mat-radio-button value="NO" name="respuestaCerrada">NO</mat-radio-button>
        </mat-radio-group>

      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="Link de Evidencia"
          formControlName="linkEvidencia"
          name="linkEvidencia"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="Consideración para la evidencia."
          formControlName="consideracionParaEvidencia"
          name="consideracionParaEvidencia"
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
  styleUrls: ['./modal-anexo2.component.css'],
})
export class ModalAnexo2Component implements OnInit {
  myForm!: FormGroup;
  optionsRadioButton = ['SI', 'NO'];
  // selectedOption = 'NO';

  constructor(
    public dialogRef: MatDialogRef<ModalAnexo2Component>,
    private formBuilder: FormBuilder,
    // @Inject(MAT_DIALOG_DATA) public formacionAcademica: FormacionAcademicaAdicional
  ) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      componente: ['', Validators.required],
      respuestaCerrada: ['', Validators.required],
      // respuestaCerrada: ['',],
      linkEvidencia: ['', Validators.required],
      consideracionParaEvidencia: ['', Validators.required],
    });
    // if(this.formacionAcademica){
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
