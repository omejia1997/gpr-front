import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TareaDocenteVinculacion } from '../../../modelos/TareaDocenteVinculacion';
import { TareaVinculacionService } from '../../../servicios/tarea-vinculacion.service';

@Component({
  selector: 'app-monitoreo-tarea-docente-vinculacion',
  templateUrl: './monitoreo-tarea-docente-vinculacion.component.html',
  styleUrls: ['./monitoreo-tarea-docente-vinculacion.component.css']
})

export class MonitoreoTareaDocenteVinculacionComponent implements OnInit {
  tarea: any = {};
  tareaDocentes:TareaDocenteVinculacion[]=[];

  constructor(
    private tareaService: TareaVinculacionService,
    private router: Router,
  ) {
    this.tareaService.tarea$.subscribe((res) => {
      this.tarea = res;
      if (this.tarea == null) {
        this.back();
      }
      tareaService.obtenerTareasDocentePorCodigoTarea(this.tarea.id).subscribe(tareasDocente =>{
        this.tareaDocentes = tareasDocente;
      });
    });
  }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['monitoreo-tareas-vinculacion']);
  }

  listarTareasDocentes(tareaDocente:TareaDocenteVinculacion){
    this.tareaService.setTareaDocente(tareaDocente);
    this.router.navigate(['ver-tarea-docente-vinculacion']);
  }
}
