import { Component, OnInit } from '@angular/core';
import { TareaDocenteDocenciaDTO } from '../../../modelos/dto/TareaDocenteDocenciaDTO';
import { Observable } from 'rxjs';
import { TareaDocenciaService } from '../../../servicios/TareaDocenciaService';
import { Router } from '@angular/router';
import { TareaDocenciaDTO } from '../../../modelos/dto/TareaDocenciaDTO';

@Component({
  selector: 'app-revisar-todos-informe-final-subidos',
  templateUrl: './revisar-todos-informe-final-subidos.component.html',
  styleUrls: ['./revisar-todos-informe-final-subidos.component.css']
})

export class RevisarTodosInformeFinalSubidos implements OnInit {
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
      let promedioRendimientoGeneral:any= 0;
      let promedioDesviacionestandarGeneral:any= 0;
      let cont=0;
      this.tareaDocenteDocenciaDTO.forEach(tareaDocente=>{
        tareaDocente.informeFinal?.datosAsignatura?.forEach(datoAsignatura=>{
          promedioRendimientoGeneral += datoAsignatura.promedioFinalRendimientoAcademico;
          promedioDesviacionestandarGeneral = datoAsignatura.promedioFinalDesviacionEstandar;
          cont++;
        })
        promedioRendimientoGeneral /=cont;
        promedioDesviacionestandarGeneral /=cont;

        tareaDocente.rendimientoGeneralTodasMaterias = promedioRendimientoGeneral;
        tareaDocente.promedioDesviacionestandarGeneral = promedioDesviacionestandarGeneral;
      })
    });
  }

  editarTareaDocencia(tareaDocencia: TareaDocenteDocenciaDTO){
    this.tareaDocenciaService.setTareDocenteDocenciaDTO(tareaDocencia);
    this.router.navigate(['realizar-informe-final-docencia']);
  }

  verEstadisticas(){
    this.tareaDocenciaService.setTareasDocenteDocencia(this.tareaDocenteDocenciaDTO);
    this.router.navigate(['/rendimiento-general-asignaturas']);
  }

  verEstadisticasDelDocente(tareaDocenteDocencia:TareaDocenteDocenciaDTO){
    this.tareaDocenciaService.setTareDocenteDocenciaDTO(tareaDocenteDocencia);
    this.router.navigate(['/rendimiento-docente']);
  }

}
