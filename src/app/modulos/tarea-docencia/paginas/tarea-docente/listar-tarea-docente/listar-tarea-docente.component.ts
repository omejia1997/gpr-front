import { Component, OnInit } from '@angular/core';
import { TareaDocencia } from '../../../modelos/TareaDocencia';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TareaDocenciaService } from '../../../servicios/TareaDocenciaService';
import { Periodo } from 'src/app/models/Periodo';
import { PeriodoService } from 'src/app/servicios/periodo.service';

@Component({
  selector: 'app-listar-tarea-docente',
  templateUrl: './listar-tarea-docente.component.html',
  styleUrls: ['./listar-tarea-docente.component.css']
})
export class ListarTareaDocenteComponent implements OnInit {
  getTareasDocenciaDocente$: Observable<TareaDocencia[]>;
  tareasDocencia: TareaDocencia[] = [];
  idEspeDocenteRevisor: any;
  getPeriodos$: Observable<Periodo[]>;
  periodos:Periodo[]=[];
  periodo:Periodo={};

  constructor(
    private tareaDocenciaService: TareaDocenciaService,
    private periodoService: PeriodoService,
    private router: Router,
  ) {
    this.idEspeDocenteRevisor = localStorage.getItem('idEspeDocenteRevisor');
    this.getTareasDocenciaDocente$ = this.tareaDocenciaService.listarTodasTareasPorDocente(
      this.idEspeDocenteRevisor
    );
    this.getPeriodos$ = this.periodoService.listarPeriodosActivos();
  }

  ngOnInit(): void {
    this.getTareasDocencia();
    this.getPeriodos();
  }

  getPeriodos() {
    this.getPeriodos$.subscribe((periodos) => {
      this.periodos = periodos;
    });
  }

  getTareasDocencia() {
    this.getTareasDocenciaDocente$.subscribe((tareas) => {
      this.tareasDocencia = tareas;
    });
  }

  editarTarea(tareaDocencia: TareaDocencia) {
    // if (tareaDocente.codigoTarea) {
    //   // this.tareaService.setTareaDocente(tareaDocente);
    //   this.router.navigate(['revisar-tarea-entregada']);
    // } else if (tareaDocente.tarea) {
    //   // this.tareaVinculacionService.setTareaDocente(tareaDocente);
    //   this.router.navigate(['revisar-tarea-entregada-vinculacion']);
    // }
  }

  navegarCrearTarea(){
    this.tareaDocenciaService.setPeriodo(this.periodo);
    // localStorage.setItem('periodo', JSON.stringify(this.periodo));
    this.router.navigate(['gestionar-tarea-docente']);
  }

}
