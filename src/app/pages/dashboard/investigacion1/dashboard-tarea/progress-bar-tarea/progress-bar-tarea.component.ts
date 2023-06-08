import { Component, Input, OnInit } from "@angular/core";
import { DashboardProyectoInvestigacion } from "src/app/models/Dashboard/DashboardProyectoInvestigacion";

@Component({
  selector: "app-progress-bar-tarea",
  templateUrl: "progress-bar-tarea.component.html"
})

export class ProgressBarTareaComponent implements OnInit {
  @Input() dataProgress!: DashboardProyectoInvestigacion;
  data:any[]=[];
  view: any[2] = [200, 200];

  constructor() {}
  
  ngOnInit() {
    this.getData();
  }

  getData(){
    this.data.push(this.dataProgress);
  }
}

