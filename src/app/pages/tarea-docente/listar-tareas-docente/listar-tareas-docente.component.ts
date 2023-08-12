import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { TareaDocenteDocenciaDTO } from 'src/app/modulos/tarea-docencia/modelos/dto/TareaDocenteDocenciaDTO';
import { TareaDocenciaService } from 'src/app/modulos/tarea-docencia/servicios/TareaDocenciaService';
import { TareaDocenteVinculacion } from 'src/app/modulos/vinculacion/modelos/TareaDocenteVinculacion';
import { TareaVinculacionService } from 'src/app/modulos/vinculacion/servicios/tarea-vinculacion.service';
import { TareaService } from 'src/app/servicios/tarea.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas-docente.html',
  styleUrls: ['./listar-tareas-docente.component.css']
})
export class ListarTareasDocenteComponent implements OnInit {

  getTareasInvestigacion$: Observable<TareaDocente[]>;
  getTareasVinculacion$: Observable<TareaDocenteVinculacion[]>;
  getTareasDocencia$: Observable<TareaDocenteDocenciaDTO[]>;
  tareasInvestigacion: TareaDocente[] = [];
  tareasVinculacion: TareaDocenteVinculacion[] = [];
  tareasDocencia: TareaDocenteDocenciaDTO[]=[]
  totalTareasrealizar: any=[];
  docente: any = {};
  codigoDocente:any;
  idEspeDocenteRevisor:any;

  cantidadTareasInvestigacionAsignadas:number=0;
  cantidadTareasVinculacionAsignadas:number=0;
  cantidadTareasDocenciaAsignadas:number=0;

  constructor(
    private tareaService: TareaService,
    private tareaVinculacionService: TareaVinculacionService,
    private tareaDocenciaService: TareaDocenciaService,
    private usuarioService: UsuarioService,
    private router: Router,
  ) {
    this.usuarioService.codigoDocente$.subscribe((res) => {
      this.docente = res;
    });

    //this.getTareas$ = this.tareaService.obtenerTareasPorDocente(this.docente.codigoDocente);
    this.codigoDocente=localStorage.getItem('codigoDocente');
    this.idEspeDocenteRevisor = localStorage.getItem('idEspeDocenteRevisor');
    //console.log(this.codigoDocente);
    //this.getTareas$ = this.tareaService.obtenerTareasPorDocente(this.docente.codigoDocente);
    this.getTareasInvestigacion$ = this.tareaService.obtenerTareasPorDocente(this.codigoDocente);
    this.getTareasVinculacion$ = this.tareaVinculacionService.obtenerTareasPorDocente(this.codigoDocente);
    this.getTareasDocencia$ = this.tareaDocenciaService.listarTodasTareasAsignadasPorDocente(this.idEspeDocenteRevisor);
  }

  ngOnInit(): void {
    this.getTareasInvestigacion();
    this.getTareasVinculacion();
    this.getTareasDocencia();
  }

  getTareasInvestigacion() {
    this.getTareasInvestigacion$.subscribe(tareas =>{
      this.tareasInvestigacion = tareas;
    });
  }

  getTareasVinculacion() {
    this.getTareasVinculacion$.subscribe(tareas =>{
      this.tareasVinculacion = tareas;
    });
  }

  getTareasDocencia() {
    this.getTareasDocencia$.subscribe(tareas =>{
      this.tareasDocencia = tareas;
    });
  }

  // realizarTarea(tareaDocente:any){
  //   if(tareaDocente.codigoDocente){
  //     this.tareaService.setTareaDocente(tareaDocente);
  //     this.router.navigate(['realizar-tarea-docente']);
  //   }else if(tareaDocente.id){
  //     this.tareaVinculacionService.setTareaDocente(tareaDocente);
  //     this.router.navigate(['realizar-tarea-vinculacion']);
  //   }
  // }

  navegarVerTareasInvestigacion(){
    this.tareaService.setTareasDocenteModel(this.tareasInvestigacion);
    this.router.navigate(['listar-tarea-docente-investigacion']);
  }

  navegarVerTareasVinculacion(){
    this.tareaVinculacionService.setTareasDocenteModel(this.tareasVinculacion);
    this.router.navigate(['listar-tareas-docente-vinculacion']);
  }

  navegarVerTareasDocencia(){
    this.tareaDocenciaService.setTareasDocenteDocencia(this.tareasDocencia);
    this.router.navigate(['revisar-tarea-asignada-docencia']);
  }
}
