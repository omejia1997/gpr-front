import { Component, OnInit } from '@angular/core';
import { TareaVinculacionService } from '../../../servicios/tarea-vinculacion.service';
import { Router } from '@angular/router';
import { TareaDocenteVinculacion } from '../../../modelos/TareaDocenteVinculacion';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-tareas-docente-vinculacion',
  templateUrl: './listar-tareas-docente-vinculacion.component.html',
  styleUrls: ['./listar-tareas-docente-vinculacion.component.css']
})
export class ListarTareasDocenteVinculacionComponent implements OnInit {
  tareasDocenteVinculacionAsignadas: TareaDocenteVinculacion[] = [];
  getTareasDocenteVinculacionNoAsignadas$: Observable<TareaDocenteVinculacion[]>;
  tareasDocenteVinculacionNoAsignadas: TareaDocenteVinculacion[] = [];
  codigoDocente:any;

  constructor(
    private tareaVinculacionService: TareaVinculacionService,
    private router: Router) {
      this.codigoDocente=localStorage.getItem('codigoDocente');
      this.getTareasDocenteVinculacionNoAsignadas$ = this.tareaVinculacionService.obtenerTareasNoAsignadasPorDocente(this.codigoDocente);
      this.tareaVinculacionService.tareasDocente$.subscribe((res) => {
        this.tareasDocenteVinculacionAsignadas = res;
        if (this.tareasDocenteVinculacionAsignadas == null) {
          // this.visualBlockedDocument = false;
          this.back();
        }
      });
    }

  ngOnInit() {
    this.getTareasNoAsignadasVinculacion();
  }

  back(){
    this.router.navigate(['listar-tareas-docente']);
  }

  getTareasNoAsignadasVinculacion(){
    this.getTareasDocenteVinculacionNoAsignadas$.subscribe(tareas =>{
      this.tareasDocenteVinculacionNoAsignadas = tareas;
    });
  }

  realizarTarea(tareaDocente:any){
    this.tareaVinculacionService.setTareaDocente(tareaDocente);
    this.router.navigate(['realizar-tarea-vinculacion']);

  }
}
