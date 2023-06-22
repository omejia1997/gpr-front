import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TipoProceso } from 'src/app/models/TipoProceso';
import { ProyectoVinculacionService } from '../../../servicios/proyecto-vinculacion.service';

@Component({
  selector: 'app-editar-proyecto-vinculacion',
  templateUrl: './editar-proyecto-vinculacion.html',
  styleUrls: ['./editar-proyecto-vinculacion.component.css'],
})
export class EditarProyectoVinculacionComponent implements OnInit {
  blockedDocument: boolean = false;
  visualBlockedDocument: boolean = true;
  proyecto: any = {};
  comboFinanciamiento: any;
  comboPropiedadProyecto: any;
  tipoProcesos: TipoProceso[] = [];

  constructor(
    private router: Router,
    private proyectoService: ProyectoVinculacionService,
    private messageService: MessageService
  ) {
    this.proyectoService.proyecto$.subscribe((res) => {
      this.proyecto = res;
      if (this.proyecto == null) {
        this.visualBlockedDocument = false;
        this.back();
      }
    });
  }

  ngOnInit(): void {
    this.comboFinanciamiento = ['CON FINANCIAMIENTO', 'SIN FINANCIAMIENTO'];
    this.comboPropiedadProyecto = ['PROPIO', 'OTROS DEPARTAMENTOS'];
  }

  save() {
    this.blockedDocument = true;
    this.proyectoService.editarProyectoVinculacion(this.proyecto).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Los datos del proyecto han sido modificados con éxito',
        });
        setTimeout(() => {
          this.blockedDocument = false;
          this.router.navigate(['listar-proyectos-vinculacion']);
        }, 2000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message ?? ' Error al editar los datos del proyecto',
        });
        this.blockedDocument = false;
      },
      complete: () => {
        // this.isLoading = false;
      },
    });
  }

  back() {
    this.router.navigate(['listar-proyectos-vinculacion']);
  }
}
