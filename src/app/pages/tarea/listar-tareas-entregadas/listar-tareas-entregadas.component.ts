import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TareaService } from 'src/app/servicios/tarea.service';
import { TareaDocenteProyecto } from 'src/app/models/TareaDocenteProyecto';
import { TareaDocente } from 'src/app/models/TareaDocente';

@Component({
  selector: 'app-listar-tareas-entregadas',
  templateUrl: './listar-tareas-entregadas.html'
})
export class ListarTareasEntregadasComponent implements OnInit {

  getTareasDocente$: Observable<TareaDocente[]>;
  tareasDocente: TareaDocente[] = [];
  cedulaDocenteRevisor:any;

  constructor(
    private tareaService: TareaService,
    private router: Router,
  ) {
    this.cedulaDocenteRevisor = localStorage.getItem('idDocenteRevisor');
    this.getTareasDocente$ = this.tareaService.obtenerTareasEntregadas(this.cedulaDocenteRevisor);
  }

  ngOnInit(): void {
   this.getTareas();
  }

  getTareas() {
    this.getTareasDocente$.subscribe(tareas =>{
      this.tareasDocente = tareas;  
    });
  }

  revisarTarea(tareaDocente:TareaDocente){
    this.tareaService.setTareaDocente(tareaDocente);
    this.router.navigate(['revisar-tarea-entregada']);
  }
}
