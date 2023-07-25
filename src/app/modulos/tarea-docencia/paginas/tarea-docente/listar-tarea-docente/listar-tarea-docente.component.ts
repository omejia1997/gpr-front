import { Component, OnInit } from '@angular/core';
import { TareaDocencia } from '../../../modelos/TareaDocencia';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TareaDocenciaService } from '../../../servicios/TareaDocenciaService';

@Component({
  selector: 'app-listar-tarea-docente',
  templateUrl: './listar-tarea-docente.component.html',
  styleUrls: ['./listar-tarea-docente.component.css']
})
export class ListarTareaDocenteComponent implements OnInit {
  getTareasDocenciaDocente$: Observable<TareaDocencia[]>;
  tareasDocencia: TareaDocencia[] = [];
  idEspeDocenteRevisor: any;

  constructor(
    private tareaDocenciaService: TareaDocenciaService,
    private router: Router,
  ) {
    this.idEspeDocenteRevisor = localStorage.getItem('idEspeDocenteRevisor');
    this.getTareasDocenciaDocente$ = this.tareaDocenciaService.listarTodasTareasPorDocente(
      this.idEspeDocenteRevisor
    );
  }

  ngOnInit(): void {
    this.getTareasDocencia();
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
    this.router.navigate(['gestionar-tarea-docente']);
  }

}
