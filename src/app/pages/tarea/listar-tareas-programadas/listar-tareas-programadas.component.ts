import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Proyecto } from 'src/app/models/Proyecto';
import { TareaDocenteProyecto } from 'src/app/models/TareaDocenteProyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TareaService } from 'src/app/servicios/tarea.service';

@Component({
  selector: 'app-listar-tareas-programadas',
  templateUrl: './listar-tareas-programadas.html'
})
export class ListarTareasProgramadasComponent implements OnInit {

  //getTareas$: Observable<TareaDocenteProyecto[]>;
  tareasDocenteProyecto: TareaDocenteProyecto[] = [];
  descPerfil:any;
  cedulaDocenteRevisor:any;
  getProyectos$: Observable<Proyecto[]>;
  proyectos: Proyecto[] = [];
  proyectoModel: Proyecto = {};

  constructor(
    private tareaService: TareaService,
    private router: Router,
    private proyectoService: ProyectoService
  ) {
    this.cedulaDocenteRevisor = localStorage.getItem('idDocenteRevisor');
    //this.getTareas$ = this.tareaService.obtenerTareas(this.cedulaDocenteRevisor);
    this.descPerfil=localStorage.getItem('descPerfil');
    this.getProyectos$ = this.proyectoService.listarProyectosActivos();
  }

  ngOnInit(): void {
   //this.getTareas();
   this.getProyectos();
  }

  getProyectos() {
    this.getProyectos$.subscribe(proyectos => {
      this.proyectos = proyectos;
    });
  }

  getTareas() {
    /*this.getTareas$.subscribe(tareas =>{
      this.tareasDocenteProyecto = tareas;  
    });*/

    this.tareaService.obtenerTareasPorProyecto(this.cedulaDocenteRevisor,this.proyectoModel.codigoProyecto).subscribe(tareas =>{
      this.tareasDocenteProyecto = tareas;  
    });
  }

  navegarCrearTarea(){
    localStorage.setItem('proyecto', JSON.stringify(this.proyectoModel));
    this.tareaService.setProyectoModel(this.proyectoModel);
    this.router.navigate(['crear-tarea-programada']);
  }

  editarTarea(tareaDocenteProyecto:TareaDocenteProyecto){
    this.tareaService.setTarea(tareaDocenteProyecto);
    this.router.navigate(['editar-tarea']);
  }
}
