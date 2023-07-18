import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DocenteInformacionService } from '../../servicios/DocenteInformacion.service';
import { Publicacion } from '../../modelos/Publicacion';

@Component({
  selector: 'app-modal-publicacion-realizada',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="submitForm()" class="text-center">
      <mat-form-field class="custom-form-field">
        <mat-select
          placeholder="Tipo de Investigación"
          formControlName="tipoInvestigacion"
          name="tipoInvestigacion"
        >
          <mat-option
            *ngFor="let tipoInvestigacion of comboTipoInvestigacion"
            [value]="tipoInvestigacion"
          >
            {{ tipoInvestigacion }}
          </mat-option>
        </mat-select>
        <mat-error
          *ngIf="myForm.controls['tipoInvestigacion'].hasError('required')"
          >Ingrese el tipo de investigación</mat-error
        >
      </mat-form-field>
      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="tituloCompleto"
          placeholder="Titulo Completo"
          formControlName="tituloCompleto"
          name="tituloCompleto"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="Publicador"
          formControlName="publicador"
          name="publicador"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="ISSN/ISBN/DOI"
          formControlName="codigoPublicacion"
          name="codigoPublicacion"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <mat-select
          placeholder="Participación"
          formControlName="participacion"
          name="participacion"
        >
          <mat-option
            *ngFor="let participacion of comboParticipacion"
            [value]="participacion"
          >
            {{ participacion }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <mat-select placeholder="Idioma" formControlName="idioma" name="idioma">
          <mat-option *ngFor="let idioma of idiomas" [value]="idioma">
            {{ idioma }}
          </mat-option>
        </mat-select>
        <mat-error *ngIf="myForm.controls['idioma'].hasError('required')"
          >Seleccione un idioma</mat-error
        >
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <mat-select
          placeholder="Estado de Publicación"
          formControlName="estadoPublicacion"
          name="estadoPublicacion"
        >
          <mat-option
            *ngFor="let estadoPublicacion of comboEstadoPublicacion"
            [value]="estadoPublicacion"
          >
            {{ estadoPublicacion }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="date"
          placeholder="Fecha de Publicación"
          formControlName="fechaPublicacion"
          name="fechaPublicacion"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="number"
          placeholder="N° Volumen de la Publicación"
          formControlName="volumenPublicacion"
          name="volumenPublicacion"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <mat-select
          placeholder="Revisión de Pares"
          formControlName="revisionPares"
          name="revisionPares"
        >
          <mat-option
            *ngFor="let revisionPar of comboOpcionesCerradas"
            [value]="revisionPar"
          >
            {{ revisionPar }}
          </mat-option>
        </mat-select>
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
  styleUrls: ['./modal-publicacion-realizada.component.css'],
})
export class ModalPublicacionRealizadaComponent implements OnInit {
  myForm!: FormGroup;
  idiomas$: Observable<any>;
  idiomas: string[] = [];
  comboTipoInvestigacion: string[] = [
    'ARTÍCULOS',
    'FOLLETOS',
    'LIBROS',
    'POLIGRAFIADOS',
    'REVISTAS',
  ];
  comboParticipacion: string[] = ['AUTOR', 'COAUTOR'];
  comboEstadoPublicacion: string[] = ['PUBLICADO', 'ACEPTADO'];
  comboOpcionesCerradas: string[] = ['NO', 'SI'];

  constructor(
    public dialogRef: MatDialogRef<ModalPublicacionRealizadaComponent>,
    private formBuilder: FormBuilder,
    private docenteInformacionService: DocenteInformacionService,
    @Inject(MAT_DIALOG_DATA) public publicacion: Publicacion
  ) {
    this.idiomas$ = this.docenteInformacionService.loadIdiomas();
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      tipoInvestigacion: ['', Validators.required],
      tituloCompleto: ['', Validators.required],
      publicador: ['', Validators.required],
      codigoPublicacion: ['', Validators.required],
      participacion: ['', Validators.required],
      idioma: ['', Validators.required],
      estadoPublicacion: ['', Validators.required],
      fechaPublicacion: ['', Validators.required],
      volumenPublicacion: ['', Validators.required],
      revisionPares: ['', Validators.required],
    });
    if(this.publicacion){
      this.myForm.patchValue({
        tipoInvestigacion: this.publicacion.tipoInvestigacion,
        tituloCompleto: this.publicacion.tituloCompleto,
        publicador: this.publicacion.publicador,
        codigoPublicacion: this.publicacion.codigoPublicacion,
        participacion: this.publicacion.participacion,
        idioma: this.publicacion.idioma,
        estadoPublicacion: this.publicacion.estadoPublicacion,
        fechaPublicacion: this.publicacion.fechaPublicacion,
        volumenPublicacion: this.publicacion.volumenPublicacion,
        revisionPares: this.publicacion.revisionPares
      });
    }
    this.cargarIdiomas();
  }

  cargarIdiomas() {
    this.idiomas$.subscribe((data) => {
      this.idiomas = data.idiomas;
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
