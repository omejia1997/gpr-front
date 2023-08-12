import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Anexo2 } from '../../modelos/InformeFinal/Anexo2';

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

      <h5>Seleccione una opción</h5>
      <mat-radio-group formControlName="respuestaCerrada">
        <mat-radio-button value="SI" name="respuestaCerrada">SI</mat-radio-button> &nbsp;&nbsp;&nbsp;&nbsp;
        <mat-radio-button value="NO" name="respuestaCerrada">NO</mat-radio-button>
      </mat-radio-group>

      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="Link de Evidencia"
          formControlName="linkEvidencia"
          name="linkEvidencia"
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field">
        <textarea
          matInput
          placeholder="Consideración para la evidencia."
          rows="4"
          formControlName="consideracionParaEvidencia"
          name="consideracionParaEvidencia"
          class="custom-input"
          required
        ></textarea>
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
    @Inject(MAT_DIALOG_DATA) public anexo2: Anexo2
  ) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      componente: ['', Validators.required],
      respuestaCerrada: ['', Validators.required],
      linkEvidencia: ['',],
      consideracionParaEvidencia: ['', Validators.required],
    });
    if(this.anexo2){
      this.myForm.patchValue({
        componente: this.anexo2.componente,
        respuestaCerrada: this.anexo2.respuestaCerrada,
        linkEvidencia: this.anexo2.linkEvidencia,
        consideracionParaEvidencia: this.anexo2.consideracionParaEvidencia
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
