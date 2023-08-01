import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAsignaturaComponent } from '../../../components/modal-asignatura/modal-asignatura.component';
import { ModalMejoraDocenteComponent } from '../../../components/modal-mejora-docente/modal-mejora-docente.component';
import { ModalPromedioAcademicoComponent } from '../../../components/modal-promedio-academico/modal-promedio-academico.component';
import { ModalRendimientoAcademicoComponent } from '../../../components/modal-rendimiento-academico/modal-rendimiento-academico.component';
import { ModalStringComponent } from '../../../components/modal-string/modal-string.component';
import { ModalTutoriaComponent } from '../../../components/modal-tutoria/modal-tutoria.component';
import { DataString } from '../../../modelos/DataString';
import { InformeFinal } from '../../../modelos/InformeFinal/InformeFinal';

@Component({
  selector: 'app-realizar-informe-final-docencia',
  templateUrl: './realizar-informe-final-docencia.component.html',
  styleUrls: ['./realizar-informe-final-docencia.component.css']
})
export class RealizarInformeFinalDocenciaComponent implements OnInit {
  blockedDocument: boolean = false;
  informeFinalDTO: InformeFinal={};

  dataString: DataString={};
  data: string="";
  constructor(private dialog: MatDialog) {
    this.informeFinalDTO.datosGenerales={};
    this.informeFinalDTO.antecedentes=[];
    this.informeFinalDTO.datosAsignatura=[];
    this.informeFinalDTO.evaluacionDocente={};
    this.informeFinalDTO.fortalezas=[];
    this.informeFinalDTO.debilidades=[];
    this.informeFinalDTO.apreciacionGlobalFortalezas=[];
    this.informeFinalDTO.apreciacionGlobalDebilidades=[];
    this.informeFinalDTO.accionesMejoraDocente = {};
    this.informeFinalDTO.accionesMejoraDocente.accion1=[];
    this.informeFinalDTO.accionesMejoraDocente.accion2=[];
    this.informeFinalDTO.accionesMejoraDocente.accion3=[];
    this.informeFinalDTO.accionesMejoraDocente.accion4=[];
    this.informeFinalDTO.accionesMejoraDocente.accionLaboratorioTutoria=[];
    this.informeFinalDTO.accionesMejoraDocente.otrasAcciones=[];
    this.informeFinalDTO.tematicaCapacitaciones =[];
    this.informeFinalDTO.conclusiones=[];
    this.informeFinalDTO.recomendaciones=[];
  }

  ngOnInit() {
  }

  resetData(){
    this.dataString.title= '';
    this.dataString.data= '';
    this.data='';
  }

  openModalAddString(){
    const dialogRef = this.dialog.open(ModalStringComponent, {
      width: '500px',
      data: this.dataString,
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.data = formValue.data;

        if(this.dataString.title== 'ANTECEDENTE'){
          this.informeFinalDTO.antecedentes?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'OBJETIVO'){
          this.informeFinalDTO.objetivo = this.data;
          this.resetData();
        }else if(this.dataString.title== 'FORTALEZA'){
          this.informeFinalDTO.fortalezas?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'DEBILIDAD'){
          this.informeFinalDTO.debilidades?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES FORTALEZA'){
          this.informeFinalDTO.apreciacionGlobalFortalezas?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES DEBILIDAD'){
          this.informeFinalDTO.apreciacionGlobalDebilidades?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'Acción 1: Relacionado con mejoras al plan analítico de las asignaturas:'){
          this.informeFinalDTO.accionesMejoraDocente?.accion1?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'Acción 2: Relacionadas con los estudiantes y mejorar el proceso enseñanza-aprendizaje'){
          this.informeFinalDTO.accionesMejoraDocente?.accion2?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'Acción 3: Relacionadas con la mejora de sus capacidades docentes'){
          this.informeFinalDTO.accionesMejoraDocente?.accion3?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'Acción 4: Otros ámbitos de mejora'){
          this.informeFinalDTO.accionesMejoraDocente?.accion4?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'Acciones tomadas para la solución de las novedades que se hayan presentado en clases y laboratorios y tutorías'){
          this.informeFinalDTO.accionesMejoraDocente?.accionLaboratorioTutoria?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'Otras Acciones'){
          this.informeFinalDTO.accionesMejoraDocente?.otrasAcciones?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'CONCLUSIÓN'){
          this.informeFinalDTO.conclusiones?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'RECOMENDACIÓN'){
          this.informeFinalDTO.recomendaciones?.push(this.data);
          this.resetData();
        }
      }
    });
  }

  addAntecedentes(){
    this.dataString.title= 'ANTECEDENTE';
    this.dataString.data= '';
    this.openModalAddString();
  }

  addObjetivo(){
    this.dataString.title= 'OBJETIVO';
    this.dataString.data= '';
    this.openModalAddString();
  }

  addFortaleza(){
    this.dataString.title= 'FORTALEZA';
    this.dataString.data= '';
    this.openModalAddString();
  }

  addDebilidad(){
    this.dataString.title= 'DEBILIDAD';
    this.dataString.data= '';
    this.openModalAddString();
  }

  addFortalezaApreciacionEstudiantes(){
    this.dataString.title= 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES FORTALEZA';
    this.dataString.data= '';
    this.openModalAddString();
  }

  addDebilidadApreciacionEstudiantes(){
    this.dataString.title= 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES DEBILIDAD';
    this.dataString.data= '';
    this.openModalAddString();
  }

  addAccion1(){
    this.dataString.title= 'Acción 1: Relacionado con mejoras al plan analítico de las asignaturas:';
    this.dataString.data= '';
    this.openModalAddString();
  }

  addAccion2(){
    this.dataString.title= 'Acción 2: Relacionadas con los estudiantes y mejorar el proceso enseñanza-aprendizaje';
    this.dataString.data= '';
    this.openModalAddString();
  }

  addAccion3(){
    this.dataString.title= 'Acción 3: Relacionadas con la mejora de sus capacidades docentes';
    this.dataString.data= '';
    this.openModalAddString();
  }

  addAccion4(){
    this.dataString.title= 'Acción 4: Otros ámbitos de mejora';
    this.dataString.data= '';
    this.openModalAddString();
  }

  addAccionLaboratorioTutoria(){
    this.dataString.title= 'Acciones tomadas para la solución de las novedades que se hayan presentado en clases y laboratorios y tutorías';
    this.dataString.data= '';
    this.openModalAddString();
  }

  addOtrasAcciones(){
    this.dataString.title= 'Otras Acciones';
    this.dataString.data= '';
    this.openModalAddString();
  }

  addConclusion(){
    this.dataString.title= 'CONCLUSIÓN';
    this.dataString.data= '';
    this.openModalAddString();
  }

  addRecomendacion(){
    this.dataString.title= 'RECOMENDACIÓN';
    this.dataString.data= '';
    this.openModalAddString();
  }


  addDatosInformativos(){
    const dialogRef = this.dialog.open(ModalAsignaturaComponent, {
      width: '700px',
      data: this.dataString,
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.informeFinalDTO.datosAsignatura?.push(formValue);
      }
    });
  }

  addResultadosRendimientoAcademico(){
    const dialogRef = this.dialog.open(ModalRendimientoAcademicoComponent, {
      width: '700px',
      data: this.informeFinalDTO.datosAsignatura,
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        const indiceEncontrado = this.informeFinalDTO.datosAsignatura?.findIndex(item => item.nrc === formValue.asignatura.nrc);
        if (indiceEncontrado !== -1) {
          console.log(indiceEncontrado);
          if(indiceEncontrado!=undefined){
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesMatriculados={};
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesMatriculados!.numeroHombres= formValue.estudiantesMatriculadosHombres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesMatriculados!.numeroMujeres= formValue.estudiantesMatriculadosMujeres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesMatriculados!.total= formValue.estudiantesMatriculadosHombres+formValue.estudiantesMatriculadosMujeres;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesRetirados={}
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesRetirados!.numeroHombres= formValue.estudiantesRetiradosHombres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesRetirados!.numeroMujeres= formValue.estudiantesRetiradosMujeres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesRetirados!.total= formValue.estudiantesRetiradosHombres+formValue.estudiantesRetiradosMujeres;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesReprobados={}
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesReprobados!.numeroHombres= formValue.estudiantesReprobadosHombres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesReprobados!.numeroMujeres= formValue.estudiantesReprobadosMujeres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesReprobados!.total= formValue.estudiantesReprobadosHombres+formValue.estudiantesReprobadosMujeres;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesAprobados={};
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesAprobados!.numeroHombres= formValue.estudiantesAprobadosHombres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesAprobados!.numeroMujeres= formValue.estudiantesAprobadosMujeres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesAprobados!.total= formValue.estudiantesAprobadosHombres+formValue.estudiantesAprobadosMujeres;
          }
        } else {
          console.log('Elemento no encontrado.');
        }
      }
    });
  }

  addPromedioRendimientoAcademico(){
    const dialogRef = this.dialog.open(ModalPromedioAcademicoComponent, {
      width: '700px',
      data: this.informeFinalDTO.datosAsignatura,
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        const indiceEncontrado = this.informeFinalDTO.datosAsignatura?.findIndex(item => item.nrc === formValue.asignatura.nrc);
        if (indiceEncontrado !== -1) {
          console.log(indiceEncontrado);
          if(indiceEncontrado!=undefined){
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioRendimientoAcademico={};
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioRendimientoAcademico!.primerParcial= formValue.promedioRendimientoAcademicoIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioRendimientoAcademico!.segundoParcial= formValue.promedioRendimientoAcademicoIIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioRendimientoAcademico!.tercerParcial= formValue.promedioRendimientoAcademicoIIIUD;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].desviacionEstandar={}
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].desviacionEstandar!.primerParcial= formValue.desviacionEstandarIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].desviacionEstandar!.segundoParcial= formValue.desviacionEstandarIIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].desviacionEstandar!.tercerParcial= formValue.desviacionEstandarIIIUD;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioFinalRendimientoAcademico =parseFloat(((formValue.promedioRendimientoAcademicoIUD+ formValue.promedioRendimientoAcademicoIIUD +formValue.promedioRendimientoAcademicoIIIUD)/3).toFixed(2));;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioFinalDesviacionEstandar =parseFloat(((formValue.desviacionEstandarIUD+ formValue.desviacionEstandarIIUD +formValue.desviacionEstandarIIIUD)/3).toFixed(2));

          }
        } else {
          console.log('Elemento no encontrado.');
        }
      }
    });
  }

  addDatosTutorias(){
    const dialogRef = this.dialog.open(ModalTutoriaComponent, {
      width: '800px',
      data: this.informeFinalDTO.datosAsignatura,
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        const indiceEncontrado = this.informeFinalDTO.datosAsignatura?.findIndex(item => item.nrc === formValue.asignatura.nrc);
        if (indiceEncontrado !== -1) {
          console.log(indiceEncontrado);
          if(indiceEncontrado!=undefined){
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioRendimientoAcademico={};
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioRendimientoAcademico!.primerParcial= formValue.promedioRendimientoAcademicoIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioRendimientoAcademico!.segundoParcial= formValue.promedioRendimientoAcademicoIIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioRendimientoAcademico!.tercerParcial= formValue.promedioRendimientoAcademicoIIIUD;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].desviacionEstandar={}
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].desviacionEstandar!.primerParcial= formValue.desviacionEstandarIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].desviacionEstandar!.segundoParcial= formValue.desviacionEstandarIIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].desviacionEstandar!.tercerParcial= formValue.desviacionEstandarIIIUD;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioFinalRendimientoAcademico =parseFloat(((formValue.promedioRendimientoAcademicoIUD+ formValue.promedioRendimientoAcademicoIIUD +formValue.promedioRendimientoAcademicoIIIUD)/3).toFixed(2));;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioFinalDesviacionEstandar =parseFloat(((formValue.desviacionEstandarIUD+ formValue.desviacionEstandarIIUD +formValue.desviacionEstandarIIIUD)/3).toFixed(2));

          }
        } else {
          console.log('Elemento no encontrado.');
        }
      }
    });
  }

  addCapacitacionMejoraDocente(){
    const dialogRef = this.dialog.open(ModalMejoraDocenteComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.informeFinalDTO.tematicaCapacitaciones?.push(formValue);
      }
    });
  }

  save(){

  }
}
