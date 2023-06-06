import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/Proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { Observable } from 'rxjs';
import { TareaService } from 'src/app/servicios/tarea.service';

@Component({
  selector: 'app-monitoreo-proyecto',
  templateUrl: './monitoreo-proyecto.component.html',
  styleUrls: ['./monitoreo-proyecto.component.css']
})
export class MonitoreoProyectoComponent implements OnInit {

  getProyectos$: Observable<Proyecto[]>;
  proyectos: Proyecto[] = [];
  cedulaDocenteRevisor:any;

  constructor(
    private proyectoService: ProyectoService,
    private tareaService: TareaService,
    private router: Router,
  ) {
    this.getProyectos$ = this.proyectoService.obtenerProyectos();
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

  getTareas(proyecto: Proyecto) {
    this.tareaService.obtenerTareasPorProyecto(this.cedulaDocenteRevisor,proyecto.codigoProyecto).subscribe(tareas =>{
      proyecto.listTareas = tareas;
      let count= 0;
      let check=true;
      console.log(tareas);
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

  listarTareas(proyecto: Proyecto) {
    this.proyectoService.setProyecto(proyecto);
    this.router.navigate(['monitoreo-tareas']);
  }
}
