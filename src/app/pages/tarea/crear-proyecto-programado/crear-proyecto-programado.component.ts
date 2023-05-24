import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Proyecto } from 'src/app/models/Proyecto';
import { TipoProceso } from 'src/app/models/TipoProceso';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TipoProcesoService } from 'src/app/servicios/tipo-proceso.service';
import { MessageService } from 'primeng/api';
import { TareaService } from 'src/app/servicios/tarea.service';

@Component({
  selector: 'app-crear-proyecto-programado',
  templateUrl: './crear-proyecto-programado.component.html',
  styleUrls:['./crear-proyecto-programado.component.css']
})
export class CrearProyectoProgramadoComponent implements OnInit {
  blockedDocument: boolean = false;
  proyecto: Proyecto = {};
  proyectoModel: any = {};
  data: any;

  constructor(
    private router:Router,
    private tareaService:TareaService,
    private messageService: MessageService
    ) {
      
  }

  ngOnInit(): void {
    this.data = localStorage.getItem('proyecto');
    this.proyectoModel = JSON.parse(this.data);
  }

  regresar() {
    this.router.navigate(["listar-tareas-programadas"])
  }

  save(){
    this.blockedDocument = true; 
    this.proyecto.tipoProceso = this.proyectoModel.tipoProceso;
    this.tareaService.crearProyectoProgramado(this.proyecto,this.proyectoModel.codigoProyecto)
    .subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'El proyecto ha sido creado con éxito'
        });
        setTimeout(() => {
          this.blockedDocument = false; 
          this.router.navigate(["listar-tareas-programadas"])
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
