import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProyectoVinculacionService } from '../../../servicios/proyecto-vinculacion.service';
import { ProyectoVinculacion } from '../../../modelos/ProyectoVinculacion';

@Component({
  selector: 'app-listar-proyectos-vinculacion',
  templateUrl: './listar-proyectos-vinculacion.html'
})
export class ListarProyectosVinculacionComponent implements OnInit {

  getProyectos$: Observable<ProyectoVinculacion[]>;
  proyectos: ProyectoVinculacion[] = [];
  //descPerfil: any;

  constructor(
    private proyectoService: ProyectoVinculacionService,
    private router: Router,
  ) {
    this.getProyectos$ = this.proyectoService.obtenerProyectosVinculacion();
    //this.descPerfil=localStorage.getItem('descPerfil');
  }

  ngOnInit(): void {
   this.getProyectos();
  }


  getProyectos() {
    this.getProyectos$.subscribe(proyectos =>{
      this.proyectos = proyectos;
    });
  }

  navegarCrearProyecto(){
    this.router.navigate(['crear-proyecto-vinculacion']);
  }

  editar(proy:ProyectoVinculacion){
    this.proyectoService.setProyecto(proy);
    this.router.navigate(['editar-proyecto-vinculacion']);
  }

  // cambiarEstado(proy:Proyecto){
  //   this.proyectoService.cambiarEstadoProyecto(proy.codigoProyecto)
  //   .subscribe(data=>{
  //     confirm("Se cambio el estado del Proyecto:"+proy.nombreProyecto);
  //     this.getProyectos();
  //   })
  // }
}
