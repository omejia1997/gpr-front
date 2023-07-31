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
  templateUrl: './listar-tareas-docente.html'
})
export class ListarTareasDocenteComponent implements OnInit {

  getTareas$: Observable<TareaDocente[]>;
  getTareasVinculacion$: Observable<TareaDocenteVinculacion[]>;
  getTareasDocencia$: Observable<TareaDocenteDocenciaDTO[]>;
  tareas: TareaDocente[] = [];
  tareasVinculacion: TareaDocenteVinculacion[] = [];
  totalTareasrealizar: any=[];
  docente: any = {};
  codigoDocente:any;

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
    //console.log(this.codigoDocente);
    //this.getTareas$ = this.tareaService.obtenerTareasPorDocente(this.docente.codigoDocente);
    this.getTareas$ = this.tareaService.obtenerTareasPorDocente(this.codigoDocente);
    this.getTareasVinculacion$ = this.tareaVinculacionService.obtenerTareasPorDocente(this.codigoDocente);
    this.getTareasDocencia$ = this.tareaDocenciaService.obtenerTareasPorDocente(this.codigoDocente);

  }

  ngOnInit(): void {
   this.getTareas();

  }

  getTareas() {
    this.getTareas$.subscribe(tareas =>{
      this.tareas = tareas;
      this.getTareasVinculacion();
    });
  }

  getTareasVinculacion() {
    this.totalTareasrealizar=this.totalTareasrealizar.concat(this.tareas,this.tareasVinculacion);
      this.totalTareasrealizar.sort(function (a:any, b:any) {//Ordenar Array
        if (a.estadoTareaDocente === "ASIGNADA") {
          return -1;
        }
        return 0;
      });
    this.getTareasVinculacion$.subscribe(tareas =>{
      this.tareasVinculacion = tareas;
      this.totalTareasrealizar=this.totalTareasrealizar.concat(this.tareas,this.tareasVinculacion);
      this.totalTareasrealizar.sort(function (a:any, b:any) {//Ordenar Array
        if (a.estadoTareaDocente === "ASIGNADA") {
          return -1;
        }
        return 0;
      });
    });
  }

  realizarTarea(tareaDocente:any){
    if(tareaDocente.codigoDocente){
      this.tareaService.setTareaDocente(tareaDocente);
      this.router.navigate(['realizar-tarea-docente']);
    }else if(tareaDocente.id){
      this.tareaVinculacionService.setTareaDocente(tareaDocente);
      this.router.navigate(['realizar-tarea-vinculacion']);
    }
  }

  /*editarTarea(tareaDocenteProyecto:TareaDocenteProyecto){
    //tareaDocente TareaDocente
    this.tareaService.setTarea(tareaDocenteProyecto);
    this.router.navigate(['editar-tarea']);
  }*/
}
