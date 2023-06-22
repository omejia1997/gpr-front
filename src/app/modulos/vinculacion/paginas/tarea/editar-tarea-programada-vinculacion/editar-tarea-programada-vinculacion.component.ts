import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Cargo } from 'src/app/models/Cargo';
import { Docente } from 'src/app/models/Docente';
import { Indicador } from 'src/app/models/Indicador';
import { Proyecto } from 'src/app/models/Proyecto';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { CargoService } from 'src/app/servicios/cargo.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TareaService } from 'src/app/servicios/tarea.service';
import { TareaVinculacion } from '../../../modelos/TareaVinculacion';
import { TareaVinculacionService } from '../../../servicios/tarea-vinculacion.service';
import { ProyectoVinculacion } from '../../../modelos/ProyectoVinculacion';

const MAXIMO_TAMANIO_FILE:number = 5//5MB;
const tipoTarea: any[] = [
  {
    "id": "TAREA",
    "name": "TAREA"
  },
  {
    "id": "SOLICITUD",
    "name": "SOLICITUD"
  }
]

const prioridadTarea: any[] = [
  {
    "id": "BAJA",
    "name": "BAJA"
  },
  {
    "id": "MEDIA",
    "name": "MEDIA"
  },
  {
    "id": "ALTA",
    "name": "ALTA"
  }
]

const pesoTarea: any[] = [
  {
    "id": "HORA",
    "name": "HORAS"
  },
  {
    "id": "DIA",
    "name": "DÍAS"
  },
  {
    "id": "MES",
    "name": "MESES"
  }
]

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './editar-tarea-programada-vinculacion.html',
  styleUrls: ['./editar-tarea-programada-vinculacion.component.css']

})

export class EditarTareaProgramadaVinculacionComponent implements OnInit {
  blockedDocument: boolean = false;
  visualBlockedDocument: boolean = true;
  //tarea: TareaDocente = {};
  pipe = new DatePipe('en-US');
  getProyectos$: Observable<Proyecto[]>;
  descripcionIndicador: string = "";
  getDocentes$: Observable<Docente[]>;
  validTypes: any[] = [];
  tareaDocente: TareaDocente = {};
  tarea: TareaVinculacion = {};
  indicador: Indicador = {};
  indicadores: Indicador[] = [];
  proyectos: Proyecto[] = [];
  docentes: Docente[] = [];
  docentesAsignados: any[] = [];
  indicadoresAsignados: any[] = [];
  prioridades: any[];
  pesoTarea: any[];
  tipoTarea: any[];
  getIndicadores$: Observable<Indicador[]>;
  tareaDocenteProyecto: any = {};
  ckequearIndicador: Boolean = false;
  getCargos$: Observable<Cargo[]>;
  cargos: Cargo[] = [];
  cargo: Cargo = {};
  checkTipoTarea: Boolean = true;
  selectedFiles: any;
  imageName = "";
  proyectoModelEdit: any={};

  codCargo: any;
  codDocente: any;


  constructor(
    private router: Router,
    private cargoService: CargoService,
    private tareaService: TareaVinculacionService,
    private tareaServiceGpr: TareaService,
    private proyectoService: ProyectoService,
    private messageService: MessageService
  ) {
    this.codDocente = localStorage.getItem('codigoDocente');
    this.getProyectos$ = this.proyectoService.listarProyectosActivos();
    this.getCargos$ = this.cargoService.obtenerCargosModel();
    this.getDocentes$ = new Observable;
    this.prioridades = prioridadTarea;
    this.pesoTarea = pesoTarea;
    this.tipoTarea = tipoTarea;
    this.getIndicadores$ = this.tareaServiceGpr.obtenerIndicadores();
    this.tareaService.tareas$.subscribe((res) => {
      this.tareaDocenteProyecto = res;
      if (this.tareaDocenteProyecto == null) {
        this.visualBlockedDocument = false;
        this.back();
      } else {
        this.tarea = this.tareaDocenteProyecto.tarea;
        this.proyectoModelEdit= this.tarea.proyecto;
        // if (this.tarea.tipoTarea == "SOLICITUD")
        //   this.checkTipoTarea = false;
        if (this.tarea.fechaEntregaTarea) {
          this.tarea.fechaEntregaTarea = this.pipe.transform(this.tarea.fechaEntregaTarea, 'yyyy-MM-ddTHH:mm:ss', 'UTC');
        }
        this.indicadoresAsignados = this.tareaDocenteProyecto.indicadors;
        this.docentesAsignados = this.tareaDocenteProyecto.docentes;
      }
    });
  }

  ngOnInit(): void {
    this.getProyectos();
    this.getCargos();
    this.getIndicadores();
  }

  back() {
    this.router.navigate(['listar-tareas-programadas-vinculacion']);
  }

  getProyectos() {
    this.getProyectos$.subscribe(proyectos => {
      this.proyectos = proyectos;
    });
  }

  compararNombres(proyecto1: Proyecto, proyecto2: Proyecto) {
    if (proyecto1 == null || proyecto2 == null) {
      return false;
    }
    return proyecto1.nombreProyecto === proyecto2.nombreProyecto;
  }

  getCargos() {
    this.getCargos$.subscribe(cargos => {
      this.cargos = cargos;
    });
  }

  getIndicadores() {
    this.getIndicadores$.subscribe(indicadores => {
      this.indicadores = indicadores;
    });
  }

  save() {
    if (!this.tarea.nombreTarea || !this.tarea.proyecto ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Verifique que todos los campos se encuentren llenos'
      });
      return;
    }
    // if (this.tarea.tipoTarea == "TAREA") {
    //   if (!this.tarea.pesoTarea || !this.tarea.valorPesoTarea || !this.tarea.fechaEntregaTarea) {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'Verifique que todos los campos se encuentren llenos'
    //     });
    //     return;
    //   }
    //   if (this.tarea.fechaEntregaTarea) {
    //     let fechaActual = new Date();
    //     let fechaIngresada;
    //     if (this.tarea.fechaEntregaTarea)
    //       fechaIngresada = new Date(this.tarea.fechaEntregaTarea)
    //     if (fechaIngresada)
    //       if (fechaIngresada <= fechaActual) {
    //         this.messageService.add({
    //           severity: 'error',
    //           summary: 'Error',
    //           detail: 'Verifique que la Fecha de Entrega de la Actividad sea mayor a la Fecha actual'
    //         });
    //         return;
    //       }
    //   }
    // }

    if(this.docentesAsignados.length==0){
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se ha agregado ningún docente a la Actividad'
      });
      return;
    }

    if (this.selectedFiles != undefined)
      if (this.selectedFiles[0].size / 1024 / 1024 > MAXIMO_TAMANIO_FILE) {//5MB
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El archivo supera el tamaño especificado'
        });
        return;
      }

    this.blockedDocument = true;//Spinner
    this.tarea.idDocenteRevisor = localStorage.getItem('idDocenteRevisor');
    this.tarea.nombreDocenteRevisor = localStorage.getItem('nombreDocenteRevisor');
    this.tareaDocenteProyecto.tarea = this.tarea;
    this.tareaDocenteProyecto.docentes = this.docentesAsignados;
    this.tareaDocenteProyecto.indicadors = this.indicadoresAsignados;
    if (this.selectedFiles == undefined) {
      this.tareaService.editarTarea(this.tareaDocenteProyecto)
        .subscribe({
          next: (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'La Actividad ha sido modificada con éxito'
            });
            setTimeout(() => {
              this.blockedDocument = false;
              this.router.navigate(['listar-tareas-programadas-vinculacion']);
            }, 2000);

          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err?.message ?? ' Error al editar la Actividad'
            });
            this.blockedDocument = false;
          },
          complete: () => {
            // this.isLoading = false;
          },
        })
    } else {
      this.tareaService.editarTareaConArchivo(this.tareaDocenteProyecto,this.selectedFiles[0])
        .subscribe({
          next: (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'La Actividad ha sido modificada con éxito'
            });
            setTimeout(() => {
              this.blockedDocument = false;
              this.router.navigate(['listar-tareas-programadas-vinculacion']);
            }, 2000);

          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err?.message ?? ' Error al editar la Actividad'
            });
            this.blockedDocument = false;
          },
          complete: () => {
            // this.isLoading = false;
          },
        })
    }
  }

  cambiarCheckDocente(docente: Docente) {
    docente.checked = !docente.checked;
    if (!docente.checked)
      this.docentesAsignados = this.docentesAsignados.filter((item) => item.codigoDocente !== docente.codigoDocente);
    else
      this.docentesAsignados.push(docente);
  }

  cambiarTodosDocentes() {
    this.docentes.forEach(docente => {
      docente.checked = !docente.checked;
      if (!docente.checked)
        this.docentesAsignados = this.docentesAsignados.filter((item) => item.codigoDocente !== docente.codigoDocente);
      else
        this.docentesAsignados.push(docente);
    });
  }
  agregarIndicador() {
    let indicador: Indicador = {
      codigoIndicador: this.indicador.codigoIndicador,
      nombreIndicador: this.indicador.nombreIndicador,
      estadoIndicador: this.indicador.estadoIndicador,
      descripcionIndicador: this.descripcionIndicador
    }
    this.indicador.descripcionIndicador = this.descripcionIndicador;
    this.descripcionIndicador = "";
    this.indicadoresAsignados.push(indicador);
    this.ckequearIndicador = false;
  }

  eliminarIndicador(indicador: Indicador) {
    this.indicadoresAsignados = this.indicadoresAsignados.filter((item) => ((item.descripcionIndicador !== indicador.descripcionIndicador) || (item.codigoIndicador !== indicador.codigoIndicador)));
  }

  visualizarIndicador() {
    this.ckequearIndicador = true;
  }

  buscarDocentesPorCargo() {
    this.getDocentes$ = this.tareaServiceGpr.obtenerDocentesPorCargo(this.cargo.codCargo, this.codDocente);
    this.getDocentes$.subscribe(docentes => {
      this.docentes = docentes;
      if (this.docentesAsignados.length == 0) {
        this.docentes.forEach(docente => {
          docente.checked = false;
        });
      } else {
        this.docentes.forEach(docente => {
          docente.checked = false;
          if (this.docentesAsignados.find((item) => item.codigoDocente === docente.codigoDocente)) {
            docente.checked = true;
          }
        });
      }
    });
  }

  selectFiles(event: any) {
    this.imageName = event.target.files[0].name;
    this.selectedFiles = event.target.files;
  }

  // detectarCambioActividad() {
  //   if (this.tarea.tipoTarea == "SOLICITUD") {
  //     this.tarea.fechaEntregaTarea = undefined;
  //     this.tarea.pesoTarea = undefined;
  //     this.tarea.valorPesoTarea = undefined;
  //     this.checkTipoTarea = false;
  //   }
  //   else if (this.tarea.tipoTarea == "TAREA")
  //     this.checkTipoTarea = true;
  // }

  blockDocument() {
    this.blockedDocument = true;
    setTimeout(() => {
      this.blockedDocument = false;
    }, 3000);
  }
  regresar() {
    this.router.navigate(['listar-tareas-programadas-vinculacion']);
  }
}
