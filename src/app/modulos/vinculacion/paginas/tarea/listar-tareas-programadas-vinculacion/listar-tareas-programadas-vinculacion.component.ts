import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Proyecto } from 'src/app/models/Proyecto';
import { TareaDocenteProyecto } from 'src/app/models/TareaDocenteProyecto';
import { ProyectoVinculacionService } from '../../../servicios/proyecto-vinculacion.service';
import { TareaVinculacionService } from '../../../servicios/tarea-vinculacion.service';
import { ProyectoVinculacion } from '../../../modelos/ProyectoVinculacion';
import { TareaDocenteProyectoVinculacion } from '../../../modelos/TareaDocenteProyectoVinculacion';

@Component({
  selector: 'app-listar-tareas-programadas-vinculacion',
  templateUrl: './listar-tareas-programadas-vinculacion.html'
})
export class ListarTareasProgramadasVinculacionComponent implements OnInit {

  //getTareas$: Observable<TareaDocenteProyecto[]>;
  tareasDocenteProyecto: TareaDocenteProyectoVinculacion[] = [];
  descPerfil:any;
  cedulaDocenteRevisor:any;
  getProyectos$: Observable<ProyectoVinculacion[]>;
  proyectos: ProyectoVinculacion[] = [];
  proyectoModel: ProyectoVinculacion = {};
  checkCreartarea:Boolean=false;

  constructor(
    private tareaService: TareaVinculacionService,
    private router: Router,
    private proyectoService: ProyectoVinculacionService
  ) {
    this.cedulaDocenteRevisor = localStorage.getItem('idDocenteRevisor');
    this.getProyectos$ = this.proyectoService.obtenerProyectosVinculacion();
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
     this.checkCreartarea=true;
     this.tareaService.obtenerTodasTareasPorProyecto(this.proyectoModel.id).subscribe(tareas =>{
       this.tareasDocenteProyecto = tareas;
     });
   }

   navegarCrearTarea(){
     localStorage.setItem('proyecto', JSON.stringify(this.proyectoModel));
     this.tareaService.setProyectoModel(this.proyectoModel);
     this.router.navigate(['crear-tarea-programada-vinculacion']);
   }

  //  navegarCrearProyecto(){
  //    localStorage.setItem('proyecto', JSON.stringify(this.proyectoModel));
  //    this.tareaService.setProyectoModel(this.proyectoModel);
  //    this.router.navigate(['crear-proyecto-programado']);
  //  }

   editarTarea(tareaDocenteProyecto:TareaDocenteProyectoVinculacion){
     this.tareaService.setTarea(tareaDocenteProyecto);
     this.router.navigate(['editar-tarea-programada-vinculacion']);
   }

   eliminarTarea(tareaDocenteProyecto:TareaDocenteProyectoVinculacion){
     this.tareaService.eliminarTarea(tareaDocenteProyecto.tarea?.id).subscribe(data => {
       this.getTareas();
     });
   }

 }
