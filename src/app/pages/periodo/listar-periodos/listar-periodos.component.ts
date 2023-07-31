import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Periodo } from 'src/app/models/Periodo';
import { PeriodoService } from 'src/app/servicios/periodo.service';

@Component({
  selector: 'app-listar-periodos',
  templateUrl: './listar-periodos.html'
})
export class ListarPeriodosComponent implements OnInit {
  blockedDocument: boolean = false;
  getPeriodos$: Observable<Periodo[]>;
  periodos: Periodo[] = [];
  buscarTermino: string = '';

  constructor(
    private periodoService: PeriodoService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.getPeriodos$ = this.periodoService.obtenerTodosLosPeriodos();
  }

  ngOnInit(): void {
   this.getPeriodos();
  }

  getPeriodos() {
    this.getPeriodos$.subscribe(periodos =>{
      this.periodos = periodos;
    });
  }

  filtrarItems() {
    // Filtrar la lista de items basándose en el término de búsqueda
    return this.periodos.filter(item =>
      item.nombrePeriodo?.toLowerCase().includes(this.buscarTermino.toLowerCase())
    );
  }

  navegarCrearPeriodo(){
    this.router.navigate(['crear-periodo']);
  }

  editar(periodo:Periodo){
    this.periodoService.setPeriodo(periodo);
    this.router.navigate(['editar-periodo']);
  }

  cambiarEstado(periodo:Periodo){
    this.blockedDocument = true;
    this.periodoService.cambiarEstadoPeriodo(periodo.codigoPeriodo)
    .subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: "Se cambio el estado del Periódo:"+periodo.nombrePeriodo
        });
        setTimeout(() => {
          this.blockedDocument = false;
          this.getPeriodos();
        }, 1000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message ?? ' Error al cambiar el Estado del Período'
        });
        this.blockedDocument = false;
      },
      complete: () => {
      },
    })
  }
}
