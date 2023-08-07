import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TareaDocenteDocenciaDTO } from 'src/app/modulos/tarea-docencia/modelos/dto/TareaDocenteDocenciaDTO';
import { TareaDocenciaService } from 'src/app/modulos/tarea-docencia/servicios/TareaDocenciaService';


interface DataBar {
  name?: string;
  value?: number;
}

@Component({
  selector: 'app-rendimiento-general-asignaturas',
  templateUrl: './rendimiento-general-asignaturas.component.html',
  styleUrls: ['./rendimiento-general-asignaturas.component.css']
})
export class RendimientoGeneralAsignaturasComponent implements OnInit {
  tareaDocenteDocenciaDTO:TareaDocenteDocenciaDTO[]| null=[];
  buscarTermino: string = '';
  // options
  // view: [number,number] = [1200, 140];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'ASIGNATURAS';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'PROMEDIOS FINALES';

  constructor(
    private tareaDocenteService: TareaDocenciaService,
    private router: Router
  ) {
    this.tareaDocenteService.tareasDocenteDocencia$.subscribe((res) => {
      this.tareaDocenteDocenciaDTO = res;
      if (this.tareaDocenteDocenciaDTO == null) {
        this.back();
      } else {
        this.tareaDocenteDocenciaDTO.forEach(tareaDocente=>{
          let seriesBar:DataBar;
          tareaDocente.seriesBar=[];
          tareaDocente.nombreCompletoDocente = tareaDocente.docenteAsignado?.apellidoDocente+" "+tareaDocente.docenteAsignado?.nombreDocente;
          tareaDocente.informeFinal?.datosAsignatura?.forEach(datosAsignatura=>{
            seriesBar = {}
            seriesBar.name = datosAsignatura.asignatura;
            seriesBar.value = datosAsignatura.promedioFinalRendimientoAcademico?datosAsignatura.promedioFinalRendimientoAcademico:0;
            tareaDocente.seriesBar?.push(seriesBar);
          })
        })
      }
    });
  }

  ngOnInit() {
  }

  filtrarItems() {
    // Filtrar la lista de items basándose en el término de búsqueda
    return this.tareaDocenteDocenciaDTO?.filter(item =>
      item.nombreCompletoDocente?.toLowerCase().includes(this.buscarTermino.toLowerCase())
      );
  }

  back(){
    this.router.navigate(['revisar-todos-informe-final-subidos']);
  }

  onSelect(data:any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    // const selectedName= data.name;
    // const selectedData = this.tareaDocenteDocenciaDTO?.find((item) => item.name === selectedName);
    // if(selectedData){
    //   this.tareaDocenteService.setTareDocenteDocenciaDTO(selectedData);
    //   this.router.navigate(['rendimiento-docente']);
    // }

    this.tareaDocenteService.setTareDocenteDocenciaDTO(data);
    this.router.navigate(['rendimiento-docente']);
  }

}
