import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TareaIndicador } from 'src/app/models/TareaIndicador';
import { TareaService } from 'src/app/servicios/tarea.service';
@Component({
  selector: 'app-dashboard-tarea',
  templateUrl: './dashboard-tarea.component.html',
  styleUrls: ['./dashboard-tarea.component.css'],
})
export class DashboardTareaComponent implements OnInit {
  dataDashboardTarea: any = {};
  dataPieChart!: any;
  view: any[2] = [500, 400];
  dataBarHorizontal!: any;
  tareaIndicadores: TareaIndicador[] = [];

  // options GroupedBar
  view2: any[2] = [500, 300];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showLegend: boolean = true;
  legendPosition: any = 'below';
  showXAxisLabel: boolean = false;
  yAxisLabel: string = 'ACTIVIDADES';
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Population';
  //
  classContainer!: string;

  constructor(private tareaService: TareaService, private router: Router) {
    this.tareaService.dashboardProyectoInvestigacion$.subscribe((res) => {
      this.dataDashboardTarea = res;
      if (this.dataDashboardTarea == null) {
        this.back();
      } else {
        this.dataPieChart =
          this.dataDashboardTarea.dasboardTareaInvestigacionList;
        if (this.dataPieChart.length <= 3) {
          this.classContainer = 'small-container';
        } else if (this.dataPieChart.length <= 6) {
          this.classContainer = 'medium-container';
        } else {
          this.classContainer = 'big-container';
        }
      }
    });
  }

  ngOnInit() {}

  back() {
    this.router.navigate(['dashboard-investigacion']);
  }
}
