import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TipoProceso } from 'src/app/models/TipoProceso';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TipoProcesoService } from 'src/app/servicios/tipo-proceso.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {
  blockedDocument: boolean = false;
  visualBlockedDocument: boolean = true;
  proyecto: any = {};
  getProcesos$: Observable<TipoProceso[]>;
  tipoProcesos: TipoProceso[] = [];

  constructor(
    private router: Router,
    private proyectoService: ProyectoService,
    private tipoProcesoService: TipoProcesoService,
    private messageService: MessageService
  ) {
    this.proyectoService.proyecto$.subscribe((res) => {
      this.proyecto = res;
      if (this.proyecto == null) {
        this.visualBlockedDocument = false;
        this.back();
      }
    });
    this.getProcesos$ = this.tipoProcesoService.obtenerTipoProcesos();

  }

  ngOnInit(): void {
    this.getProcesos();
  }

  save() {
    this.blockedDocument = true;
    this.proyectoService.editarProyecto(this.proyecto)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Los datos del proyecto han sido modificados con éxito'
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
            detail: err?.message ?? ' Error al editar los datos del proyecto'
          });
          this.blockedDocument = false;
        },
        complete: () => {
          // this.isLoading = false;
        },
      })
  }

  back() {
    this.router.navigate(['listar-proyectos']);
  }

  getProcesos() {
    this.getProcesos$.subscribe(tipoProcesos => {
      this.tipoProcesos = tipoProcesos;
    });
  }

  compararProcesos(tipoProceso1: TipoProceso, tipoProceso2: TipoProceso) {
    if (tipoProceso1 == null || tipoProceso2 == null) {
      return false;
    }
    return tipoProceso1.nombreTipoProceso === tipoProceso2.nombreTipoProceso;
  }

  regresar() {
    this.router.navigate(["listar-proyectos"])
  }


}
