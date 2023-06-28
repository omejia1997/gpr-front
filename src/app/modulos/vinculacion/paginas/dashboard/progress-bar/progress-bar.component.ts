import { Component, Input, OnInit } from "@angular/core";
import { DashboardProyectoInvestigacion } from "src/app/models/Dashboard/DashboardProyectoInvestigacion";

@Component({
  selector: "app-progress-bar",
  templateUrl: "progress-bar.component.html"
})

export class ProgressBarComponent implements OnInit {
  @Input() dataProgress!: DashboardProyectoInvestigacion;
  data:any[]=[];
  view: any[2] = [200, 200];

  constructor() {}
  
  ngOnInit() {
    this.getData();
  }

  getData(){
    if(isNaN(this.dataProgress.value))
      this.dataProgress.value =0;
    this.data.push(this.dataProgress);
  }
}

