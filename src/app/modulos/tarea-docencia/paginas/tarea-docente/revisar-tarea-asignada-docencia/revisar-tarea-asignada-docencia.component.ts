import { Component, OnInit } from '@angular/core';
import { TareaDocenteDocenciaDTO } from '../../../modelos/dto/TareaDocenteDocenciaDTO';
import { Observable } from 'rxjs';
import { TareaDocenciaService } from '../../../servicios/TareaDocenciaService';
import { Router } from '@angular/router';
import { TareaDocenciaDTO } from '../../../modelos/dto/TareaDocenciaDTO';

@Component({
  selector: 'app-revisar-tarea-asignada-docencia',
  templateUrl: './revisar-tarea-asignada-docencia.component.html',
  styleUrls: ['./revisar-tarea-asignada-docencia.component.css']
})
export class RevisarTareaAsignadaDocenciaComponent implements OnInit {
  getTareasDocenteDocencia$: Observable<TareaDocenteDocenciaDTO[]>;
  tareaDocenteDocenciaDTO: TareaDocenteDocenciaDTO[] = [];
  idEspeDocenteRevisor: any;

  constructor(
    private tareaDocenciaService: TareaDocenciaService,
    private router: Router,
    ) {
      this.idEspeDocenteRevisor = localStorage.getItem('idEspeDocenteRevisor');
      this.getTareasDocenteDocencia$ = this.tareaDocenciaService.listarTodasTareasAsignadasPorDocente(
        this.idEspeDocenteRevisor
      );
    }

  ngOnInit() {
    this.getTareasDocencia();
  }

  getTareasDocencia() {
    this.getTareasDocenteDocencia$.subscribe((tareas) => {
      this.tareaDocenteDocenciaDTO = tareas;
    });
  }

  verTareaDocencia(tareaDocencia: TareaDocenteDocenciaDTO){
    this.tareaDocenciaService.setTareDocenteDocenciaDTO(tareaDocencia);
    this.router.navigate(['revisar-informe-final']);
  }

  editarTareaDocencia(tareaDocencia: TareaDocenteDocenciaDTO){
    this.tareaDocenciaService.setTareDocenteDocenciaDTO(tareaDocencia);
    this.router.navigate(['realizar-informe-final-docencia']);
  }

}
