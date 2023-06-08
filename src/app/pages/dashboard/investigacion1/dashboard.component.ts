import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { DashboardProyectoInvestigacion } from "src/app/models/Dashboard/DashboardProyectoInvestigacion";
import { TareaService } from "src/app/servicios/tarea.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard-investigacion.component.html"
})
export class DashboardInvestigacionComponent implements OnInit {
  //view: any[2] = [500, 400];
  dataProyecto: DashboardProyectoInvestigacion[]=[];
  getDashboardProyectoInvestigacion$: Observable<DashboardProyectoInvestigacion[]>;

  constructor(
    private tareaService: TareaService,
    private router: Router
  ) {
    this.getDashboardProyectoInvestigacion$ = this.tareaService.obtenerDatosProyectoDashboardInvestigacion(2);
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.getDashboardProyectoInvestigacion$.subscribe(d => {
     this.dataProyecto = d;
     console.log(d)
    })
  }  

  onSelect(event:any) {
    console.log(event);
  }
  verEstadoProyecto(proyecto:DashboardProyectoInvestigacion){
    this.tareaService.setDashboardProyectoInvestigacion(proyecto);
    this.router.navigate(['dashboard-tarea-investigacion']);
  }
}

