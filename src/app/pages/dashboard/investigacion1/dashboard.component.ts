import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardProyectoInvestigacion } from 'src/app/models/Dashboard/DashboardProyectoInvestigacion';
import { TareaService } from 'src/app/servicios/tarea.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard-investigacion.component.html',
  styleUrls: ['./dashboard-investigacion.component.css'],
})
export class DashboardInvestigacionComponent implements OnInit {
  searchTerm!: string;
  dataFiltrada!: any[];
  //view: any[2] = [500, 400];
  dataProyecto: any[] = [];
  getDashboardProyectoInvestigacion$: Observable<
    DashboardProyectoInvestigacion[]
  >;

  constructor(private tareaService: TareaService, private router: Router) {
    this.getDashboardProyectoInvestigacion$ =
      this.tareaService.obtenerDatosProyectoDashboardInvestigacion(2);
  }

  ngOnInit() {
    this.getData();
  }

  search() {
    if (this.searchTerm)
      this.dataFiltrada = this.dataProyecto.filter((obj) =>
        obj.name.includes(this.searchTerm.toUpperCase())
      );
    else this.dataFiltrada = this.dataProyecto;
  }

  getData() {
    this.getDashboardProyectoInvestigacion$.subscribe((d) => {
      this.dataProyecto = d;
      this.search();
    });
  }

  onSelect(event: any) {
    console.log(event);
  }

  verEstadoProyecto(proyecto: DashboardProyectoInvestigacion) {
    this.tareaService.setDashboardProyectoInvestigacion(proyecto);
    this.router.navigate(['dashboard-tarea-investigacion']);
  }
}
