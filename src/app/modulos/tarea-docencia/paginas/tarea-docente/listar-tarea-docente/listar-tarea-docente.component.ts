import { Component, OnInit } from '@angular/core';
import { TareaDocencia } from '../../../modelos/TareaDocencia';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TareaDocenciaService } from '../../../servicios/TareaDocenciaService';
import { Periodo } from 'src/app/models/Periodo';
import { PeriodoService } from 'src/app/servicios/periodo.service';
import { TareaDocenciaDTO } from '../../../modelos/dto/TareaDocenciaDTO';

@Component({
  selector: 'app-listar-tarea-docente',
  templateUrl: './listar-tarea-docente.component.html',
  styleUrls: ['./listar-tarea-docente.component.css']
})
export class ListarTareaDocenteComponent implements OnInit {
  checkListartarea:boolean = false;
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
    this.getPeriodos$ = this.periodoService.listarPeriodosActivos();
  }

  ngOnInit(): void {
    this.getPeriodos();
  }

  getPeriodos() {
    this.getPeriodos$.subscribe((periodos) => {
      this.periodos = periodos;
    });
  }

  getTareas(){
    this.checkListartarea=true;
    this.tareaDocenciaService.listarTodasTareasPorPeriodo(
      this.periodo.codigoPeriodo
    ).subscribe((tareas) => {
      this.tareasDocencia = tareas;
    });
  }


  editarTarea(tareaDocencia: TareaDocenciaDTO) {
    this.tareaDocenciaService.setTarea(tareaDocencia);
    this.tareaDocenciaService.setPeriodo(this.periodo);
    this.router.navigate(['gestionar-tarea-docente']);
  }

  navegarCrearTarea(){
    this.tareaDocenciaService.setPeriodo(this.periodo);
    // localStorage.setItem('periodo', JSON.stringify(this.periodo));
    this.router.navigate(['gestionar-tarea-docente']);
  }

}
