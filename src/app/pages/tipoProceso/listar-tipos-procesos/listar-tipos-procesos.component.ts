import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/Proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { Observable } from 'rxjs';
import { TipoProceso } from 'src/app/models/TipoProceso';
import { TipoProcesoService } from 'src/app/servicios/tipo-proceso.service';

@Component({
  selector: 'app-listar-proyectos',
  templateUrl: './listar-tipos-procesos.html'
})
export class ListarTiposProcesosComponent implements OnInit {

  getTiposProcesos$: Observable<TipoProceso[]>;
  tiposProcesos: TipoProceso[] = [];
  
  constructor(
    private tipoProcesoService: TipoProcesoService,
    private router: Router,
  ) {
    this.getTiposProcesos$ = this.tipoProcesoService.obtenerTipoProcesos();
  }

  ngOnInit(): void {
   this.getTiposProcesos();
  }

  getTiposProcesos() {
    this.getTiposProcesos$.subscribe(tiposProcesos =>{
      this.tiposProcesos = tiposProcesos;  
    });
  }

  navegarCrearTipoProceso(){
    this.router.navigate(['crear-tipo-proceso']);
  }

  editar(tipoProceso:TipoProceso){
    this.tipoProcesoService.setTipoProceso(tipoProceso);
    this.router.navigate(['editar-tipo-proceso']);
  }

  cambiarEstadoProceso(proceso:TipoProceso){
    this.tipoProcesoService.cambiarEstadoProceso(proceso.codigoTipoProceso)
    .subscribe(data=>{
      confirm("Se cambio el estado del Proceso: "+proceso.nombreTipoProceso);
      this.getTiposProcesos();
    })
  }
}
