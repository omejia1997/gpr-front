import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TareaDocenteDocenciaDTO } from 'src/app/modulos/tarea-docencia/modelos/dto/TareaDocenteDocenciaDTO';
import { TareaDocenciaService } from 'src/app/modulos/tarea-docencia/servicios/TareaDocenciaService';

interface DataLineChart{
  name?: string;
  series?:SerieLineChart[];
}

interface SerieLineChart {
  name?: string;
  value?: number;
}

interface DataPieChart {
  name?: string;
  value?: number;
}


@Component({
  selector: 'app-rendimiento-docente',
  templateUrl: './rendimiento-docente.component.html',
  styleUrls: ['./rendimiento-docente.component.css']
})

export class RendimientoDocenteComponent implements OnInit {
  seriesLineChart!: SerieLineChart[];


  dataPieChart!:DataPieChart[];
  // dataPieChartDataPieChart:DataPieChart={}

  tareaDocenteDocenciaDTO:TareaDocenteDocenciaDTO| null={};


  multi!: any[];
  view: [number,number] = [700, 300];


  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Parcial';
  yAxisLabel: string = 'Calificación';
  timeline: boolean = true;

  view2: [number,number] = [200, 280];
  gradient: boolean = true;
  showLegend: boolean = true;

  colorScheme2:any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  colorScheme:any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  // options
  showXAxis = true;
  showYAxis = true;


  constructor(
    private tareaDocenteService: TareaDocenciaService,
    private router: Router
    ) {
      this.tareaDocenteService.tareaDocenteDocenciaDTO$.subscribe((res) => {
        this.tareaDocenteDocenciaDTO = res;
        if (this.tareaDocenteDocenciaDTO == null) {
          this.back();
        } else {
          this.tareaDocenteDocenciaDTO.informeFinal?.datosAsignatura?.forEach(asignatura=>{
            let dataLineChart:DataLineChart={};
            let serieLineChart:SerieLineChart={};
            let dataSinglePieChart:DataPieChart={};
            let dataLineChartArray:DataLineChart[]=[];
            let dataVerticalBarChartArray=[];
            this.seriesLineChart=[];
            this.dataPieChart=[];

            asignatura.dataLineChart=[];
            dataLineChart.name = asignatura.asignatura;
            serieLineChart.name='I-UD';
            if(asignatura.promedioRendimientoAcademico?.primerParcial!=undefined){
              console.log("entro")
              serieLineChart.value=asignatura.promedioRendimientoAcademico.primerParcial;
              console.log(serieLineChart.value)
            }else{
              console.log("ss")
              serieLineChart.value=0;
            }
            this.seriesLineChart.push(serieLineChart);
            serieLineChart={};
            serieLineChart.name='II-UD';
            if(asignatura.promedioRendimientoAcademico?.segundoParcial){
              serieLineChart.value=asignatura.promedioRendimientoAcademico.segundoParcial;
            }else{
              serieLineChart.value=0;
            }

            this.seriesLineChart.push(serieLineChart);
            serieLineChart={};
            serieLineChart.name='III-UD';
            if(asignatura.promedioRendimientoAcademico?.tercerParcial){
              serieLineChart.value=asignatura.promedioRendimientoAcademico.tercerParcial;
            }else{
              serieLineChart.value=0;
            }
            this.seriesLineChart.push(serieLineChart);
            dataLineChart.series= this.seriesLineChart;
            dataLineChartArray.push(dataLineChart);
            asignatura.dataLineChart = dataLineChartArray;

            //DataPieChart
            dataSinglePieChart.name = "Estudiantes Reprobados";
            dataSinglePieChart.value = asignatura.estudiantesReprobados?.total?asignatura.estudiantesReprobados?.total:0;
            this.dataPieChart.push(dataSinglePieChart);
            dataSinglePieChart = {};
            dataSinglePieChart.name = "Estudiantes Aprobados";
            dataSinglePieChart.value = asignatura.estudiantesAprobados?.total?asignatura.estudiantesAprobados?.total:0;
            this.dataPieChart.push(dataSinglePieChart);
            asignatura.dataPieChart=this.dataPieChart;

            //DataVerticalBarChart
            serieLineChart={};
            serieLineChart.name = 'Promedio Final';
            serieLineChart.value = asignatura.promedioFinalRendimientoAcademico?asignatura.promedioFinalRendimientoAcademico:0;
            dataVerticalBarChartArray.push(serieLineChart);
            asignatura.dataVerticalBarChart = dataVerticalBarChartArray;
          })
        }
      });
    }

  ngOnInit() {
  }


  back(){
    this.router.navigate(['revisar-todos-informe-final-subidos']);
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}
