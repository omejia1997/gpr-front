import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TipoProceso } from 'src/app/models/TipoProceso';
import { TipoProcesoService } from 'src/app/servicios/tipo-proceso.service';
import { MessageService } from 'primeng/api';
import { ProyectoVinculacion } from '../../../modelos/ProyectoVinculacion';
import { ProyectoVinculacionService } from '../../../servicios/proyecto-vinculacion.service';

@Component({
  selector: 'app-crear-proyecto-vinculacion',
  templateUrl: './crear-proyecto-vinculacion.html',
  styleUrls:['./crear-proyecto-vinculacion.component.css']
})
export class CrearProyectoVinculacionComponent implements OnInit {
  blockedDocument: boolean = false;
  proyecto: ProyectoVinculacion = {};
  getProcesos$: Observable<TipoProceso[]>;
  tipoProcesos: TipoProceso[]=[];
  comboFinanciamiento: any;
  comboPropiedadProyecto: any;

  constructor(
    private router:Router,
    private proyectoService:ProyectoVinculacionService,
    private tipoProcesoService: TipoProcesoService,
    private messageService: MessageService
    ) {
      this.getProcesos$ = this.tipoProcesoService.obtenerTipoProcesosActivos();
  }

  ngOnInit(): void {
    this.comboFinanciamiento = ["CON FINANCIAMIENTO", "SIN FINANCIAMIENTO"];
    this.comboPropiedadProyecto = ["PROPIO", "OTROS DEPARTAMENTOS"];
    this.getProcesos();
  }

  getProcesos(){
    this.getProcesos$.subscribe(tipoProcesos =>{
      this.tipoProcesos = tipoProcesos;
    });
  }

  regresar() {
    this.router.navigate(["listar-proyectos-vinculacion"])
  }

  save(){
    this.blockedDocument = true;
    console.log(this.proyecto);
    this.proyectoService.crearProyectoVinculacion(this.proyecto)
    .subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'El proyecto ha sido creado con éxito'
        });
        setTimeout(() => {
          this.blockedDocument = false;
          this.router.navigate(["listar-proyectos-vinculacion"])
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
