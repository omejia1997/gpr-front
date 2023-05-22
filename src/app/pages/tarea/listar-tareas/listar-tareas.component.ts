import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/Proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { Observable } from 'rxjs';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { TareaService } from 'src/app/servicios/tarea.service';
import { TareaDocenteProyecto } from 'src/app/models/TareaDocenteProyecto';
import { Docente } from 'src/app/models/Docente';
import { Indicador } from 'src/app/models/Indicador';

@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.html'
})
export class ListarTareasComponent implements OnInit {

  getTareas$: Observable<TareaDocenteProyecto[]>;
  tareasDocenteProyecto: TareaDocenteProyecto[] = [];
  descPerfil:any;
  cedulaDocenteRevisor:any;

  constructor(
    private tareaService: TareaService,
    private router: Router,
  ) {
    this.cedulaDocenteRevisor = localStorage.getItem('idDocenteRevisor');
    this.getTareas$ = this.tareaService.obtenerTareas(this.cedulaDocenteRevisor);
    this.descPerfil=localStorage.getItem('descPerfil');
  }

  ngOnInit(): void {
   this.getTareas();
  }

  getTareas() {
    this.getTareas$.subscribe(tareas =>{
      this.tareasDocenteProyecto = tareas;  
    });
  }

  navegarCrearTarea(){
    this.router.navigate(['crear-tareas']);
  }

  editarTarea(tareaDocenteProyecto:TareaDocenteProyecto){
    this.tareaService.setTarea(tareaDocenteProyecto);
    this.router.navigate(['editar-tarea']);
  }
}
