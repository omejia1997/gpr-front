import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TareaIndicador } from "src/app/models/TareaIndicador";
import { TareaVinculacionService } from "../../../servicios/tarea-vinculacion.service";
@Component({
  selector: "app-dashboard-tarea-vinculacion",
  templateUrl: "./dashboard-tarea-vinculacion.component.html",
  styleUrls: ['./dashboard-tarea-vinculacion.component.css']
})
export class DashboardTareaVinculacionComponent implements OnInit {

  dataDashboardTarea: any = {};
  dataPieChart!:any;
  view: any[2] =  [500, 400];
  dataBarHorizontal!:any;

  // options GroupedBar
  view2: any[2] =  [500,300];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showLegend: boolean = true;
  legendPosition: any = 'below';
  showXAxisLabel: boolean = false;
  yAxisLabel: string = 'ACTIVIDADES';
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Population';

  constructor(
    private tareaService: TareaVinculacionService,
    private router: Router
  ) {
    this.tareaService.dashboardProyectoVinculacion$.subscribe((res) => {
      this.dataDashboardTarea = res;
      if (this.dataDashboardTarea == null) {
        this.back();
      } else{
        this.dataPieChart= this.dataDashboardTarea.dasboardTareaVinculacionList;
        console.log(this.dataDashboardTarea )
      }
    });
   }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['dashboard-vinculacion']);
  }

}

