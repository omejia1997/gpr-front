import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TipoProceso } from 'src/app/models/TipoProceso';
import { PeriodoService } from 'src/app/servicios/periodo.service';
import { TipoProcesoService } from 'src/app/servicios/tipo-proceso.service';

@Component({
  selector: 'app-editar-periodo',
  templateUrl: './editar-periodo.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarPeriodoComponent implements OnInit {
  blockedDocument: boolean = false;
  visualBlockedDocument: boolean = true;
  periodo: any = {};

  constructor(
    private router: Router,
    private periodoService: PeriodoService,
    private tipoProcesoService: TipoProcesoService,
    private messageService: MessageService
  ) {
    this.periodoService.periodo$.subscribe((res) => {
      this.periodo = res;
      if (this.periodo == null) {
        this.visualBlockedDocument = false;
        this.back();
      }
    });
  }

  ngOnInit(): void {
  }

  save() {
    this.blockedDocument = true;
    this.periodoService.editarPeriodo(this.periodo)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Los datos del Período han sido modificados con éxito'
          });
          setTimeout(() => {
            this.blockedDocument = false;
            this.router.navigate(["listar-periodos"])
          }, 2000);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err?.message ?? ' Error al editar los datos del Período'
          });
          this.blockedDocument = false;
        },
        complete: () => {
          // this.isLoading = false;
        },
      })
  }

  back() {
    this.router.navigate(['listar-periodos']);
  }

  regresar() {
    this.router.navigate(["listar-periodos"])
  }


}
