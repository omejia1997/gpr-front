import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TipoProcesoService } from 'src/app/servicios/tipo-proceso.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-editar-tipo-proceso',
  templateUrl: './editar-tipo-proceso.html',
  styleUrls:['./editar-tipo-proceso.css']
})
export class EditarTipoProcesoComponent implements OnInit {
  tipoProceso: any = {};
  blockedDocument: boolean = false;
  visualBlockedDocument: boolean = true;
  constructor(
    private router:Router,
    private tipoProcesoService:TipoProcesoService,
    private messageService: MessageService
    ) {
      this.tipoProcesoService.tipoProceso$.subscribe((res) => {
        this.tipoProceso = res;
        if (this.tipoProceso == null) {
          this.visualBlockedDocument=false;
          this.back();
        }
      });
  }

  ngOnInit(): void {
  }

  save(){
    this.blockedDocument = true; 
    this.tipoProcesoService.editarTipoProceso(this.tipoProceso)
    .subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Los datos del proceso han sido modificados con éxito'
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
          detail: err?.message ?? ' Error al modificar el proceso'
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

  back() {
    this.router.navigate(['listar-tipos-procesos']);
  }

}
