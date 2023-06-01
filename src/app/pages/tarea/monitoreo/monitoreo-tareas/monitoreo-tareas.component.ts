import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tarea } from 'src/app/models/Tarea';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TareaService } from 'src/app/servicios/tarea.service';

@Component({
  selector: 'app-monitoreo-tareas',
  templateUrl: './monitoreo-tareas.component.html',
  styleUrls: ['./monitoreo-tareas.component.css']
})

export class MonitoreoTareasComponent implements OnInit {
  proyecto: any = {};

  constructor(
    private tareaService: TareaService,
    private router: Router,
    private proyectoService: ProyectoService
  ) {
    this.proyectoService.proyecto$.subscribe((res) => {
      this.proyecto = res;
      if (this.proyecto == null) {
        this.back();
      }
    });
  }

  ngOnInit(): void {
  }
  
  back() {
    this.router.navigate(['monitoreo-proyecto']);
  }

  listarTareasDocentes(tarea:Tarea){
    this.tareaService.setTareaModel(tarea);
    this.router.navigate(['monitoreo-tarea-docente']);
  }
}
