import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TareaService } from 'src/app/servicios/tarea.service';
import { TareaDocenteProyecto } from 'src/app/models/TareaDocenteProyecto';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { TareaDocenteVinculacion } from 'src/app/modulos/vinculacion/modelos/TareaDocenteVinculacion';
import { TareaVinculacionService } from 'src/app/modulos/vinculacion/servicios/tarea-vinculacion.service';

@Component({
  selector: 'app-listar-tareas-entregadas',
  templateUrl: './listar-tareas-entregadas.html',
})
export class ListarTareasEntregadasComponent implements OnInit {
  getTareasDocente$: Observable<TareaDocente[]>;
  getTareasVinculacion$: Observable<TareaDocenteVinculacion[]>;
  tareasDocente: TareaDocente[] = [];
  tareasVinculacion: TareaDocenteVinculacion[] = [];
  cedulaDocenteRevisor: any;
  totalTareasRevisar: any = [];

  constructor(
    private tareaService: TareaService,
    private router: Router,
    private tareaVinculacionService: TareaVinculacionService
  ) {
    this.cedulaDocenteRevisor = localStorage.getItem('idDocenteRevisor');
    this.getTareasDocente$ = this.tareaService.obtenerTareasEntregadas(
      this.cedulaDocenteRevisor
    );
    this.getTareasVinculacion$ =
      this.tareaVinculacionService.obtenerTareasEntregadas(
        this.cedulaDocenteRevisor
      );
  }

  ngOnInit(): void {
    this.getTareas();
  }

  getTareas() {
    this.getTareasDocente$.subscribe((tareas) => {
      this.tareasDocente = tareas;
      this.getTodasLasTareas();

    });
  }
  getTodasLasTareas() {
    this.totalTareasRevisar = this.totalTareasRevisar.concat(
      this.tareasDocente,
      this.tareasVinculacion
    );
    this.getTareasVinculacion$.subscribe((tareas) => {
      this.totalTareasRevisar=[];
      this.tareasVinculacion = tareas;
      this.totalTareasRevisar = this.totalTareasRevisar.concat(
        this.tareasDocente,
        this.tareasVinculacion
      );
      // this.totalTareasrealizar.sort(function (a:any, b:any) {//Ordenar Array
      //   if (a.fechaEntregadaTareaDocente === "ASIGNADA") {
      //     return -1;
      //   }
      //   return 0;
      // });
    });
  }

  revisarTarea(tareaDocente: any) {
    if (tareaDocente.codigoTarea) {
      this.tareaService.setTareaDocente(tareaDocente);
      this.router.navigate(['revisar-tarea-entregada']);
    } else if (tareaDocente.tarea) {
      this.tareaVinculacionService.setTareaDocente(tareaDocente);
      this.router.navigate(['revisar-tarea-entregada-vinculacion']);
    }
  }
}
