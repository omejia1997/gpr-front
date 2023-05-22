import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/Proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { Observable } from 'rxjs';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { TareaService } from 'src/app/servicios/tarea.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TareaDocenteProyecto } from 'src/app/models/TareaDocenteProyecto';

@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas-docente.html'
})
export class ListarTareasDocenteComponent implements OnInit {

  getTareas$: Observable<TareaDocente[]>;
  tareas: TareaDocente[] = [];
  docente: any = {};
  codigoDocente:any;

  constructor(
    private tareaService: TareaService,
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

  }

  ngOnInit(): void {
   this.getTareas();
  }

  getTareas() {
    this.getTareas$.subscribe(tareas =>{
      this.tareas = tareas;  
    });
  }

  realizarTarea(tareaDocente:TareaDocente){
    //tareaDocente TareaDocente
    this.tareaService.setTareaDocente(tareaDocente);
    this.router.navigate(['realizar-tarea-docente']);
  }

  /*editarTarea(tareaDocenteProyecto:TareaDocenteProyecto){
    //tareaDocente TareaDocente
    this.tareaService.setTarea(tareaDocenteProyecto);
    this.router.navigate(['editar-tarea']);
  }*/
}
