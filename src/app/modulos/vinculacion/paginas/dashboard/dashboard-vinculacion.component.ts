import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { DashboardProyectoInvestigacion } from "src/app/models/Dashboard/DashboardProyectoInvestigacion";
import { TareaService } from "src/app/servicios/tarea.service";
import { TareaVinculacionService } from "../../servicios/tarea-vinculacion.service";
import { DashboardProyectoVinculacion } from "../../modelos/Dashboard/DashboardProyectoVinculacion";
@Component({
  selector: "app-dashboard-vinculacion",
  templateUrl: "dashboard-vinculacion.component.html",
  styleUrls: ['./dashboard-vinculacion.component.css']
})
export class DashboardVinculacionComponent implements OnInit {
  dataProyecto: DashboardProyectoInvestigacion[]=[];
  getDashboardProyectoInvestigacion$: Observable<DashboardProyectoInvestigacion[]>;

  constructor(
    private tareaService: TareaVinculacionService,
    private router: Router
  ) {
    this.getDashboardProyectoInvestigacion$ = this.tareaService.obtenerDatosProyectoDashboardVinculacion();
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.getDashboardProyectoInvestigacion$.subscribe(d => {
     this.dataProyecto = d;
    })
  }

  onSelect(event:any) {
    console.log(event);
  }

  verEstadoProyecto(proyecto:DashboardProyectoVinculacion){
    this.tareaService.setDashboardProyectoVinculacion(proyecto);
    this.router.navigate(['dashboard-tarea-vinculacion']);
  }
}

