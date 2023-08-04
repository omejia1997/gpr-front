import { Component, OnInit } from '@angular/core';
import { TareaDocenteDocenciaDTO } from '../../../modelos/dto/TareaDocenteDocenciaDTO';
import { Observable } from 'rxjs';
import { TareaDocenciaService } from '../../../servicios/TareaDocenciaService';
import { Router } from '@angular/router';
import { TareaDocenciaDTO } from '../../../modelos/dto/TareaDocenciaDTO';
import { Periodo } from 'src/app/models/Periodo';
import { PeriodoService } from 'src/app/servicios/periodo.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-revisar-todos-informe-final-subidos',
  templateUrl: './revisar-todos-informe-final-subidos.component.html',
  styleUrls: ['./revisar-todos-informe-final-subidos.component.css']
})

export class RevisarTodosInformeFinalSubidos implements OnInit {
  visualBlockedDocument: boolean = true;
  blockedDocument: boolean = false;
  checkListartarea:boolean = false;
  // getTareasDocenteDocencia$: Observable<TareaDocenteDocenciaDTO[]>;
  tareaDocenteDocenciaDTO: TareaDocenteDocenciaDTO[] = [];
  idEspeDocenteRevisor: any;
  buscarTermino: string = '';
  getPeriodos$: Observable<Periodo[]>;
  periodos:Periodo[]=[];
  periodo:Periodo={};

  constructor(
    private tareaDocenciaService: TareaDocenciaService,
    private periodoService: PeriodoService,
    private router: Router,
    private messageService: MessageService
    ) {
      this.idEspeDocenteRevisor = localStorage.getItem('idEspeDocenteRevisor');

      this.getPeriodos$ = this.periodoService.listarPeriodosActivos();
    }

  ngOnInit() {
    this.getPeriodos();
    // this.getTareasDocencia();
  }

  getPeriodos() {
    this.getPeriodos$.subscribe((periodos) => {
      this.periodos = periodos;
    });
  }

  getTareas(){
    this.checkListartarea=true;
    // this.getTareasDocenteDocencia$ = this.tareaDocenciaService.listarTodasTareasAsignadasPorDocente(
    //   this.idEspeDocenteRevisor
    // );
    this.tareaDocenciaService.listarTodasTareasSubidasPorPeriodo(
      this.periodo.codigoPeriodo
    ).subscribe((tareas) => {
      this.tareaDocenteDocenciaDTO = tareas;
      this.tareaDocenteDocenciaDTO.forEach(tareaDocente=>{
        tareaDocente.nombreCompletoDocente = tareaDocente.docenteAsignado?.apellidoDocente+" "+tareaDocente.docenteAsignado?.nombreDocente;
      })
    });
    // this.tareaService.obtenerTodasTareasPorProyecto(this.proyectoModel.id).subscribe(tareas =>{
    //   this.tareasDocenteProyecto = tareas;
    // });
  }

  filtrarItems() {
    // Filtrar la lista de items basándose en el término de búsqueda
    return this.tareaDocenteDocenciaDTO?.filter(item =>
      item.nombreCompletoDocente?.toLowerCase().includes(this.buscarTermino.toLowerCase())
      );
  }

  // getTareasDocencia() {
  //   this.getTareasDocenteDocencia$.subscribe((tareas) => {
  //     this.tareaDocenteDocenciaDTO = tareas;
  //     this.tareaDocenteDocenciaDTO.forEach(tareaDocente=>{
  //       tareaDocente.nombreCompletoDocente = tareaDocente.docenteAsignado?.apellidoDocente+" "+tareaDocente.docenteAsignado?.nombreDocente;
  //     })
  //   });
  // }

  editarTareaDocencia(tareaDocencia: TareaDocenteDocenciaDTO){
    this.tareaDocenciaService.setTareDocenteDocenciaDTO(tareaDocencia);
    this.router.navigate(['realizar-informe-final-docencia']);
  }

  verEstadisticas(){
    this.tareaDocenciaService.setTareasDocenteDocencia(this.tareaDocenteDocenciaDTO);
    this.router.navigate(['/rendimiento-general-asignaturas']);
  }

  verEstadisticasDelDocente(tareaDocenteDocencia:TareaDocenteDocenciaDTO){
    this.tareaDocenciaService.setTareDocenteDocenciaDTO(tareaDocenteDocencia);
    this.router.navigate(['/rendimiento-docente']);
  }

  verInformeFinal(tareaDocenteDocencia:TareaDocenteDocenciaDTO){
    this.tareaDocenciaService.setTareDocenteDocenciaDTO(tareaDocenteDocencia);
    localStorage.setItem('opcionRegresar','revisar-todos-informe-final-subidos');
    this.router.navigate(['/revisar-informe-final']);
  }

  habilitarEdicion(tareaDocenteDocencia:TareaDocenteDocenciaDTO){
    this.tareaDocenciaService.habilitarTareaParaEditar(
      tareaDocenteDocencia.id
    ).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Esta Actividad ahora se puede nuevamente realizar'
        });
        this.blockedDocument = false;
        this.getTareas();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message ?? ' Error no se pudo habilitar la edición de la Actividad'
        });
        this.blockedDocument = false;
      },
      complete: () => {
      },
    });
  }

}
