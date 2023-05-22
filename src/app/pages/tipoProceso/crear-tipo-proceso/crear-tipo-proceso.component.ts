import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoProceso } from 'src/app/models/TipoProceso';
import { TipoProcesoService } from 'src/app/servicios/tipo-proceso.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-tipo-proceso',
  templateUrl: './crear-tipo-proceso.html',
  styleUrls: ['./crear-tipo-proceso.component.css']
})
export class CrearTipoProcesoComponent implements OnInit {
  tipoProceso: TipoProceso = {};
  blockedDocument: boolean = false;
  constructor(
    private router: Router,
    private tipoProcesoService: TipoProcesoService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  save() {
    this.blockedDocument = true;
    this.tipoProcesoService.crear(this.tipoProceso)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'El proceso ha sido creado con éxito'
          });
          setTimeout(() => {
            this.blockedDocument = false;
            this.router.navigate(["listar-tipos-procesos"])
          }, 2000);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err?.message ?? ' Error al crear el proceso'
          });
          this.blockedDocument = false;
        },
        complete: () => {
          // this.isLoading = false;
        },
      })
  }

  regresar() {
    this.router.navigate(["listar-tipos-procesos"])
  }

}
