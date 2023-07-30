import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DataString } from '../../modelos/DataString';

@Component({
  selector: 'app-modal-string',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="submitForm()" class="text-center">
      <mat-form-field class="custom-form-field">
        <textarea
          matInput
          placeholder="{{ dataString.title }}"
          formControlName="data"
          rows="8"
          name="data"
          class="custom-input"
          required
        ></textarea>
        <mat-error *ngIf="myForm.controls['data'].hasError('required')"
          >Ingrese este campo</mat-error
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
  styleUrls: ['./modal-string.component.css'],
})
export class ModalStringComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalStringComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dataString: DataString
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      data: ['', Validators.required],
    });
    if (this.dataString) {
      this.myForm.patchValue({
        data: this.dataString.data,
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
