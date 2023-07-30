import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Periodo } from 'src/app/models/Periodo';
import { PeriodoService } from 'src/app/servicios/periodo.service';
import { TipoProcesoService } from 'src/app/servicios/tipo-proceso.service';

@Component({
  selector: 'app-crear-periodo',
  templateUrl: './crear-periodo.html',
  styleUrls:['./crear-periodo.component.css']
})
export class CrearPeriodoComponent implements OnInit {
  blockedDocument: boolean = false;
  periodo: Periodo = {};

  constructor(
    private router:Router,
    private periodoService :PeriodoService,
    private tipoProcesoService: TipoProcesoService,
    private messageService: MessageService
    ) {
  }

  ngOnInit(): void {}


  regresar() {
    this.router.navigate(["listar-periodos"])
  }

  save(){
    this.blockedDocument = true;
    this.periodoService.crearPeriodo(this.periodo)
    .subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'El Período ha sido creado con éxito'
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
          detail: err?.message ?? ' Error al crear el Período'
        });
        this.blockedDocument = false;
      },
      complete: () => {
      },
    })
  }

}
