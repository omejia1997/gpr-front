import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TareaVinculacionService } from '../../../servicios/tarea-vinculacion.service';
import { TareaVinculacion } from '../../../modelos/TareaVinculacion';
import { ProyectoVinculacionService } from '../../../servicios/proyecto-vinculacion.service';

@Component({
  selector: 'app-monitoreo-tareas-vinculacion',
  templateUrl: './monitoreo-tareas-vinculacion.component.html',
  styleUrls: ['./monitoreo-tareas-vinculacion.component.css']
})

export class MonitoreoTareasVinculacionComponent implements OnInit {
  proyecto: any = {};

  constructor(
    private tareaService: TareaVinculacionService,
    private router: Router,
    private proyectoService: ProyectoVinculacionService
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
    this.router.navigate(['monitoreo-proyecto-vinculacion']);
  }

  listarTareasDocentes(tarea:TareaVinculacion){
    this.tareaService.setTareaModel(tarea);
    this.router.navigate(['monitoreo-tarea-docente-vinculacion']);
  }
}
