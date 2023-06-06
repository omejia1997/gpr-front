import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { TareaService } from 'src/app/servicios/tarea.service';

@Component({
  selector: 'app-monitoreo-tareas',
  templateUrl: './monitoreo-tarea-docente.component.html',
  styleUrls: ['./monitoreo-tarea-docente.component.css']
})

export class MonitoreoTareaDocenteComponent implements OnInit {
  tarea: any = {};
  tareaDocentes:TareaDocente[]=[];

  constructor(
    private tareaService: TareaService,
    private router: Router,
  ) {
    this.tareaService.tarea$.subscribe((res) => {
      this.tarea = res;
      if (this.tarea == null) {
        this.back();
      }
      tareaService.obtenerTareasDocentePorCodigoTarea(this.tarea.codigoTarea).subscribe(tareasDocente =>{
        this.tareaDocentes = tareasDocente;
      });
    });
  }

  ngOnInit(): void {
  }
  
  back() {
    this.router.navigate(['monitoreo-tareas']);
  }

  listarTareasDocentes(tareaDocente:TareaDocente){
    this.tareaService.setTareaDocente(tareaDocente);
    this.router.navigate(['ver-tarea-docente']);
  }
}
