import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Proyecto } from 'src/app/models/Proyecto';
import { TipoProceso } from 'src/app/models/TipoProceso';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TipoProcesoService } from 'src/app/servicios/tipo-proceso.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-proyectos',
  templateUrl: './crear-proyectos.html',
  styleUrls:['./crear-proyecto.component.css']
})
export class CrearProyectosComponent implements OnInit {
  blockedDocument: boolean = false;
  proyecto: Proyecto = {};
  getProceso$: Observable<TipoProceso>;
  tipoProceso: TipoProceso={};

  constructor(
    private router:Router,
    private proyectoService:ProyectoService,
    private tipoProcesoService: TipoProcesoService,
    private messageService: MessageService
    ) {
      this.getProceso$ =
      this.tipoProcesoService.obtenerProcesoPorNombreProceso('INVESTIGACIÓN');
  }

  ngOnInit(): void {
    this.getProcesos();
  }

  getProcesos(){
    this.getProceso$.subscribe(tipoProceso =>{
      this.tipoProceso = tipoProceso;
    });
  }

  regresar() {
    this.router.navigate(["listar-proyectos"])
  }

  save(){
    this.blockedDocument = true;
    this.proyecto.tipoProceso = this.tipoProceso;
    this.proyectoService.crearProyecto(this.proyecto)
    .subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'El proyecto ha sido creado con éxito'
        });
        setTimeout(() => {
          this.blockedDocument = false;
          this.router.navigate(["listar-proyectos"])
        }, 2000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message ?? ' Error al crear el proyecto'
        });
        this.blockedDocument = false;
      },
      complete: () => {
        // this.isLoading = false;
      },
    })
  }

}
