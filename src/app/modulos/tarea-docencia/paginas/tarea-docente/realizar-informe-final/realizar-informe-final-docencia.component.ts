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
import { TareaDocenciaService } from '../../../servicios/TareaDocenciaService';
import { Router } from '@angular/router';
import { TareaDocenciaDTO } from '../../../modelos/dto/TareaDocenciaDTO';
import { TareaDocenteDocenciaDTO } from '../../../modelos/dto/TareaDocenteDocenciaDTO';
import { TareaDocenteDocencia } from '../../../modelos/TareaDocenteDocencia';
import { MessageService } from 'primeng/api';
import { ModalAnexo2Component } from '../../../components/modal-anexo2/modal-anexo2.component';
import { DatosAsignatura } from '../../../modelos/InformeFinal/DatosAsignatura';

@Component({
  selector: 'app-realizar-informe-final-docencia',
  templateUrl: './realizar-informe-final-docencia.component.html',
  styleUrls: ['./realizar-informe-final-docencia.component.css']
})
export class RealizarInformeFinalDocenciaComponent implements OnInit {
  visualBlockedDocument: boolean = true;
  blockedDocument: boolean = false;
  tareaDocenteDocenciaDTO: TareaDocenteDocenciaDTO={};
  tareaDocenteDocencia: TareaDocenteDocencia={};
  informeFinalDTO: InformeFinal={};

  dataString: DataString={};
  data: string="";
  constructor(
    private dialog: MatDialog,
    private tareaDocenciaService: TareaDocenciaService,
    private router: Router,
    private messageService: MessageService,
    ) {
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
    this.informeFinalDTO.anexo1=[];
    this.informeFinalDTO.recomendaciones=[];

    this.informeFinalDTO.anexo2=[];
    this.tareaDocenciaService.tareaDocenteDocenciaDTO$.subscribe((res) => {
      if (res == null) {
        this.visualBlockedDocument = false;
        this.back();
      } else {
        this.tareaDocenteDocenciaDTO = res;
        this.tareaDocenteDocencia.id = this.tareaDocenteDocenciaDTO.id;
        this.tareaDocenteDocencia.idTareaDocencia = this.tareaDocenteDocenciaDTO.tareaDocencia?.id;
        this.tareaDocenteDocencia.docenteAsignado = this.tareaDocenteDocenciaDTO.docenteAsignado;
        this.tareaDocenteDocencia.estadoTareaDocente = this.tareaDocenteDocenciaDTO.estadoTareaDocente;
        this.tareaDocenteDocencia.informeFinal = this.tareaDocenteDocenciaDTO.informeFinal;
        this.tareaDocenteDocencia.fechaEntrega = this.tareaDocenteDocenciaDTO.fechaEntrega;
        this.tareaDocenteDocencia.fechaModificacion = this.tareaDocenteDocenciaDTO.fechaModificacion;
        if(this.tareaDocenteDocenciaDTO.informeFinal){
          this.informeFinalDTO = this.tareaDocenteDocenciaDTO.informeFinal;
          console.log(this.tareaDocenteDocenciaDTO.informeFinal)
        }
      }
    });
  }

  ngOnInit() {
  }

  back(){
    this.router.navigate(['revisar-tarea-asignada-docencia']);
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
          if(this.dataString.data){
            this.informeFinalDTO.antecedentes =
            this.informeFinalDTO.antecedentes?.filter(
              (item) => item !== this.dataString.data
            );
          }
          this.informeFinalDTO.antecedentes?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'OBJETIVO'){
          this.informeFinalDTO.objetivo = this.data;
          this.resetData();
        }else if(this.dataString.title== 'FORTALEZA'){
          if(this.dataString.data){
            this.informeFinalDTO.fortalezas =
            this.informeFinalDTO.fortalezas?.filter(
              (item) => item !== this.dataString.data
            );
          }
          this.informeFinalDTO.fortalezas?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'DEBILIDAD'){
          if(this.dataString.data){
            this.informeFinalDTO.debilidades =
            this.informeFinalDTO.debilidades?.filter(
              (item) => item !== this.dataString.data
            );
          }
          this.informeFinalDTO.debilidades?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES FORTALEZA'){
          if(this.dataString.data){
            this.informeFinalDTO.apreciacionGlobalFortalezas =
            this.informeFinalDTO.apreciacionGlobalFortalezas?.filter(
              (item) => item !== this.dataString.data
            );
          }
          this.informeFinalDTO.apreciacionGlobalFortalezas?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES DEBILIDAD'){
          if(this.dataString.data){
            this.informeFinalDTO.apreciacionGlobalDebilidades =
            this.informeFinalDTO.apreciacionGlobalDebilidades?.filter(
              (item) => item !== this.dataString.data
            );
          }
          this.informeFinalDTO.apreciacionGlobalDebilidades?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'Acción 1: Relacionado con mejoras al plan analítico de las asignaturas:'){
          if(this.dataString.data){
            if(this.informeFinalDTO.accionesMejoraDocente){
              this.informeFinalDTO.accionesMejoraDocente.accion1 =
              this.informeFinalDTO.accionesMejoraDocente?.accion1?.filter(
                (item) => item !== this.dataString.data
              );
            }
          }
          this.informeFinalDTO.accionesMejoraDocente?.accion1?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'Acción 2: Relacionadas con los estudiantes y mejorar el proceso enseñanza-aprendizaje'){
          if(this.informeFinalDTO.accionesMejoraDocente){
            this.informeFinalDTO.accionesMejoraDocente.accion2 =
            this.informeFinalDTO.accionesMejoraDocente?.accion2?.filter(
              (item) => item !== this.dataString.data
            );
          }
          this.informeFinalDTO.accionesMejoraDocente?.accion2?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'Acción 3: Relacionadas con la mejora de sus capacidades docentes'){
          if(this.informeFinalDTO.accionesMejoraDocente){
            this.informeFinalDTO.accionesMejoraDocente.accion3 =
            this.informeFinalDTO.accionesMejoraDocente?.accion3?.filter(
              (item) => item !== this.dataString.data
            );
          }
          this.informeFinalDTO.accionesMejoraDocente?.accion3?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'Acción 4: Otros ámbitos de mejora'){
          if(this.informeFinalDTO.accionesMejoraDocente){
            this.informeFinalDTO.accionesMejoraDocente.accion4 =
            this.informeFinalDTO.accionesMejoraDocente?.accion4?.filter(
              (item) => item !== this.dataString.data
            );
          }
          this.informeFinalDTO.accionesMejoraDocente?.accion4?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'Acciones tomadas para la solución de las novedades que se hayan presentado en clases y laboratorios y tutorías'){
          if(this.informeFinalDTO.accionesMejoraDocente){
            this.informeFinalDTO.accionesMejoraDocente.accionLaboratorioTutoria =
            this.informeFinalDTO.accionesMejoraDocente?.accionLaboratorioTutoria?.filter(
              (item) => item !== this.dataString.data
            );
          }
          this.informeFinalDTO.accionesMejoraDocente?.accionLaboratorioTutoria?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'Otras Acciones'){
          if(this.informeFinalDTO.accionesMejoraDocente){
            this.informeFinalDTO.accionesMejoraDocente.otrasAcciones =
            this.informeFinalDTO.accionesMejoraDocente?.otrasAcciones?.filter(
              (item) => item !== this.dataString.data
            );
          }
          this.informeFinalDTO.accionesMejoraDocente?.otrasAcciones?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'CONCLUSIÓN'){
          if(this.dataString.data){
            this.informeFinalDTO.conclusiones =
            this.informeFinalDTO.conclusiones?.filter(
              (item) => item !== this.dataString.data
            );
          }
          this.informeFinalDTO.conclusiones?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'RECOMENDACIÓN'){
          if(this.dataString.data){
            this.informeFinalDTO.recomendaciones =
            this.informeFinalDTO.recomendaciones?.filter(
              (item) => item !== this.dataString.data
            );
          }
          this.informeFinalDTO.recomendaciones?.push(this.data);
          this.resetData();
        }else if(this.dataString.title== 'ANEXO'){
          if(this.dataString.data){
            this.informeFinalDTO.anexo1 =
            this.informeFinalDTO.anexo1?.filter(
              (item) => item !== this.dataString.data
            );
          }
          this.informeFinalDTO.anexo1?.push(this.data);
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

  editarAntecedente(antecedente:string){
    this.dataString.title = 'ANTECEDENTE';
    this.dataString.data= antecedente;
    this.openModalAddString();
  }

  addObjetivo(){
    this.dataString.title= 'OBJETIVO';
    this.dataString.data= '';
    this.openModalAddString();
  }

  editarObjetivo(objetivo:string){
    this.dataString.title = 'OBJETIVO';
    this.dataString.data= objetivo;
    this.openModalAddString();
  }

  addFortaleza(){
    this.dataString.title= 'FORTALEZA';
    this.dataString.data= '';
    this.openModalAddString();
  }

  editarFortaleza(fortaleza:string){
    this.dataString.title= 'FORTALEZA';
    this.dataString.data = fortaleza
    this.openModalAddString();
  }

  addDebilidad(){
    this.dataString.title= 'DEBILIDAD';
    this.dataString.data= '';
    this.openModalAddString();
  }

  editarDebilidad(debilidad:string){
    this.dataString.title= 'DEBILIDAD';
    this.dataString.data= debilidad;
    this.openModalAddString();
  }

  addFortalezaApreciacionEstudiantes(){
    this.dataString.title= 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES FORTALEZA';
    this.dataString.data= '';
    this.openModalAddString();
  }

  editarFortalezaApreciacionEstudiantes(fortaleza:string){
    this.dataString.title= 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES FORTALEZA';
    this.dataString.data= fortaleza;
    this.openModalAddString();
  }

  addDebilidadApreciacionEstudiantes(){
    this.dataString.title= 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES DEBILIDAD';
    this.dataString.data= '';
    this.openModalAddString();
  }

  editarDebilidadApreciacionEstudiantes(debilidad:string){
    this.dataString.title= 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES DEBILIDAD';
    this.dataString.data= debilidad;
    this.openModalAddString();
  }

  addAccion1(){
    this.dataString.title= 'Acción 1: Relacionado con mejoras al plan analítico de las asignaturas:';
    this.dataString.data= '';
    this.openModalAddString();
  }

  editarAccion1(accion1:string){
    this.dataString.title= 'Acción 1: Relacionado con mejoras al plan analítico de las asignaturas:';
    this.dataString.data= accion1;
    this.openModalAddString();
  }

  addAccion2(){
    this.dataString.title= 'Acción 2: Relacionadas con los estudiantes y mejorar el proceso enseñanza-aprendizaje';
    this.dataString.data= '';
    this.openModalAddString();
  }

  editarAccion2(accion2:string){
    this.dataString.title= 'Acción 2: Relacionadas con los estudiantes y mejorar el proceso enseñanza-aprendizaje';
    this.dataString.data= accion2;
    this.openModalAddString();
  }

  addAccion3(){
    this.dataString.title= 'Acción 3: Relacionadas con la mejora de sus capacidades docentes';
    this.dataString.data= '';
    this.openModalAddString();
  }

  editarAccion3(accion3:string){
    this.dataString.title= 'Acción 3: Relacionadas con la mejora de sus capacidades docentes';
    this.dataString.data= accion3;
    this.openModalAddString();
  }

  addAccion4(){
    this.dataString.title= 'Acción 4: Otros ámbitos de mejora';
    this.dataString.data= '';
    this.openModalAddString();
  }

  editarAccion4(accion4:string){
    this.dataString.title= 'Acción 4: Otros ámbitos de mejora';
    this.dataString.data= accion4;
    this.openModalAddString();
  }

  addAccionLaboratorioTutoria(){
    this.dataString.title= 'Acciones tomadas para la solución de las novedades que se hayan presentado en clases y laboratorios y tutorías';
    this.dataString.data= '';
    this.openModalAddString();
  }

  editarAccionLaboratorioTutoria(accionLaboratorioTutoria:string){
    this.dataString.title= 'Acciones tomadas para la solución de las novedades que se hayan presentado en clases y laboratorios y tutorías';
    this.dataString.data= accionLaboratorioTutoria;
    this.openModalAddString();
  }

  addOtrasAcciones(){
    this.dataString.title= 'Otras Acciones';
    this.dataString.data= '';
    this.openModalAddString();
  }

  editarOtrasAcciones(otrasAcciones:string){
    this.dataString.title= 'Otras Acciones';
    this.dataString.data= otrasAcciones;
    this.openModalAddString();
  }

  addConclusion(){
    this.dataString.title= 'CONCLUSIÓN';
    this.dataString.data= '';
    this.openModalAddString();
  }

  editarConclusion(conclusiones:string){
    this.dataString.title= 'CONCLUSIÓN';
    this.dataString.data = conclusiones;
    this.openModalAddString();
  }

  addRecomendacion(){
    this.dataString.title= 'RECOMENDACIÓN';
    this.dataString.data= '';
    this.openModalAddString();
  }

  editarRecomendacion(recomendaciones:string){
    this.dataString.title= 'RECOMENDACIÓN';
    this.dataString.data = recomendaciones;
    this.openModalAddString();
  }

  addAnexo1(){
    this.dataString.title= 'ANEXO';
    this.dataString.data= '';
    this.openModalAddString();
  }

  editarAnexo1(anexo1:string){
    this.dataString.title= 'ANEXO';
    this.dataString.data= anexo1;
    this.openModalAddString();
  }

  addAnexo2(){
    const dialogRef = this.dialog.open(ModalAnexo2Component, {
      width: '700px',
      data: this.dataString,
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.informeFinalDTO.anexo2?.push(formValue);
      }
    });
  }


  addDatosInformativos(datosAsignatura?:DatosAsignatura){
    const dialogRef = this.dialog.open(ModalAsignaturaComponent, {
      width: '700px',
      data: datosAsignatura,
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        if(datosAsignatura){
          this.informeFinalDTO.datosAsignatura =
          this.informeFinalDTO.datosAsignatura?.filter(
            (item) => item.nrc !== datosAsignatura.nrc
          );
        }
        this.informeFinalDTO.datosAsignatura?.push(formValue);
      }
    });
  }


  addResultadosRendimientoAcademico(datosAsignatura?:DatosAsignatura){
    const dialogRef = this.dialog.open(ModalRendimientoAcademicoComponent, {
      width: '700px',
      // data: this.informeFinalDTO.datosAsignatura,
      data: datosAsignatura,
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        const indiceEncontrado = this.informeFinalDTO.datosAsignatura?.findIndex(item => item.nrc === formValue.asignatura.nrc);
        if (indiceEncontrado !== -1) {
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
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesAprobados!.numeroHombres= formValue.estudiantesMatriculadosHombres-formValue.estudiantesReprobadosHombres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesAprobados!.numeroMujeres= formValue.estudiantesMatriculadosMujeres-formValue.estudiantesReprobadosMujeres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesAprobados!.total= (formValue.estudiantesMatriculadosHombres-formValue.estudiantesReprobadosHombres)+(formValue.estudiantesMatriculadosMujeres-formValue.estudiantesReprobadosMujeres);
          }
        } else {
          console.log('Elemento no encontrado.');
        }
      }
    });
  }

  addPromedioRendimientoAcademico(datosAsignatura?:DatosAsignatura){
    const dialogRef = this.dialog.open(ModalPromedioAcademicoComponent, {
      width: '700px',
      data: datosAsignatura,
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        const indiceEncontrado = this.informeFinalDTO.datosAsignatura?.findIndex(item => item.nrc === formValue.asignatura.nrc);
        if (indiceEncontrado !== -1) {
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

  addDatosTutorias(datosAsignatura?:DatosAsignatura){
    const dialogRef = this.dialog.open(ModalTutoriaComponent, {
      width: '800px',
      data: datosAsignatura,
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        const indiceEncontrado = this.informeFinalDTO.datosAsignatura?.findIndex(item => item.nrc === formValue.asignatura.nrc);
        if (indiceEncontrado !== -1) {
          console.log(indiceEncontrado);
          if(indiceEncontrado!=undefined){
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14={};
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14!.primerParcial= formValue.tutoriaEstudiantesPromedioMenor14IUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14!.segundoParcial= formValue.tutoriaEstudiantesPromedioMenor14IIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14!.tercerParcial= formValue.tutoriaEstudiantesPromedioMenor14IIIUD;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14Asistieron={}
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14Asistieron!.primerParcial= formValue.tutoriaEstudiantesPromedioMenor14AsistieronIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14Asistieron!.segundoParcial= formValue.tutoriaEstudiantesPromedioMenor14AsistieronIIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14Asistieron!.tercerParcial= formValue.tutoriaEstudiantesPromedioMenor14AsistieronIIIUD;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron = formValue.tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron;
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
    this.blockedDocument = true;


  }

  guardarBorrador(){
    this.blockedDocument = true;
    this.tareaDocenteDocencia.informeFinal = this.informeFinalDTO;
    this.tareaDocenciaService.guardarTareaComoBorrador(this.tareaDocenteDocencia.id,this.informeFinalDTO)
    .subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Datos Subidos con éxito'
        });
        this.blockedDocument = false;
        // setTimeout(() => {
        //   this.blockedDocument = false;
        //   this.router.navigate(['revisar-tarea-asignada-docencia']);
        // }, 2000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message ?? ' Error ál subir los datos del Informe'
        });
        this.blockedDocument = false;
      },
      complete: () => {
      },
    });
  }

  exportDataToPDF(){

  }
}
