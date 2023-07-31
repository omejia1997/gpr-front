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
import { TareaDocenteProyecto } from 'src/app/models/TareaDocenteProyecto';
import { CargoService } from 'src/app/servicios/cargo.service';
import { TareaVinculacion } from '../../../modelos/TareaVinculacion';
import { TareaVinculacionService } from '../../../servicios/tarea-vinculacion.service';
import { TareaService } from 'src/app/servicios/tarea.service';
import { TareaDocenteProyectoVinculacion } from '../../../modelos/TareaDocenteProyectoVinculacion';
import { StorageFileService } from '../../../servicios/storage-file.service';

const MAXIMO_TAMANIO_FILE: number = 5; //MB;
const tipoTarea: any[] = [
  {
    id: 'TAREA',
    name: 'TAREA',
  },
  {
    id: 'SOLICITUD',
    name: 'SOLICITUD',
  },
];

const prioridadTarea: any[] = [
  {
    id: 'BAJA',
    name: 'BAJA',
  },
  {
    id: 'MEDIA',
    name: 'MEDIA',
  },
  {
    id: 'ALTA',
    name: 'ALTA',
  },
];

const pesoTarea: any[] = [
  {
    id: 'HORA',
    name: 'HORAS',
  },
  {
    id: 'DIA',
    name: 'DÍAS',
  },
  {
    id: 'MES',
    name: 'MESES',
  },
];

@Component({
  selector: 'app-crear-tarea-programada.vinculacion',
  templateUrl: './crear-tarea-programada-vinculacion.html',
  styleUrls: ['./crear-tarea-programada-vinculacion.component.css'],
})
export class CrearTareaProgramadaVinculacionComponent implements OnInit {
  pipe = new DatePipe('en-US');
  blockedDocument: boolean = false;
  ckequearIndicadorBooleano: boolean = true;
  descripcionIndicador: string = '';
  getDocentes$: Observable<Docente[]>;
  validTypes: any[] = [];
  tareaDocente: TareaDocente = {};
  tarea: TareaVinculacion = {};
  proyectoModel: any = {};
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
  tareaDocenteProyecto: TareaDocenteProyectoVinculacion = {};
  ckequearIndicador: Boolean = false;
  getCargos$: Observable<Cargo[]>;
  cargos: Cargo[] = [];
  cargo: Cargo = {};
  checkTipoTarea: Boolean = true;
  selectedFiles: any;
  imageName = '';
  opcionProgramado: Boolean = false;

  codCargo: any;
  codDocente: any;
  data: any;
  comboOpcionPeriodo: any;
  opcionPeriodo: any;
  checkTipoActividad: Boolean = false;

  constructor(
    private router: Router,
    private cargoService: CargoService,
    private tareaService: TareaVinculacionService,
    private tareaServiceGpr: TareaService,
    private messageService: MessageService,
    private storageFileService: StorageFileService
  ) {
    this.codDocente = localStorage.getItem('codigoDocente');
    this.getCargos$ = this.cargoService.obtenerCargosModel();
    this.getDocentes$ = new Observable();
    this.prioridades = prioridadTarea;
    this.pesoTarea = pesoTarea;
    this.tipoTarea = tipoTarea;
    this.getIndicadores$ = this.tareaServiceGpr.obtenerIndicadores();
    this.comboOpcionPeriodo = [
      'Diaria',
      'Semanal',
      'Mensual',
      'Bimestral',
      'Trimestral',
      'Cuatrimestral',
      'Semestral',
      'Anual',
    ];
  }

  ngOnInit(): void {
    //this.getProyectos();
    this.tareaService.proyectoModel$.subscribe((res) => {
      this.proyectoModel = res;
      if (this.proyectoModel == null) {
        this.data = localStorage.getItem('proyecto');
        this.proyectoModel = JSON.parse(this.data);
      } else {
      }
    });
    this.getCargos();
    this.getIndicadores();
  }

  back() {
    this.router.navigate(['listar-tareas-programadas-vinculacion']);
  }

  cambiarOpcion(tareaIndicador: any) {
    if (this.tarea.tipoActividad == 'Tarea programada')
      this.checkTipoActividad = true;
    else this.checkTipoActividad = false;
  }

  getCargos() {
    this.getCargos$.subscribe((cargos) => {
      this.cargos = cargos;
    });
  }

  getIndicadores() {
    this.getIndicadores$.subscribe((indicadores) => {
      this.indicadores = indicadores;
    });
  }

  save() {
    this.tarea.proyecto = this.proyectoModel;
    if (!this.tarea.nombreTarea || !this.tarea.proyecto) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Verifique que todos los campos se encuentren llenos',
      });
      return;
    }
    /*if (this.tarea.tipoTarea == "TAREA") {
      if (!this.tarea.pesoTarea || !this.tarea.valorPesoTarea || (this.checkTipoTarea && !this.checkTipoActividad)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Verifique que todos los campos se encuentren llenos'
        });
        return;
      }
      if (this.tarea.fechaEntregaTarea) {
        let fechaActual = new Date();
        let fechaIngresada;
        if (this.tarea.fechaEntregaTarea)
          fechaIngresada = new Date(this.tarea.fechaEntregaTarea)
        if (fechaIngresada)
          if (fechaIngresada <= fechaActual) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Verifique que la Fecha de Entrega de la Actividad sea mayor a la Fecha actual'
            });
            return;
          }
      }
    }*/

    if (this.indicadoresAsignados.length == 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se ha agregado ningún indicador a la Actividad',
      });
      return;
    }

    if (this.docentesAsignados.length == 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se ha agregado ningún docente a la Actividad',
      });
      return;
    }

    if (this.selectedFiles != undefined)
      if (this.selectedFiles[0].size / 1024 / 1024 > MAXIMO_TAMANIO_FILE) {
        //5MB
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El archivo supera el tamaño especificado',
        });
        return;
      }

    this.blockedDocument = true;
    this.tarea.proyecto = this.proyectoModel;
    this.tarea.idDocenteRevisor = localStorage.getItem('idDocenteRevisor');
    this.tarea.nombreDocenteRevisor = localStorage.getItem(
      'nombreDocenteRevisor'
    );
    this.tarea.fechaCreaciontarea = new Date();
    this.tarea.fechaEntregaTarea = this.pipe.transform(
      this.tarea.fechaEntregaTarea,
      'yyyy-MM-ddTHH:mm:ss',
      'UTC'
    );
    this.tareaDocenteProyecto.tarea = this.tarea;
    this.tareaDocenteProyecto.docentes = this.docentesAsignados;
    this.tareaDocenteProyecto.indicadors = this.indicadoresAsignados;
    if (this.selectedFiles == undefined) {
      this.tareaService
        .crearTarea(this.tareaDocenteProyecto, this.checkTipoActividad)
        .subscribe({
          next: (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'La Actividad ha sido creada con éxito',
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
              detail: err?.message ?? ' Error al crear la Actividad',
            });
            this.blockedDocument = false;
          },
          complete: () => {
            // this.isLoading = false;
          },
        });
    } else {
      this.tareaService
        .crearTareaConArchivo(
          this.tareaDocenteProyecto,
          this.selectedFiles[0],
          this.checkTipoActividad
        )
        .subscribe({
          next: (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'La Actividad ha sido creada con éxito',
            });
            // if (Array.isArray(data)) {
            //   data.forEach((tarea) => {
            //     this.storageFileService
            //       .saveFile(
            //         'Vinculacion',
            //         this.selectedFiles[0],
            //         tarea.nombreArchivoTareaEnStorage
            //       )
            //       .subscribe({
            //         next: (data) => {},
            //         error: (err) => {
            //           this.messageService.add({
            //             severity: 'error',
            //             summary: 'Error',
            //             detail: err?.message ?? ' Error al subir el archivo',
            //           });
            //           this.blockedDocument = false;
            //         },
            //         complete: () => {
            //           // this.isLoading = false;
            //         },
            //       });
            //   });
            // } else {
            //   this.storageFileService
            //     .saveFile(
            //       'Vinculacion',
            //       this.selectedFiles[0],
            //       data.nombreArchivoTareaEnStorage
            //     )
            //     .subscribe({
            //       next: (data) => {},
            //       error: (err) => {
            //         this.messageService.add({
            //           severity: 'error',
            //           summary: 'Error',
            //           detail: err?.message ?? ' Error al subir el archivo',
            //         });
            //         this.blockedDocument = false;
            //       },
            //       complete: () => {
            //         // this.isLoading = false;
            //       },
            //     });
            // }
            setTimeout(() => {
              this.blockedDocument = false;
              this.router.navigate(['listar-tareas-programadas-vinculacion']);
            }, 2000);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err?.message ?? ' Error al crear la Actividad',
            });
            this.blockedDocument = false;
          },
          complete: () => {},
        });
    }
  }

  regresar() {
    this.router.navigate(['listar-tareas-programadas-vinculacion']);
  }

  cambiarCheckDocente(docente: Docente) {
    docente.checked = !docente.checked;
    if (!docente.checked)
      this.docentesAsignados = this.docentesAsignados.filter(
        (item) => item.codigoDocente !== docente.codigoDocente
      );
    else this.docentesAsignados.push(docente);
  }

  cambiarCkequearIndicadorBooleano() {
    if (this.indicador.nombreIndicador == 'BOOLEANO')
      this.ckequearIndicadorBooleano = false;
    else this.ckequearIndicadorBooleano = true;
  }
  cambiarTodosDocentes() {
    this.docentes.forEach((docente) => {
      docente.checked = !docente.checked;
      if (!docente.checked)
        this.docentesAsignados = this.docentesAsignados.filter(
          (item) => item.codigoDocente !== docente.codigoDocente
        );
      else this.docentesAsignados.push(docente);
    });
  }
  agregarIndicador() {
    let indicador: Indicador = {
      codigoIndicador: this.indicador.codigoIndicador,
      nombreIndicador: this.indicador.nombreIndicador,
      estadoIndicador: this.indicador.estadoIndicador,
      descripcionIndicador: this.descripcionIndicador,
    };
    this.indicador.descripcionIndicador = this.descripcionIndicador;
    this.descripcionIndicador = '';
    this.indicadoresAsignados.push(indicador);
    this.ckequearIndicador = false;
  }

  eliminarIndicador(indicador: Indicador) {
    this.indicadoresAsignados = this.indicadoresAsignados.filter(
      (item) =>
        item.descripcionIndicador !== indicador.descripcionIndicador ||
        item.codigoIndicador !== indicador.codigoIndicador
    );
  }

  visualizarIndicador() {
    this.ckequearIndicador = true;
  }

  buscarDocentesPorCargo() {
    this.getDocentes$ = this.tareaServiceGpr.obtenerTodosDocentesPorCargo(
      this.cargo.codCargo
    );
    this.getDocentes$.subscribe((docentes) => {
      this.docentes = docentes;
      if (this.docentesAsignados.length == 0) {
        this.docentes.forEach((docente) => {
          docente.checked = false;
        });
      } else {
        this.docentes.forEach((docente) => {
          docente.checked = false;
          if (
            this.docentesAsignados.find(
              (item) => item.codigoDocente === docente.codigoDocente
            )
          ) {
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
}
