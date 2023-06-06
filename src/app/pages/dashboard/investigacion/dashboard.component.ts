import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard-investigacion.component.html"
})
export class DashboardInvestigacionComponent implements OnInit {
  public canvas : any;
  public ctx:any;
  public datasets: any;
  public data: any;
  public myChartData:any;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;

  constructor() {}

  ngOnInit() {
  }
}
