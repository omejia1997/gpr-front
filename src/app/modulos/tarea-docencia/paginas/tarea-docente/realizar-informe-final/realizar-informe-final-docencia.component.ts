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
import { ConfirmationService, MessageService } from 'primeng/api';
import { ModalAnexo2Component } from '../../../components/modal-anexo2/modal-anexo2.component';
import { DatosAsignatura } from '../../../modelos/InformeFinal/DatosAsignatura';
// import image from '../../../../../../assets/img/espe.png'; // Ruta a tu imagen local
// import image from './assets/img/espe.png'; // Ruta a tu imagen local


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-realizar-informe-final-docencia',
  templateUrl: './realizar-informe-final-docencia.component.html',
  styleUrls: ['./realizar-informe-final-docencia.component.css']
})
export class RealizarInformeFinalDocenciaComponent implements OnInit {
  visualBlockedDocument: boolean = true;
  blockedDocument: boolean = false;
  tareaDocenteDocenciaDTO: TareaDocenteDocenciaDTO = {};
  tareaDocenteDocencia: TareaDocenteDocencia = {};
  informeFinalDTO: InformeFinal = {};

  dataString: DataString = {};
  data: string = "";
  constructor(
    private dialog: MatDialog,
    private tareaDocenciaService: TareaDocenciaService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.informeFinalDTO.datosGenerales = {};
    this.informeFinalDTO.antecedentes = [];
    this.informeFinalDTO.datosAsignatura = [];
    this.informeFinalDTO.evaluacionDocente = {};
    this.informeFinalDTO.fortalezas = [];
    this.informeFinalDTO.debilidades = [];
    this.informeFinalDTO.apreciacionGlobalFortalezas = [];
    this.informeFinalDTO.apreciacionGlobalDebilidades = [];
    this.informeFinalDTO.accionesMejoraDocente = {};
    this.informeFinalDTO.accionesMejoraDocente.accion1 = [];
    this.informeFinalDTO.accionesMejoraDocente.accion2 = [];
    this.informeFinalDTO.accionesMejoraDocente.accion3 = [];
    this.informeFinalDTO.accionesMejoraDocente.accion4 = [];
    this.informeFinalDTO.accionesMejoraDocente.accionLaboratorioTutoria = [];
    this.informeFinalDTO.accionesMejoraDocente.otrasAcciones = [];
    this.informeFinalDTO.tematicaCapacitaciones = [];
    this.informeFinalDTO.conclusiones = [];
    this.informeFinalDTO.anexo1 = [];
    this.informeFinalDTO.recomendaciones = [];

    this.informeFinalDTO.anexo2 = [];
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
        if (this.tareaDocenteDocenciaDTO.informeFinal) {
          this.informeFinalDTO = this.tareaDocenteDocenciaDTO.informeFinal;
          console.log(this.tareaDocenteDocenciaDTO.informeFinal);
          console.log(this.informeFinalDTO);
          console.log(this.informeFinalDTO.datosGenerales);
          console.log(this.informeFinalDTO.objetivo);

        }
      }
    });
  }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['revisar-tarea-asignada-docencia']);
  }

  resetData() {
    this.dataString.title = '';
    this.dataString.data = '';
    this.data = '';
  }

  openModalAddString() {
    const dialogRef = this.dialog.open(ModalStringComponent, {
      width: '500px',
      data: this.dataString,
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.data = formValue.data;

        if (this.dataString.title == 'ANTECEDENTE') {
          if (this.dataString.data) {
            this.informeFinalDTO.antecedentes =
              this.informeFinalDTO.antecedentes?.filter(
                (item) => item !== this.dataString.data
              );
          }
          this.informeFinalDTO.antecedentes?.push(this.data);
          this.resetData();
        } else if (this.dataString.title == 'OBJETIVO') {
          this.informeFinalDTO.objetivo = this.data;
          this.resetData();
        } else if (this.dataString.title == 'FORTALEZA') {
          if (this.dataString.data) {
            this.informeFinalDTO.fortalezas =
              this.informeFinalDTO.fortalezas?.filter(
                (item) => item !== this.dataString.data
              );
          }
          this.informeFinalDTO.fortalezas?.push(this.data);
          this.resetData();
        } else if (this.dataString.title == 'DEBILIDAD') {
          if (this.dataString.data) {
            this.informeFinalDTO.debilidades =
              this.informeFinalDTO.debilidades?.filter(
                (item) => item !== this.dataString.data
              );
          }
          this.informeFinalDTO.debilidades?.push(this.data);
          this.resetData();
        } else if (this.dataString.title == 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES FORTALEZA') {
          if (this.dataString.data) {
            this.informeFinalDTO.apreciacionGlobalFortalezas =
              this.informeFinalDTO.apreciacionGlobalFortalezas?.filter(
                (item) => item !== this.dataString.data
              );
          }
          this.informeFinalDTO.apreciacionGlobalFortalezas?.push(this.data);
          this.resetData();
        } else if (this.dataString.title == 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES DEBILIDAD') {
          if (this.dataString.data) {
            this.informeFinalDTO.apreciacionGlobalDebilidades =
              this.informeFinalDTO.apreciacionGlobalDebilidades?.filter(
                (item) => item !== this.dataString.data
              );
          }
          this.informeFinalDTO.apreciacionGlobalDebilidades?.push(this.data);
          this.resetData();
        } else if (this.dataString.title == 'Acción 1: Relacionado con mejoras al plan analítico de las asignaturas:') {
          if (this.dataString.data) {
            if (this.informeFinalDTO.accionesMejoraDocente) {
              this.informeFinalDTO.accionesMejoraDocente.accion1 =
                this.informeFinalDTO.accionesMejoraDocente?.accion1?.filter(
                  (item) => item !== this.dataString.data
                );
            }
          }
          this.informeFinalDTO.accionesMejoraDocente?.accion1?.push(this.data);
          this.resetData();
        } else if (this.dataString.title == 'Acción 2: Relacionadas con los estudiantes y mejorar el proceso enseñanza-aprendizaje') {
          if (this.informeFinalDTO.accionesMejoraDocente) {
            this.informeFinalDTO.accionesMejoraDocente.accion2 =
              this.informeFinalDTO.accionesMejoraDocente?.accion2?.filter(
                (item) => item !== this.dataString.data
              );
          }
          this.informeFinalDTO.accionesMejoraDocente?.accion2?.push(this.data);
          this.resetData();
        } else if (this.dataString.title == 'Acción 3: Relacionadas con la mejora de sus capacidades docentes') {
          if (this.informeFinalDTO.accionesMejoraDocente) {
            this.informeFinalDTO.accionesMejoraDocente.accion3 =
              this.informeFinalDTO.accionesMejoraDocente?.accion3?.filter(
                (item) => item !== this.dataString.data
              );
          }
          this.informeFinalDTO.accionesMejoraDocente?.accion3?.push(this.data);
          this.resetData();
        } else if (this.dataString.title == 'Acción 4: Otros ámbitos de mejora') {
          if (this.informeFinalDTO.accionesMejoraDocente) {
            this.informeFinalDTO.accionesMejoraDocente.accion4 =
              this.informeFinalDTO.accionesMejoraDocente?.accion4?.filter(
                (item) => item !== this.dataString.data
              );
          }
          this.informeFinalDTO.accionesMejoraDocente?.accion4?.push(this.data);
          this.resetData();
        } else if (this.dataString.title == 'Acciones tomadas para la solución de las novedades que se hayan presentado en clases y laboratorios y tutorías') {
          if (this.informeFinalDTO.accionesMejoraDocente) {
            this.informeFinalDTO.accionesMejoraDocente.accionLaboratorioTutoria =
              this.informeFinalDTO.accionesMejoraDocente?.accionLaboratorioTutoria?.filter(
                (item) => item !== this.dataString.data
              );
          }
          this.informeFinalDTO.accionesMejoraDocente?.accionLaboratorioTutoria?.push(this.data);
          this.resetData();
        } else if (this.dataString.title == 'Otras Acciones') {
          if (this.informeFinalDTO.accionesMejoraDocente) {
            this.informeFinalDTO.accionesMejoraDocente.otrasAcciones =
              this.informeFinalDTO.accionesMejoraDocente?.otrasAcciones?.filter(
                (item) => item !== this.dataString.data
              );
          }
          this.informeFinalDTO.accionesMejoraDocente?.otrasAcciones?.push(this.data);
          this.resetData();
        } else if (this.dataString.title == 'CONCLUSIÓN') {
          if (this.dataString.data) {
            this.informeFinalDTO.conclusiones =
              this.informeFinalDTO.conclusiones?.filter(
                (item) => item !== this.dataString.data
              );
          }
          this.informeFinalDTO.conclusiones?.push(this.data);
          this.resetData();
        } else if (this.dataString.title == 'RECOMENDACIÓN') {
          if (this.dataString.data) {
            this.informeFinalDTO.recomendaciones =
              this.informeFinalDTO.recomendaciones?.filter(
                (item) => item !== this.dataString.data
              );
          }
          this.informeFinalDTO.recomendaciones?.push(this.data);
          this.resetData();
        } else if (this.dataString.title == 'ANEXO') {
          if (this.dataString.data) {
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

  addAntecedentes() {
    this.dataString.title = 'ANTECEDENTE';
    this.dataString.data = '';
    this.openModalAddString();
  }

  editarAntecedente(antecedente: string) {
    this.dataString.title = 'ANTECEDENTE';
    this.dataString.data = antecedente;
    this.openModalAddString();
  }

  addObjetivo() {
    this.dataString.title = 'OBJETIVO';
    this.dataString.data = '';
    this.openModalAddString();
  }

  editarObjetivo(objetivo: string) {
    this.dataString.title = 'OBJETIVO';
    this.dataString.data = objetivo;
    this.openModalAddString();
  }


  addFortaleza() {
    this.dataString.title = 'FORTALEZA';
    this.dataString.data = '';
    this.openModalAddString();
  }

  editarFortaleza(fortaleza: string) {
    this.dataString.title = 'FORTALEZA';
    this.dataString.data = fortaleza
    this.openModalAddString();
  }

  eliminarFortaleza(fortaleza: string) {
    this.informeFinalDTO.fortalezas =
      this.informeFinalDTO.fortalezas?.filter(
        (item) => item !== fortaleza
      );
  }

  addDebilidad() {
    this.dataString.title = 'DEBILIDAD';
    this.dataString.data = '';
    this.openModalAddString();
  }

  editarDebilidad(debilidad: string) {
    this.dataString.title = 'DEBILIDAD';
    this.dataString.data = debilidad;
    this.openModalAddString();
  }

  eliminiarDebilidad(debilidad: string) {
    this.informeFinalDTO.debilidades =
      this.informeFinalDTO.debilidades?.filter(
        (item) => item !== debilidad
      );
  }

  addFortalezaApreciacionEstudiantes() {
    this.dataString.title = 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES FORTALEZA';
    this.dataString.data = '';
    this.openModalAddString();
  }

  editarFortalezaApreciacionEstudiantes(fortaleza: string) {
    this.dataString.title = 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES FORTALEZA';
    this.dataString.data = fortaleza;
    this.openModalAddString();
  }

  eliminarFortalezaApreciacionEstudiantes(fortaleza: string) {
    this.informeFinalDTO.apreciacionGlobalFortalezas =
      this.informeFinalDTO.apreciacionGlobalFortalezas?.filter(
        (item) => item !== fortaleza
      );
  }

  addDebilidadApreciacionEstudiantes() {
    this.dataString.title = 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES DEBILIDAD';
    this.dataString.data = '';
    this.openModalAddString();
  }

  editarDebilidadApreciacionEstudiantes(debilidad: string) {
    this.dataString.title = 'APRECIACIÓN GLOBAL DE LOS ESTUDIANTES DEBILIDAD';
    this.dataString.data = debilidad;
    this.openModalAddString();
  }

  eliminarDebilidadApreciacionEstudiantes(debilidad: string) {
    this.informeFinalDTO.apreciacionGlobalDebilidades =
      this.informeFinalDTO.apreciacionGlobalDebilidades?.filter(
        (item) => item !== debilidad
      );
  }

  addAccion1() {
    this.dataString.title = 'Acción 1: Relacionado con mejoras al plan analítico de las asignaturas:';
    this.dataString.data = '';
    this.openModalAddString();
  }

  editarAccion1(accion1: string) {
    this.dataString.title = 'Acción 1: Relacionado con mejoras al plan analítico de las asignaturas:';
    this.dataString.data = accion1;
    this.openModalAddString();
  }

  eliminarAccion1(accion1: string){
    this.informeFinalDTO.accionesMejoraDocente.accion1 =
      this.informeFinalDTO.accionesMejoraDocente?.accion1?.filter(
        (item) => item !== accion1
      );
  }

  addAccion2() {
    this.dataString.title = 'Acción 2: Relacionadas con los estudiantes y mejorar el proceso enseñanza-aprendizaje';
    this.dataString.data = '';
    this.openModalAddString();
  }

  editarAccion2(accion2: string) {
    this.dataString.title = 'Acción 2: Relacionadas con los estudiantes y mejorar el proceso enseñanza-aprendizaje';
    this.dataString.data = accion2;
    this.openModalAddString();
  }

  eliminarAccion2(accion2: string) {
    this.informeFinalDTO.accionesMejoraDocente.accion2 =
      this.informeFinalDTO.accionesMejoraDocente?.accion2?.filter(
        (item) => item !== accion2
      );
  }

  addAccion3() {
    this.dataString.title = 'Acción 3: Relacionadas con la mejora de sus capacidades docentes';
    this.dataString.data = '';
    this.openModalAddString();
  }

  editarAccion3(accion3: string) {
    this.dataString.title = 'Acción 3: Relacionadas con la mejora de sus capacidades docentes';
    this.dataString.data = accion3;
    this.openModalAddString();
  }

  eliminarAccion3(accion3: string) {
    this.informeFinalDTO.accionesMejoraDocente.accion3 =
      this.informeFinalDTO.accionesMejoraDocente?.accion3?.filter(
        (item) => item !== accion3
      );
  }

  addAccion4() {
    this.dataString.title = 'Acción 4: Otros ámbitos de mejora';
    this.dataString.data = '';
    this.openModalAddString();
  }

  editarAccion4(accion4: string) {
    this.dataString.title = 'Acción 4: Otros ámbitos de mejora';
    this.dataString.data = accion4;
    this.openModalAddString();
  }

  eliminarAccion4(accion4: string) {
    this.informeFinalDTO.accionesMejoraDocente.accion4 =
      this.informeFinalDTO.accionesMejoraDocente?.accion4?.filter(
        (item) => item !== accion4
      );
  }

  addAccionLaboratorioTutoria() {
    this.dataString.title = 'Acciones tomadas para la solución de las novedades que se hayan presentado en clases y laboratorios y tutorías';
    this.dataString.data = '';
    this.openModalAddString();
  }

  editarAccionLaboratorioTutoria(accionLaboratorioTutoria: string) {
    this.dataString.title = 'Acciones tomadas para la solución de las novedades que se hayan presentado en clases y laboratorios y tutorías';
    this.dataString.data = accionLaboratorioTutoria;
    this.openModalAddString();
  }

  eliminarAccionLaboratorioTutoria(accionLaboratorioTutoria: string) {
    this.informeFinalDTO.accionesMejoraDocente.accionLaboratorioTutoria =
      this.informeFinalDTO.accionesMejoraDocente?.accionLaboratorioTutoria?.filter(
        (item) => item !== accionLaboratorioTutoria
      );
  }

  addOtrasAcciones() {
    this.dataString.title = 'Otras Acciones';
    this.dataString.data = '';
    this.openModalAddString();
  }

  editarOtrasAcciones(otrasAcciones: string) {
    this.dataString.title = 'Otras Acciones';
    this.dataString.data = otrasAcciones;
    this.openModalAddString();
  }

  eliminarOtrasAcciones(otrasAcciones: string) {
    this.informeFinalDTO.accionesMejoraDocente.otrasAcciones =
      this.informeFinalDTO.accionesMejoraDocente?.otrasAcciones?.filter(
        (item) => item !== otrasAcciones
      );
  }

  addConclusion() {
    this.dataString.title = 'CONCLUSIÓN';
    this.dataString.data = '';
    this.openModalAddString();
  }

  editarConclusion(conclusiones: string) {
    this.dataString.title = 'CONCLUSIÓN';
    this.dataString.data = conclusiones;
    this.openModalAddString();
  }

  eliminarConclusion(conclusiones: string){
    this.informeFinalDTO.conclusiones =
      this.informeFinalDTO.conclusiones?.filter(
        (item) => item !== conclusiones
      );
  }

  addRecomendacion() {
    this.dataString.title = 'RECOMENDACIÓN';
    this.dataString.data = '';
    this.openModalAddString();
  }

  editarRecomendacion(recomendaciones: string) {
    this.dataString.title = 'RECOMENDACIÓN';
    this.dataString.data = recomendaciones;
    this.openModalAddString();
  }

  eliminarRecomendacion(recomendaciones: string) {
    this.informeFinalDTO.recomendaciones =
      this.informeFinalDTO.recomendaciones?.filter(
        (item) => item !== recomendaciones
      );
  }

  addAnexo1() {
    this.dataString.title = 'ANEXO';
    this.dataString.data = '';
    this.openModalAddString();
  }

  editarAnexo1(anexo1: string) {
    this.dataString.title = 'ANEXO';
    this.dataString.data = anexo1;
    this.openModalAddString();
  }

  eliminarAnexo1(anexo1: string) {
    this.informeFinalDTO.anexo1 =
      this.informeFinalDTO.anexo1?.filter(
        (item) => item !== anexo1
      );
  }

  addAnexo2() {
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


  addDatosInformativos(datosAsignatura?: DatosAsignatura) {
    const dialogRef = this.dialog.open(ModalAsignaturaComponent, {
      width: '700px',
      data: datosAsignatura,
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        if (datosAsignatura) {
          formValue.estudiantesMatriculados = datosAsignatura.estudiantesMatriculados;
          formValue.estudiantesRetirados = datosAsignatura.estudiantesRetirados;
          formValue.estudiantesReprobados = datosAsignatura.estudiantesReprobados;
          formValue.estudiantesAprobados = datosAsignatura.estudiantesAprobados;
          formValue.promedioRendimientoAcademico = datosAsignatura.promedioRendimientoAcademico;
          formValue.desviacionEstandar = datosAsignatura.desviacionEstandar;
          formValue.promedioFinalRendimientoAcademico = datosAsignatura.promedioFinalRendimientoAcademico;
          formValue.promedioFinalDesviacionEstandar = datosAsignatura.promedioFinalDesviacionEstandar;
          formValue.tutoriaEstudiantesPromedioMenor14 = datosAsignatura.tutoriaEstudiantesPromedioMenor14;
          formValue.tutoriaEstudiantesPromedioMenor14Asistieron = datosAsignatura.tutoriaEstudiantesPromedioMenor14Asistieron;
          formValue.tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron = datosAsignatura.tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron;
          this.informeFinalDTO.datosAsignatura =
            this.informeFinalDTO.datosAsignatura?.filter(
              (item) => item.nrc !== datosAsignatura.nrc
            );

        }
        this.informeFinalDTO.datosAsignatura?.push(formValue);
      }
    });
  }

  eliminarDatosInformativos(datosAsignatura?: DatosAsignatura) {
    this.informeFinalDTO.datosAsignatura =
      this.informeFinalDTO.datosAsignatura?.filter(
        (item) => item.nrc !== datosAsignatura.nrc
      );
  }


  addResultadosRendimientoAcademico(datosAsignatura?: DatosAsignatura) {
    const dialogRef = this.dialog.open(ModalRendimientoAcademicoComponent, {
      width: '700px',
      // data: this.informeFinalDTO.datosAsignatura,
      data: datosAsignatura,
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        const indiceEncontrado = this.informeFinalDTO.datosAsignatura?.findIndex(item => item.nrc === formValue.asignatura.nrc);
        if (indiceEncontrado !== -1) {
          if (indiceEncontrado != undefined) {
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesMatriculados = {};
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesMatriculados!.numeroHombres = formValue.estudiantesMatriculadosHombres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesMatriculados!.numeroMujeres = formValue.estudiantesMatriculadosMujeres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesMatriculados!.total = formValue.estudiantesMatriculadosHombres + formValue.estudiantesMatriculadosMujeres;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesRetirados = {}
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesRetirados!.numeroHombres = formValue.estudiantesRetiradosHombres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesRetirados!.numeroMujeres = formValue.estudiantesRetiradosMujeres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesRetirados!.total = formValue.estudiantesRetiradosHombres + formValue.estudiantesRetiradosMujeres;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesReprobados = {}
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesReprobados!.numeroHombres = formValue.estudiantesReprobadosHombres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesReprobados!.numeroMujeres = formValue.estudiantesReprobadosMujeres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesReprobados!.total = formValue.estudiantesReprobadosHombres + formValue.estudiantesReprobadosMujeres;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesAprobados = {};
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesAprobados!.numeroHombres = formValue.estudiantesMatriculadosHombres - formValue.estudiantesReprobadosHombres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesAprobados!.numeroMujeres = formValue.estudiantesMatriculadosMujeres - formValue.estudiantesReprobadosMujeres;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesAprobados!.total = (formValue.estudiantesMatriculadosHombres - formValue.estudiantesReprobadosHombres) + (formValue.estudiantesMatriculadosMujeres - formValue.estudiantesReprobadosMujeres);
          }
        } else {
          console.log('Elemento no encontrado.');
        }
      }
    });
  }

  eliminarResultadosRendimientoAcademico(datosAsignatura?: DatosAsignatura) {
    const indiceEncontrado = this.informeFinalDTO.datosAsignatura?.findIndex(item => item.nrc === datosAsignatura.nrc);
    if (indiceEncontrado !== -1) {
      this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesMatriculados = {};
      this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesRetirados = {}
      this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesReprobados = {}
      this.informeFinalDTO.datosAsignatura![indiceEncontrado].estudiantesAprobados = {};
    } else {
      console.log('Elemento no encontrado.');
    }
  }

  addPromedioRendimientoAcademico(datosAsignatura?: DatosAsignatura) {
    const dialogRef = this.dialog.open(ModalPromedioAcademicoComponent, {
      width: '700px',
      data: datosAsignatura,
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        const indiceEncontrado = this.informeFinalDTO.datosAsignatura?.findIndex(item => item.nrc === formValue.asignatura.nrc);
        if (indiceEncontrado !== -1) {
          if (indiceEncontrado != undefined) {
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioRendimientoAcademico = {};
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioRendimientoAcademico!.primerParcial = formValue.promedioRendimientoAcademicoIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioRendimientoAcademico!.segundoParcial = formValue.promedioRendimientoAcademicoIIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioRendimientoAcademico!.tercerParcial = formValue.promedioRendimientoAcademicoIIIUD;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].desviacionEstandar = {}
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].desviacionEstandar!.primerParcial = formValue.desviacionEstandarIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].desviacionEstandar!.segundoParcial = formValue.desviacionEstandarIIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].desviacionEstandar!.tercerParcial = formValue.desviacionEstandarIIIUD;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioFinalRendimientoAcademico = parseFloat(((formValue.promedioRendimientoAcademicoIUD + formValue.promedioRendimientoAcademicoIIUD + formValue.promedioRendimientoAcademicoIIIUD) / 3).toFixed(2));;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioFinalDesviacionEstandar = parseFloat(((formValue.desviacionEstandarIUD + formValue.desviacionEstandarIIUD + formValue.desviacionEstandarIIIUD) / 3).toFixed(2));
          }
        } else {
          console.log('Elemento no encontrado.');
        }
      }
    });
  }

  eliminarPromedioRendimientoAcademico(datosAsignatura?: DatosAsignatura) {
    const indiceEncontrado = this.informeFinalDTO.datosAsignatura?.findIndex(item => item.nrc === datosAsignatura.nrc);
    if (indiceEncontrado !== -1) {
      this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioRendimientoAcademico = {};
      this.informeFinalDTO.datosAsignatura![indiceEncontrado].desviacionEstandar = {}
      this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioFinalRendimientoAcademico = null;
      this.informeFinalDTO.datosAsignatura![indiceEncontrado].promedioFinalDesviacionEstandar = null;
    } else {
      console.log('Elemento no encontrado.');
    }
  }

  addDatosTutorias(datosAsignatura?: DatosAsignatura) {
    const dialogRef = this.dialog.open(ModalTutoriaComponent, {
      width: '800px',
      data: datosAsignatura,
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        const indiceEncontrado = this.informeFinalDTO.datosAsignatura?.findIndex(item => item.nrc === formValue.asignatura.nrc);
        if (indiceEncontrado !== -1) {
          console.log(indiceEncontrado);
          if (indiceEncontrado != undefined) {
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14 = {};
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14!.primerParcial = formValue.tutoriaEstudiantesPromedioMenor14IUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14!.segundoParcial = formValue.tutoriaEstudiantesPromedioMenor14IIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14!.tercerParcial = formValue.tutoriaEstudiantesPromedioMenor14IIIUD;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14Asistieron = {}
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14Asistieron!.primerParcial = formValue.tutoriaEstudiantesPromedioMenor14AsistieronIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14Asistieron!.segundoParcial = formValue.tutoriaEstudiantesPromedioMenor14AsistieronIIUD;
            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14Asistieron!.tercerParcial = formValue.tutoriaEstudiantesPromedioMenor14AsistieronIIIUD;

            this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron = formValue.tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron;
          }
        } else {
          console.log('Elemento no encontrado.');
        }
      }
    });
  }

  eliminarDatosTutorias(datosAsignatura?: DatosAsignatura) {
    const indiceEncontrado = this.informeFinalDTO.datosAsignatura?.findIndex(item => item.nrc === datosAsignatura.nrc);
    if (indiceEncontrado !== -1) {
      console.log(indiceEncontrado);
      if (indiceEncontrado != undefined) {
        this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14 = {};
        this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14Asistieron = {};
        this.informeFinalDTO.datosAsignatura![indiceEncontrado].tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron = null;
      }
    } else {
      console.log('Elemento no encontrado.');
    }
  }

  addCapacitacionMejoraDocente() {
    const dialogRef = this.dialog.open(ModalMejoraDocenteComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.informeFinalDTO.tematicaCapacitaciones?.push(formValue);
      }
    });
  }

  save() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas subir la información? <br><br>Al Aceptar este mensaje ya no se podran realizar cambios sobre la Actividad',
      header: 'Confirm !',
      acceptLabel: 'Sí, Acepto', // Cambia el texto del botón de aceptar
      rejectLabel: 'Cancelar', //
      accept: () => {

        this.blockedDocument = true;
        this.tareaDocenteDocencia.informeFinal = this.informeFinalDTO;
        this.tareaDocenciaService.guardarTareaParaSubir(this.tareaDocenteDocencia.id, this.informeFinalDTO)
          .subscribe({
            next: (data) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Datos Subidos con éxito'
              });

              setTimeout(() => {
                this.blockedDocument = false;
                this.router.navigate(['revisar-tarea-asignada-docencia']);
              }, 2000);
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
      },
    });

  }

  guardarBorrador() {
    this.blockedDocument = true;
    this.tareaDocenteDocencia.informeFinal = this.informeFinalDTO;
    this.tareaDocenciaService.guardarTareaComoBorrador(this.tareaDocenteDocencia.id, this.informeFinalDTO)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Datos Subidos con éxito'
          });
          this.blockedDocument = false;
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

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  getMonthName(month: number): string {
    const monthNames = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return monthNames[month];
  }

  exportDataToPDF() {

    //Datos Rendimiento Academico
    const cuerpoTablaRendimiento = [];
    for (let i = 0; i < this.informeFinalDTO.datosAsignatura.length; i++) {
      const fila = [
        { text: this.informeFinalDTO.datosAsignatura[i].asignatura, fontSize: 10, bold: true },
        { text: this.informeFinalDTO.datosAsignatura[i].nrc, fontSize: 10, bold: true },
        { text: this.informeFinalDTO.datosAsignatura[i].estudiantesMatriculados == null ? '' : this.informeFinalDTO.datosAsignatura[i].estudiantesMatriculados.numeroHombres, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].estudiantesMatriculados == null ? '' : this.informeFinalDTO.datosAsignatura[i].estudiantesMatriculados.numeroMujeres, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].estudiantesMatriculados == null ? '' : this.informeFinalDTO.datosAsignatura[i].estudiantesMatriculados.total, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].estudiantesRetirados == null ? '' : this.informeFinalDTO.datosAsignatura[i].estudiantesRetirados.numeroHombres, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].estudiantesRetirados == null ? '' : this.informeFinalDTO.datosAsignatura[i].estudiantesRetirados.numeroMujeres, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].estudiantesRetirados == null ? '' : this.informeFinalDTO.datosAsignatura[i].estudiantesRetirados.total, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].estudiantesReprobados == null ? '' : this.informeFinalDTO.datosAsignatura[i].estudiantesReprobados.numeroHombres, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].estudiantesReprobados == null ? '' : this.informeFinalDTO.datosAsignatura[i].estudiantesReprobados.numeroMujeres, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].estudiantesReprobados == null ? '' : this.informeFinalDTO.datosAsignatura[i].estudiantesReprobados.total, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].estudiantesAprobados == null ? '' : this.informeFinalDTO.datosAsignatura[i].estudiantesAprobados.numeroHombres, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].estudiantesAprobados == null ? '' : this.informeFinalDTO.datosAsignatura[i].estudiantesAprobados.numeroMujeres, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].estudiantesAprobados == null ? '' : this.informeFinalDTO.datosAsignatura[i].estudiantesAprobados.total, fontSize: 10 },
      ];
      cuerpoTablaRendimiento.push(fila);
    }

    //Datos Promedio Rendimiento Academico
    const cuerpoTablaPromedioRendimiento = [];
    for (let i = 0; i < this.informeFinalDTO.datosAsignatura.length; i++) {
      const fila = [
        { text: this.informeFinalDTO.datosAsignatura[i].nrc, fontSize: 10, bold: true },
        { text: this.informeFinalDTO.datosAsignatura[i].promedioRendimientoAcademico == null ? '' : this.informeFinalDTO.datosAsignatura[i].promedioRendimientoAcademico.primerParcial, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].promedioRendimientoAcademico == null ? '' : this.informeFinalDTO.datosAsignatura[i].promedioRendimientoAcademico.segundoParcial, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].promedioRendimientoAcademico == null ? '' : this.informeFinalDTO.datosAsignatura[i].promedioRendimientoAcademico.tercerParcial, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].promedioFinalRendimientoAcademico == null ? '' : this.informeFinalDTO.datosAsignatura[i].promedioFinalRendimientoAcademico, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].desviacionEstandar == null ? '' : this.informeFinalDTO.datosAsignatura[i].desviacionEstandar.primerParcial, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].desviacionEstandar == null ? '' : this.informeFinalDTO.datosAsignatura[i].desviacionEstandar.segundoParcial, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].desviacionEstandar == null ? '' : this.informeFinalDTO.datosAsignatura[i].desviacionEstandar.tercerParcial, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].promedioFinalDesviacionEstandar == null ? '' : this.informeFinalDTO.datosAsignatura[i].promedioFinalDesviacionEstandar, fontSize: 10 },
      ];
      cuerpoTablaPromedioRendimiento.push(fila);
    }

    //Datos Tutorias
    const cuerpoTablaTutorias = [];
    for (let i = 0; i < this.informeFinalDTO.datosAsignatura.length; i++) {
      const fila = [
        { text: this.informeFinalDTO.datosAsignatura[i].nrc, fontSize: 10, bold: true },
        { text: this.informeFinalDTO.datosAsignatura[i].tutoriaEstudiantesPromedioMenor14 == null ? '' : this.informeFinalDTO.datosAsignatura[i].tutoriaEstudiantesPromedioMenor14.primerParcial, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].tutoriaEstudiantesPromedioMenor14 == null ? '' : this.informeFinalDTO.datosAsignatura[i].tutoriaEstudiantesPromedioMenor14.segundoParcial, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].tutoriaEstudiantesPromedioMenor14 == null ? '' : this.informeFinalDTO.datosAsignatura[i].tutoriaEstudiantesPromedioMenor14.tercerParcial, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].tutoriaEstudiantesPromedioMenor14Asistieron == null ? '' : this.informeFinalDTO.datosAsignatura[i].tutoriaEstudiantesPromedioMenor14Asistieron.primerParcial, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].tutoriaEstudiantesPromedioMenor14Asistieron == null ? '' : this.informeFinalDTO.datosAsignatura[i].tutoriaEstudiantesPromedioMenor14Asistieron.segundoParcial, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].tutoriaEstudiantesPromedioMenor14Asistieron == null ? '' : this.informeFinalDTO.datosAsignatura[i].tutoriaEstudiantesPromedioMenor14Asistieron.tercerParcial, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron == null ? '' : this.informeFinalDTO.datosAsignatura[i].tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron, fontSize: 10 },
      ];
      cuerpoTablaTutorias.push(fila);
    }

    // Crear el cuerpo de la tabla
    const cuerpoTablaDatosInformativos = [];
    for (let i = 0; i < this.informeFinalDTO.datosAsignatura.length; i++) {
      const fila = [
        { text: this.informeFinalDTO.datosAsignatura[i].carrera, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].asignatura, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].componente, fontSize: 10 },
        { text: this.informeFinalDTO.datosAsignatura[i].nrc, fontSize: 10 },
      ];
      cuerpoTablaDatosInformativos.push(fila);
    }
    //Tematica Capacitaciones
    const cuerpoTablaCapacitaciones = [];
    for (let i = 0; i < this.informeFinalDTO.tematicaCapacitaciones.length; i++) {
      const fila = [
        { text: this.informeFinalDTO.tematicaCapacitaciones[i].areaConocimiento, fontSize: 10 },
        { text: this.informeFinalDTO.tematicaCapacitaciones[i].tema1, fontSize: 10 },
        { text: this.informeFinalDTO.tematicaCapacitaciones[i].tema2, fontSize: 10 },
        { text: this.informeFinalDTO.tematicaCapacitaciones[i].tema3, fontSize: 10 },
        { text: this.informeFinalDTO.tematicaCapacitaciones[i].tema4, fontSize: 10 },
      ];
      cuerpoTablaCapacitaciones.push(fila);
    }

    //Cuerpo Tabla Anexos 2
    const cuerpoTablaAnexos2 = [];
    for (let i = 0; i < this.informeFinalDTO.anexo2.length; i++) {
      const fila = [
        { text: i + 1 },
        { text: this.informeFinalDTO.anexo2[i].componente, fontSize: 10 },
        { text: this.informeFinalDTO.anexo2[i].respuestaCerrada == 'SI' ? 'X' : '', fontSize: 10 },
        { text: this.informeFinalDTO.anexo2[i].respuestaCerrada == 'NO' ? 'X' : '', fontSize: 10 },
        { text: this.informeFinalDTO.anexo2[i].linkEvidencia, fontSize: 10 },
        { text: this.informeFinalDTO.anexo2[i].consideracionParaEvidencia, fontSize: 10 },
      ];
      cuerpoTablaAnexos2.push(fila);
    }

    const cuerpoListaAntecedentes = [];
    for (let i = 0; i < this.informeFinalDTO.antecedentes.length; i++) {
      cuerpoListaAntecedentes.push({ text: '• ' + this.informeFinalDTO.antecedentes[i].split('\n').join(''), margin: [20, 5, 0, 5] });
    }

    const cuerpoListaFortalezas = [];
    for (let i = 0; i < this.informeFinalDTO.fortalezas.length; i++) {
      cuerpoListaFortalezas.push({ text: '• ' + this.informeFinalDTO.fortalezas[i].split('\n').join(''), margin: [60, 5, 0, 5] });
    }

    const cuerpoListaDebilidades = [];
    for (let i = 0; i < this.informeFinalDTO.debilidades.length; i++) {
      cuerpoListaDebilidades.push({ text: '• ' + this.informeFinalDTO.debilidades[i].split('\n').join(''), margin: [60, 5, 0, 0] });
    }

    const apreciacionGlobalListaFortalezas = [];
    for (let i = 0; i < this.informeFinalDTO.apreciacionGlobalFortalezas.length; i++) {
      apreciacionGlobalListaFortalezas.push({ text: '• ' + this.informeFinalDTO.apreciacionGlobalFortalezas[i].split('\n').join(''), margin: [60, 5, 0, 0] });
    }

    const apreciacionGlobalListaDebilidades = [];
    for (let i = 0; i < this.informeFinalDTO.apreciacionGlobalDebilidades.length; i++) {
      apreciacionGlobalListaDebilidades.push({ text: '• ' + this.informeFinalDTO.apreciacionGlobalDebilidades[i].split('\n').join(''), margin: [60, 5, 0, 0] });
    }

    const accion1Lista = [];
    for (let i = 0; i < this.informeFinalDTO.accionesMejoraDocente.accion1.length; i++) {
      accion1Lista.push({ text: '• ' + this.informeFinalDTO.accionesMejoraDocente.accion1[i].split('\n').join(''), margin: [60, 5, 0, 0] });
    }

    const accion2Lista = [];
    for (let i = 0; i < this.informeFinalDTO.accionesMejoraDocente.accion2.length; i++) {
      accion2Lista.push({ text: '• ' + this.informeFinalDTO.accionesMejoraDocente.accion2[i].split('\n').join(''), margin: [60, 5, 0, 0] });
    }

    const accion3Lista = [];
    for (let i = 0; i < this.informeFinalDTO.accionesMejoraDocente.accion3.length; i++) {
      accion3Lista.push({ text: '• ' + this.informeFinalDTO.accionesMejoraDocente.accion3[i].split('\n').join(''), margin: [60, 5, 0, 0] });
    }

    const accion4Lista = [];
    for (let i = 0; i < this.informeFinalDTO.accionesMejoraDocente.accion4.length; i++) {
      accion4Lista.push({ text: '• ' + this.informeFinalDTO.accionesMejoraDocente.accion4[i].split('\n').join(''), margin: [60, 5, 0, 0] });
    }

    const accion5Lista = [];
    for (let i = 0; i < this.informeFinalDTO.accionesMejoraDocente.accionLaboratorioTutoria.length; i++) {
      accion5Lista.push({ text: '• ' + this.informeFinalDTO.accionesMejoraDocente.accionLaboratorioTutoria[i].split('\n').join(''), margin: [60, 5, 0, 0] });
    }

    const accion6Lista = [];
    for (let i = 0; i < this.informeFinalDTO.accionesMejoraDocente.otrasAcciones.length; i++) {
      accion6Lista.push({ text: '• ' + this.informeFinalDTO.accionesMejoraDocente.otrasAcciones[i].split('\n').join(''), margin: [60, 5, 0, 0] });
    }

    const conclusionesLista = [];
    for (let i = 0; i < this.informeFinalDTO.conclusiones.length; i++) {
      conclusionesLista.push({ text: '• ' + this.informeFinalDTO.conclusiones[i].split('\n').join(''), margin: [40, 5, 0, 0] });
    }

    const recomendacionesLista = [];
    for (let i = 0; i < this.informeFinalDTO.recomendaciones.length; i++) {
      recomendacionesLista.push({ text: '• ' + this.informeFinalDTO.recomendaciones[i].split('\n').join(''), margin: [40, 5, 0, 0] });
    }

    const anexo1Lista = [];
    for (let i = 0; i < this.informeFinalDTO.anexo1.length; i++) {
      anexo1Lista.push({ text: '• ' + this.informeFinalDTO.anexo1[i].split('\n').join(''), margin: [40, 5, 0, 0] });
    }

    // const footer = (currentPage, pageCount) => {
    //   return {
    //     text: `Página ${currentPage.toString()} de ${pageCount.toString()}`,
    //     alignment: 'center'
    //   };
    // };

    const footer = (currentPage, pageCount) => {
      return {
        table: {
          widths: ['*', '*'], // Ancho de las dos columnas
          body: [
            [
              [{ text: `Izquierda - Página ${currentPage.toString()} de ${pageCount.toString()}`, alignment: 'left' }],
              [{ text: 'Derecha - Información adicional', alignment: 'right' }]
            ]
          ]
        },
        margin: [40, 0, 40, 0]
        // layout: 'noBorders' // Elimina los bordes de la tabla
      };
    };

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} de ${this.getMonthName(currentDate.getMonth())} de ${currentDate.getFullYear()}`;


    const pdfDefinition: any = {
      // footer,
      content: [
        // {
        //   image: this.getBase64ImageFromURL('https://www.espe.edu.ec/wp-content/uploads/2018/11/espe.png'),
        //   width: 200, // ajusta el ancho según tus necesidades
        //   height: 150 // ajusta la altura según tus necesidades
        // },
        {
          style: 'tableExample',
          table: {
            widths: ['auto', '*', 'auto', 'auto'],
            body: [
              [{ text: '', bold: true }, { text: 'INFORME DE GESTIÓN DOCENTE', alignment: 'center', bold: true }, { text: 'Período académico', bold: true }, '****'],
              [{ text: '', bold: true }, { text: 'DEPARTAMENTO DE CIENCIAS DE ENERGÍA Y MECÁNICA', alignment: 'center', bold: true }, { text: 'No. página', bold: true }, '1 de -'],
            ]
          }
        },
        {
          text: '\n1. DATOS GENERALES\n\n',
          bold: true
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            body: [
              [{ text: 'Área de conocimiento', bold: true }, this.informeFinalDTO.datosGenerales.areaConocimiento],
              [{ text: 'Nombre del Docente que presenta el informe', bold: true }, this.informeFinalDTO.datosGenerales.nombreDocentePresentaInforme],
              [{ text: 'Nombre del Coordinador de Área de conocimiento', bold: true }, this.informeFinalDTO.datosGenerales.nombreCoordinadorArea]
            ]
          }, margin: [20, 0, 20, 0]
        },
        {
          text: '\n2. ANTECEDENTES',
          bold: true
        },
        cuerpoListaAntecedentes,
        {
          text: '\n3. OBJETIVO',
          bold: true
        },
        {
          text: '• ' + this.informeFinalDTO.objetivo.split('\n').join(''),
          margin: [20, 0, 0, 0]
        },
        {
          text: '\n4. DESARROLLO Y ANÁLISIS',
          bold: true
        },
        {
          text: '\n4.1. DATOS INFORMATIVOS',
          bold: true,
          margin: [20, 0, 0, 0]
        },
        {
          style: 'tablaEjemplo',
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              // Encabezado de la tabla
              [{ text: 'CARRERA', bold: true }, { text: 'ASIGNATURA', bold: true }, { text: 'COMPONENTE DOCENCIA/PRACTICO', bold: true }, { text: 'NRC', bold: true }],
              // Cuerpo de la tabla
              ...cuerpoTablaDatosInformativos
            ]
          }
        },
        {
          text: '\n4.2. RESULTADOS RENDIMIENTO ACADÉMICO',
          bold: true,
          margin: [20, 0, 0, 0]
        },
        {
          text: 'A con, se presentan los datos estadísticos de rendimiento académico de los estudiantes en las asignaturas asignadas en el presente período.\n\n',
          margin: [20, 0, 0, 0],
          fontSize: 10,
        },
        {
          style: 'tablaEjemplo',
          table: {
            headerRows: 3,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],

            // widths: ['*', 'auto', 'auto'],
            body: [
              // Encabezado de la tabla
              // [{ text: 'Header with Colspan = 14', style: 'tableHeader', alignment: 'center' },{},{},{},{},{},{},{},{},{},{},{},{}, {colSpan: 13, text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
              // [{ text: 'Header 1', style: 'tableHeader', alignment: 'center' }, { text: 'Header 2', style: 'tableHeader', alignment: 'center' }, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
              // [{ text: 'Nombre', colSpan: 13 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
              [{ rowSpan: 3, text: 'ASIGNATURA', bold: true }, { rowSpan: 3, text: 'NRC', bold: true }, { text: 'CONDICIÓN (Nro ESTUDIANTES)', colSpan: 12, alignment: 'center', bold: true }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
              ['a', 'a', { text: 'ESTUDIANTES MATRICULADOS', colSpan: 3, alignment: 'center', bold: true }, {}, {}, { text: 'ESTUDIANTES RETIRADOS', colSpan: 3, alignment: 'center', bold: true }, {}, {}, { text: 'ESTUDIANTES REPROBADOS', colSpan: 3, alignment: 'center', bold: true }, {}, {}, { text: 'ESTUDIANTES APROBADOS', colSpan: 3, alignment: 'center', bold: true }, {}, {}],
              ['a', 'a', { text: 'HOMBRES', fontSize: 6, bold: true, alignment: 'center' }, { text: 'MUJERES', fontSize: 6, bold: true, alignment: 'center' }, { text: 'TOTAL', fontSize: 6, bold: true, alignment: 'center' }, { text: 'HOMBRES', fontSize: 6, bold: true, alignment: 'center' }, { text: 'MUJERES', fontSize: 6, bold: true, alignment: 'center' }, { text: 'TOTAL', fontSize: 6, bold: true, alignment: 'center' }, { text: 'HOMBRES', fontSize: 6, bold: true, alignment: 'center' }, { text: 'MUJERES', fontSize: 6, bold: true, alignment: 'center' }, { text: 'TOTAL', fontSize: 6, bold: true, alignment: 'center' }, { text: 'HOMBRES', fontSize: 6, bold: true, }, { text: 'MUJERES', fontSize: 6, bold: true, }, { text: 'TOTAL', fontSize: 6, bold: true, }],
              // // Cuerpo de la tabla
              ...cuerpoTablaRendimiento
            ]
          }
        },
        {
          text: '\nEl promedio de rendimiento académico de los estudiantes en las asignaturas impartidas fue el siguiente: (Llene los cuadros según los NRC asignados en cada modalidad de estudio. Elimine el cuadro/s que no corresponda a la modalidad de estudios en la que trabaja).\n\n'
        },
        {
          style: 'tablaEjemplo',
          table: {
            headerRows: 3,
            widths: ['auto', '*', '*', '*', 'auto', '*', '*', '*', 'auto'],
            body: [
              // Encabezado de la tabla
              [{ rowSpan: 3, text: '\n\n\nNRC', bold: true }, { text: 'PROMEDIO (Calificaciones)', colSpan: 8, alignment: 'center', bold: true }, {}, {}, {}, {}, {}, {}, {}],
              ['', { text: 'Promedio de Rendimiento Académico', colSpan: 3, alignment: 'center', bold: true }, {}, {}, { rowSpan: 2, text: '\nPromedio final de Rendimiento Académico', alignment: 'center', bold: true }, { text: 'Desviación Estándar', colSpan: 3, alignment: 'center', bold: true }, {}, {}, { rowSpan: 2, text: '\nPromedio final de Desviacón Estándar', alignment: 'center', bold: true }],
              ['', { text: 'I-UD', alignment: 'center', bold: true }, { text: 'II-UD', alignment: 'center', bold: true }, { text: 'III-UD', alignment: 'center', bold: true }, '', { text: 'I-UD', alignment: 'center', bold: true }, { text: 'II-UD', alignment: 'center', bold: true }, { text: 'III-UD', alignment: 'center', bold: true }, { text: 'MUJERES', alignment: 'center' }],
              // // Cuerpo de la tabla
              ...cuerpoTablaPromedioRendimiento
            ]
          }
        },
        {
          text: '\n5. TUTORÍAS',
          bold: true
        },
        {
          text: 'A continuación, se detallan los resultados de las tutorías de reforzamiento. Detallar las estrategias planteadas y su respectivo análisis:\n\n',
          margin: [20, 0, 0, 0]
        },
        {
          style: 'tablaEjemplo',
          table: {
            headerRows: 2,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              // Encabezado de la tabla
              [{ rowSpan: 2, text: 'NRC', bold: true }, { text: '# estudiantes promedio menor de 14', colSpan: 3, alignment: 'center', bold: true }, {}, {}, { text: '# estudiantes promedio menor de 14 asistieron a tutorías', colSpan: 3, alignment: 'center', bold: true }, {}, {}, { rowSpan: 2, text: '# estudiantes promedio menor de 14 asistieron a tutorías y NO aprobaron', alignment: 'center', bold: true }],
              ['', { text: 'I-UD', alignment: 'center', bold: true }, { text: 'II-UD', alignment: 'center', bold: true }, { text: 'III-UD', alignment: 'center', bold: true }, { text: 'I-UD', alignment: 'center', bold: true }, { text: 'II-UD', alignment: 'center', bold: true }, { text: 'III-UD', alignment: 'center', bold: true }, ''],
              // // Cuerpo de la tabla
              ...cuerpoTablaTutorias
            ]
          }
        },
        {
          text: '\n6. EVALUACIÓN DOCENTE',
          bold: true
        },
        {
          text: '\n6.1 EVALUACIÓN',
          bold: true,
          margin: [20, 0, 0, 0]
        },
        {
          text: '1 (No, Nada, Mal)…………………….5 (Si, Mucho, Muy bien)',
          margin: [20, 0, 0, 0]
        },
        {
          text: 'Favor expresar la razón de la calificación',
          margin: [20, 0, 0, 0]
        },
        {
          style: 'tablaEjemplo',
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', '*'],
            body: [
              [{}, { text: 'COMPONENTE ', bold: true, alignment: 'center' }, { text: '1' }, { text: '2' }, { text: '3' }, { text: '4' }, { text: '5' }, { text: 'RAZONAMIENTO', bold: true, alignment: 'center' },],
              ['1', 'Actualicé los sílabos en el sistema académico y entregué a los estudiantes', this.informeFinalDTO.evaluacionDocente.componente1 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente1 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente1 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente1 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente1 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento1],
              ['2', 'Asistí regular y puntualmente a las clases', this.informeFinalDTO.evaluacionDocente.componente2 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente2 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente2 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente2 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente2 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento2],
              ['3', 'Cumplí con las fechas del calendario académico ', this.informeFinalDTO.evaluacionDocente.componente3 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente3 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente3 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente3 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente3 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento3],
              ['4', 'Elaboré apuntes y/o material didáctico de la asignatura', this.informeFinalDTO.evaluacionDocente.componente4 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente4 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente4 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente4 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente4 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento4],
              ['5', 'Desarrolle guías y prácticas de laboratorio según los recursos existentes', this.informeFinalDTO.evaluacionDocente.componente5 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente5 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente5 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente5 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente5 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento5],
              ['6', 'Vincule la teoría con la práctica profesional ', this.informeFinalDTO.evaluacionDocente.componente6 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente6 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente6 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente6 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente6 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento6],
              ['7', 'Aplique técnicas/estrategias innovadoras en clase ', this.informeFinalDTO.evaluacionDocente.componente7 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente7 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente7 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente7 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente7 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento7],
              ['8', 'Realice una articulación horizontal y vertical con otras asignaturas', this.informeFinalDTO.evaluacionDocente.componente8 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente8 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente8 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente8 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente8 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento8],
              ['9', 'Realice el seguimiento al sílabo y se cumplieron los contenidos previstos', this.informeFinalDTO.evaluacionDocente.componente9 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente9 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente9 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente9 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente9 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento9],
              ['10', 'Se alcanzaron los resultados de aprendizaje planeados en el sílabo ', this.informeFinalDTO.evaluacionDocente.componente10 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente10 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente10 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente10 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente10 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento10],
              ['11', 'Utilice los recursos bibliográficos propuestos', this.informeFinalDTO.evaluacionDocente.componente11 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente11 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente11 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente11 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente11 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento11],
              ['12', 'Realice retroalimentación oportuna de las soluciones de las evaluaciones ', this.informeFinalDTO.evaluacionDocente.componente12 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente12 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente12 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente12 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente12 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento12],
              ['13', 'Brinde confianza para responder preguntas e interactuar sin temores', this.informeFinalDTO.evaluacionDocente.componente13 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente13 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente13 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente13 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente13 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento13],
              ['14', 'Se propuso un horario de consultas, tutorías de reforzamiento', this.informeFinalDTO.evaluacionDocente.componente14 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente14 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente14 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente14 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente14 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento14],
              ['15', 'Coordine el avance de los contenidos con otros docentes de la misma asignatura', this.informeFinalDTO.evaluacionDocente.componente15 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente15 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente15 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente15 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente15 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento15],
              ['16', 'Realicé los portafolios docentes de las asignaturas conforme la normativa establecida', this.informeFinalDTO.evaluacionDocente.componente16 == '1' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente16 == '2' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente16 == '3' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente16 == '4' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.componente16 == '5' ? 'x' : '', this.informeFinalDTO.evaluacionDocente.razonamiento16],
            ]
          }
        },
        {
          text: '\n6.2 FORTALEZAS Y DEBILIDADES',
          bold: true,
          margin: [20, 0, 0, 0]
        },
        {
          text: '(Describa las fortalezas y debilidades de su gestión docente que le permitirán generar acciones de mejora para el siguiente periodo).',
          margin: [40, 0, 0, 0]
        },
        {
          text: 'Fortalezas:',
          bold: true,
          margin: [40, 0, 0, 0]
        },
        ...cuerpoListaFortalezas,
        {
          text: '\nDebilidades:',
          bold: true,
          margin: [40, 0, 0, 0]
        },
        ...cuerpoListaDebilidades,
        {
          text: '\n7 APRECIACIÓN GLOBAL DE LOS ESTUDIANTES',
          bold: true
        },
        {
          text: 'Fortalezas:',
          bold: true,
          margin: [40, 0, 0, 0]
        },
        apreciacionGlobalListaFortalezas,
        {
          text: '\nDebilidades:',
          bold: true,
          margin: [40, 0, 0, 0]
        },
        apreciacionGlobalListaDebilidades,
        {
          text: '\n8 ACCIONES PARA MEJORAR LA GESTIÓN DOCENTE',
          bold: true
        }, {
          text: '(Describa las acciones que se deberían implementar para mejorar su gestión docente y los resultados en el siguiente periodo).'
        },
        {
          text: 'Acción 1: Relacionado con mejoras al plan analítico de las asignaturas: ',
          bold: true,
          margin: [40, 0, 0, 0]
        },
        accion1Lista,
        {
          text: '\nAcción 2: Relacionadas con los estudiantes y mejorar el proceso enseñanza-aprendizaje',
          bold: true,
          margin: [40, 0, 0, 0]
        },
        accion2Lista,
        {
          text: '\nAcción 3: Relacionadas con la mejora de sus capacidades docentes',
          bold: true,
          margin: [40, 0, 0, 0]
        },
        accion3Lista,
        {
          text: '\nAcción4: Otros ámbitos de mejora',
          bold: true,
          margin: [40, 0, 0, 0]
        },
        accion4Lista,
        {
          text: '\nAcciones tomadas para la solución de las novedades que se hayan presentado en clases y laboratorios y tutorías.',
          bold: true,
          margin: [40, 0, 0, 0]
        },
        accion5Lista,
        {
          text: '\nOtras',
          bold: true,
          margin: [40, 0, 0, 0]
        },
        accion6Lista,
        {
          text: '\nA continuación, se exponen las temáticas de capacitación en los que requiero actualización para mejorar mi desempeño docente:\n\n',
          margin: [20, 0, 0, 0]
        },
        {
          style: 'tablaEjemplo',
          table: {
            headerRows: 2,
            widths: ['*', '*', '*', '*', '*'],
            body: [
              [{ text: 'ÁREA DE CONOCIMIENTO', rowSpan: 2, alignment: 'center', bold: true }, { colSpan: 4, text: 'CAPACITACIÓN: Registre las temáticas de capacitación en los que requeriría actualización para mejorar su desempeño docente.', bold: true, alignment: 'center' }, {}, {}, {}],
              [{}, { text: 'TEMA 1', bold: true, alignment: 'center' }, { text: 'TEMA 2', bold: true, alignment: 'center' }, { text: 'TEMA 3', bold: true, alignment: 'center' }, { text: 'TEMA 4', bold: true, alignment: 'center' }],
              ...cuerpoTablaCapacitaciones
            ]
          }
        },
        {
          text: '\n9 CONCLUSIONES',
          bold: true
        },
        conclusionesLista,
        {
          text: '\n10 RECOMENDACIONES',
          bold: true
        },
        recomendacionesLista,
        {
          text: '\n11 ANEXO',
          bold: true
        },
        {
          text: 'ANEXO 1. REGISTRO DE TUTORÍAS DE REFORZAMIENTO',
          bold: true
        },
        anexo1Lista,
        {
          text: '\nANEXO 2. INDICADORES DE ACREDITACIÓN A REPORTAR POR PARTE DE LOS DOCENTES',
          bold: true,
          style: 'header'
        },
        {
          text: 'Complete la siguiente información solicitada dentro de su gestión docente con las respectivas evidencias (indicar links de informes, matrices, etc).\n\n'
        },
        {
          style: 'tablaEjemplo',
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', '*', '*'],
            body: [
              [{}, { text: 'COMPONENTE', alignment: 'center', bold: true }, { text: 'SI' }, { text: 'NO' }, { text: 'EVIDENCIAS', alignment: 'center', bold: true }, { text: 'Consideraciones para la evidencia.', alignment: 'center', bold: true }],
              // [{},{text: 'TEMA 1'},{text: 'TEMA 2'},{text: 'TEMA 3'},{text: 'TEMA 4'}],
              ...cuerpoTablaAnexos2
            ]
          }
        },
        {
          text: `\n\nSangolquí, ${formattedDate}`, margin: [0, 0, 0, 10], alignment: 'right'
        },
        {
          text: '\n\n\n\n\n_________________________________________', alignment: 'center'
        },
        {
          text: this.informeFinalDTO.datosGenerales.nombreDocentePresentaInforme, alignment: 'center', bold: true
        },
        {
          text: 'Docente DCEM', alignment: 'center', bold: true
        }
      ],
      styles: {
        header: {
          fontSize: 10,
          bold: true,
          margin: [0, 0, 0, 10]
        },
      },
      defaultStyle: {
        fontSize: 10,
        margin: [50, 0, 0, 0]
      }
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
}
