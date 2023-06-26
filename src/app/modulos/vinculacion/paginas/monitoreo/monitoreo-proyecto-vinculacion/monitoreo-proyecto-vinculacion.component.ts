import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProyectoVinculacion } from '../../../modelos/ProyectoVinculacion';
import { ProyectoVinculacionService } from '../../../servicios/proyecto-vinculacion.service';
import { TareaVinculacionService } from '../../../servicios/tarea-vinculacion.service';

@Component({
  selector: 'app-monitoreo-proyecto-vinculacion',
  templateUrl: './monitoreo-proyecto-vinculacion.component.html',
  styleUrls: ['./monitoreo-proyecto-vinculacion.component.css']
})
export class MonitoreoProyectoVinculacionComponent implements OnInit {

  getProyectos$: Observable<ProyectoVinculacion []>;
  proyectos: ProyectoVinculacion[] = [];
  cedulaDocenteRevisor:any;

  constructor(
    private proyectoService: ProyectoVinculacionService,
    private tareaService: TareaVinculacionService,
    private router: Router,
  ) {
    this.getProyectos$ = this.proyectoService.obtenerProyectosVinculacion();
    this.cedulaDocenteRevisor = localStorage.getItem('idDocenteRevisor');
  }

  ngOnInit(): void {
   this.getProyectos();
  }

  getProyectos() {
    this.getProyectos$.subscribe(proyectos =>{
      this.proyectos = proyectos;
      this.proyectos.forEach(proyecto=>{
        this.getTareas(proyecto);
      })
    });
  }

  getTareas(proyecto: ProyectoVinculacion) {
    //this.tareaService.obtenerTareasPorProyecto(this.cedulaDocenteRevisor,proyecto.codigoProyecto).subscribe(tareas =>{
    this.tareaService.obtenerTodasTareasPorProyecto(proyecto.id).subscribe(tareas =>{
      proyecto.listTareas = tareas;
      let count= 0;
      let check=true;
      proyecto.listTareas.forEach(tarea=>{
          if(check){
            if(tarea.claseCirculoPintar=="amarillo"){
              proyecto.claseCirculoPintar="amarillo";
              check=false;
              throw "tareas incompletas";
            }
            if(tarea.claseCirculoPintar=="verde"){
              count++;
            }
          }
        })
      if(count==0){
        //proyecto.claseCirculoPintar="rojo";
        proyecto.claseCirculoPintar="amarillo";
      }else if(count == proyecto.listTareas.length){
        proyecto.claseCirculoPintar="verde";
      }

    });
  }

  listarTareas(proyecto: ProyectoVinculacion) {
    this.proyectoService.setProyecto(proyecto);
    this.router.navigate(['monitoreo-tareas-vinculacion']);
  }
}
