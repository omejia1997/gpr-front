import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { TareaService } from 'src/app/servicios/tarea.service';

@Component({
  selector: 'app-listar-tarea-docente-investigacion',
  templateUrl: './listar-tarea-docente-investigacion.component.html',
  styleUrls: ['./listar-tarea-docente-investigacion.component.css']
})
export class ListarTareaDocenteInvestigacionComponent implements OnInit {
  tareasDocenteInvestigacionAsignadas: TareaDocente[] = [];
  getTareasInvestigacionNoAsignadas$: Observable<TareaDocente[]>;
  tareasInvestigacionNoAsignadas: TareaDocente[] = [];
  codigoDocente:any;

  constructor(
    private tareaInvestigacionService: TareaService,
    private router: Router) {
      this.codigoDocente=localStorage.getItem('codigoDocente');
      this.getTareasInvestigacionNoAsignadas$ = this.tareaInvestigacionService.obtenerTareasNoAsignadasPorDocente(this.codigoDocente);
      this.tareaInvestigacionService.tareasDocente$.subscribe((res) => {
        this.tareasDocenteInvestigacionAsignadas = res;
        if (this.tareasDocenteInvestigacionAsignadas == null) {
          this.back();
        }
      });
    }

  ngOnInit() {
    this.getTareasNoAsignadasInvestigacion();
  }

  back(){
    this.router.navigate(['listar-tareas-docente']);
  }

  getTareasNoAsignadasInvestigacion(){
    this.getTareasInvestigacionNoAsignadas$.subscribe(tareas =>{
      this.tareasInvestigacionNoAsignadas = tareas;
    });
  }

  realizarTarea(tareaDocente:any){
    this.tareaInvestigacionService.setTareaDocente(tareaDocente);
    this.router.navigate(['realizar-tarea-docente']);
  }

}
