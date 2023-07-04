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
  //
  classContainer!:string;

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
        if(this.dataPieChart.length<=3){
          this.classContainer = "small-container";
        }else if(this.dataPieChart.length<=6){
          this.classContainer = "medium-container";
        }else{
          this.classContainer = "big-container";
        }
      }
    });
   }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['dashboard-vinculacion']);
  }

}

