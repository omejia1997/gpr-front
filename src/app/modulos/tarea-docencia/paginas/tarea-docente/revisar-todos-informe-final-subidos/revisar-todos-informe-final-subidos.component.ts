import { Component, OnInit } from '@angular/core';
import { TareaDocenteDocenciaDTO } from '../../../modelos/dto/TareaDocenteDocenciaDTO';
import { Observable } from 'rxjs';
import { TareaDocenciaService } from '../../../servicios/TareaDocenciaService';
import { Router } from '@angular/router';
import { TareaDocenciaDTO } from '../../../modelos/dto/TareaDocenciaDTO';
import { Periodo } from 'src/app/models/Periodo';
import { PeriodoService } from 'src/app/servicios/periodo.service';

@Component({
  selector: 'app-revisar-todos-informe-final-subidos',
  templateUrl: './revisar-todos-informe-final-subidos.component.html',
  styleUrls: ['./revisar-todos-informe-final-subidos.component.css']
})

export class RevisarTodosInformeFinalSubidos implements OnInit {
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

  habilitarEdicion(tareaDocenteDocencia:TareaDocenteDocenciaDTO){
    this.router.navigate(['/rendimiento-docente']);
  }

}
