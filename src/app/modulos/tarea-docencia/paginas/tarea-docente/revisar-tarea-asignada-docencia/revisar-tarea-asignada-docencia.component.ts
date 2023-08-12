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
  getTareasDocenteNoAsignadasDocencia$: Observable<TareaDocenteDocenciaDTO[]>;
  tareaDocenteDocenciaDTO: TareaDocenteDocenciaDTO[] = [];
  tareaDocenteDocenciaNoAsignadasDTO: TareaDocenteDocenciaDTO[] = [];
  idEspeDocenteRevisor: any;

  constructor(
    private tareaDocenciaService: TareaDocenciaService,
    private router: Router,
    ) {

      this.idEspeDocenteRevisor = localStorage.getItem('idEspeDocenteRevisor');
       this.tareaDocenciaService.tareasDocenteDocencia$.subscribe((res) => {
        this.tareaDocenteDocenciaDTO = res;
        if (this.tareaDocenteDocenciaDTO == null) {
          // this.visualBlockedDocument = false;
          this.back();
        }
      });
      this.getTareasDocenteNoAsignadasDocencia$ = this.tareaDocenciaService.listarTodasTareasNoAsignadasPorDocente(
        this.idEspeDocenteRevisor
      );
    }

  ngOnInit() {
    this.getTareasDocenciaNoAsignadas();
  }

  back(){
    this.router.navigate(['listar-tareas-docente']);
  }

  getTareasDocenciaNoAsignadas() {
    this.getTareasDocenteNoAsignadasDocencia$.subscribe((tareas) => {
      this.tareaDocenteDocenciaNoAsignadasDTO = tareas;
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
