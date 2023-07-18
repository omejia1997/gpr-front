import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocenteInformacionService } from '../../servicios/DocenteInformacion.service';
import { Observable } from 'rxjs';
import { ExperienciaProfesional } from '../../modelos/ExperienciaProfesional';

@Component({
  selector: 'app-modal-experiencia-profesional',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="submitForm()" class="text-center">
      <mat-form-field class="custom-form-field">
        <input
          matInput
          placeholder="Nombre de la institución"
          formControlName="nombreInstitucion"
          name="nombreInstitucion"
          class="custom-input"
          required
        />
        <mat-error
          *ngIf="myForm.controls['nombreInstitucion'].hasError('required')"
          >Ingrese el nombre de la institución</mat-error
        >
      </mat-form-field>
      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="Puesto"
          formControlName="puesto"
          name="puesto"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field">
        <input
          matInput
          type="text"
          placeholder="Unidad administrativa"
          formControlName="unidadAdministrativa"
          name="unidadAdministrativa"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <mat-select placeholder="Tipo de Institución" formControlName="tipoInstitucion" name="tipoInstitucion">
          <mat-option *ngFor="let tipoInstitucion of comboTipoInstitucion" [value]="tipoInstitucion">
            {{ tipoInstitucion }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="date"
          placeholder="Fecha de ingreso"
          formControlName="fechaIngreso"
          name="fechaIngreso"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field">
        <mat-select placeholder="Modalidad de contratación" formControlName="modalidadContratacion" name="modalidadContratacion">
          <mat-option *ngFor="let modalidadContratacion of comboModalidadContratacion" [value]="modalidadContratacion">
            {{ modalidadContratacion }}
          </mat-option>
        </mat-select>
      </mat-form-field>



      <mat-form-field class="custom-form-field">
        <mat-select placeholder="Motivo de salida laboral" formControlName="motivoSalidaLaboral" name="motivoSalidaLaboral">
          <mat-option *ngFor="let motivoSalidaLaboral of comboMotivoSalida" [value]="motivoSalidaLaboral">
            {{ motivoSalidaLaboral }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <input
          matInput
          type="date"
          placeholder="Fecha de salida"
          formControlName="fechaSalida"
          name="fechaSalida"
          required
        />
      </mat-form-field>

      <mat-form-field class="custom-form-field-medium">
        <mat-select placeholder="País" formControlName="pais" name="pais">
          <mat-option *ngFor="let pais of paises" [value]="pais">
            {{ pais }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <!-- <mat-form-field>
        <mat-select placeholder="Provincia" formControlName="provincia" name="operacion">
          <mat-option *ngFor="let op of operaciones" [value]="op.valor">
            {{op.muestraValor}}
          </mat-option>
        </mat-select>
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
  styleUrls: ['./modal-experiencia-profesional.component.css'],
})
export class ModalExperienciaProfesionalComponent implements OnInit {
  myForm!: FormGroup;
  paises$: Observable<any>;
  paises: string[] = [];
  comboTipoInstitucion: string[] = [
    'PRIVADA',
    'PÚBLICA'
  ];
  comboModalidadContratacion: string[] = [
    'CONTRATO CON RELACIÓN DE DEPENDENCIA',
    'CONTRATO SERVICIOS OCASIONALES',
    'CONTRATO SIN RELACIÓN DE DEPENDENCIA',
    'DESIGNACIÓN DIRECTA',
    'ELECCIÓN POPULAR',
    'LIBRE NOMBRAMIENTO Y REMOCIÓN',
    'NOMBRAMIENTO PERMANENTE',
    'NOMBRAMIENTO PROVISIONAL',
    'OTRO',
    'PERIODO FIJO',
    'SIN CONCURSO DE MÉRITOS Y OPOSICIÓN',
    'TRASLADO ADMINISTRATIVO',
    'TRASPASO DE PUESTOS'
  ];
  comboMotivoSalida: string[] = [
    'ABANDONO INJUSTIFICADO',
    'CAMBIO ADMINISTRATIVO',
    'CESACIÓN DE FUNCIONES POR DESTITUCIÓN',
    'COMISIÓN DE SERVICIOS CON REMUNERACIÓN',
    'COMISIÓN DE SERVICIOS SIN REMUNERACIÓN',
    'COMPRA DE DE RENUNCIA',
    'DESAHUCIO',
    'DESAPARICIÓN DEL PUESTO DENTRO DE LA ESTRUCTURA DE LA INSTITUCIÓN',
    'DESPIDO UNILATERAL POR PARTE DEL EMPLEADOR',
    'INCAPACIDAD ABSOLUTA O PERMANENTE DEL TRABAJADOR',
    'JUBILACIÓN',
    'MUERTE DEL TRABAJADOR',
    'OTROS',
    'PÉRDIDA DE LOS DERECHOS DE CIUDADANÍA',
    'POR CALIFICACIÓN DE OBRERAS Y OBREROS',
    'POR REMOCIÓN',
    'POR RETIRO VOLUNTARIO CON INDEMNIZACIÓN',
    'PRUEBA MOTIVO DE SALIDA',
    'RENUNCIA VOLUNTARIA',
    'SIN GANAR CONCURSO DE MÉRITOS Y OPOSICIÓN',
    'SUPRESIÓN DEL PUESTO',
    'TERMINACIÓN DEL CONTRATO',
    'TRASLADO ADMINISTRATIVO',
    'TRASPASO DE PUESTOS',
    'VISTO BUENO',
  ];



  constructor(
    public dialogRef: MatDialogRef<ModalExperienciaProfesionalComponent>,
    private formBuilder: FormBuilder,
    private docenteInformacionService: DocenteInformacionService,
    @Inject(MAT_DIALOG_DATA) public experienciaProfesional: ExperienciaProfesional
  ) {
    this.paises$ = this.docenteInformacionService.loadPaises();
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      nombreInstitucion: ['', Validators.required],
      puesto: ['', Validators.required],
      unidadAdministrativa: ['', Validators.required],
      tipoInstitucion: ['', Validators.required],
      modalidadContratacion: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      motivoSalidaLaboral: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      pais: ['', Validators.required],
      //provincia: ['', Validators.required],
    });
    if(this.experienciaProfesional){
      this.myForm.patchValue({
        nombreInstitucion: this.experienciaProfesional.nombreInstitucion,
        puesto: this.experienciaProfesional.puesto,
        unidadAdministrativa: this.experienciaProfesional.unidadAdministrativa,
        tipoInstitucion: this.experienciaProfesional.tipoInstitucion,
        modalidadContratacion: this.experienciaProfesional.modalidadContratacion,
        fechaIngreso: this.experienciaProfesional.fechaIngreso,
        motivoSalidaLaboral: this.experienciaProfesional.motivoSalidaLaboral,
        fechaSalida: this.experienciaProfesional.fechaSalida,
        pais: this.experienciaProfesional.pais,
      });
    }
    this.cargarPaises();
  }

  submitForm() {
    const formValue = this.myForm.value;
    this.dialogRef.close(formValue);
  }

  cargarPaises() {
    this.paises$.subscribe((data) => {
      this.paises = data.paises;
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
