import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TareaDocenteDocenciaDTO } from 'src/app/modulos/tarea-docencia/modelos/dto/TareaDocenteDocenciaDTO';
import { TareaDocenciaService } from 'src/app/modulos/tarea-docencia/servicios/TareaDocenciaService';

@Component({
  selector: 'app-rendimiento-general-asignaturas',
  templateUrl: './rendimiento-general-asignaturas.component.html',
  styleUrls: ['./rendimiento-general-asignaturas.component.css']
})
export class RendimientoGeneralAsignaturasComponent implements OnInit {
  tareaDocenteDocenciaDTO:TareaDocenteDocenciaDTO[]| null=[];
  view: [number,number] = [1200, 140];
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'DOCENTES';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Promedio General de Todas las Asignaturas subidas';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

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
          tareaDocente.name=tareaDocente.docenteAsignado?.apellidoDocente+" "+tareaDocente.docenteAsignado?.nombreDocente;
          tareaDocente.value=tareaDocente.rendimientoGeneralTodasMaterias;
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
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    const selectedName= data.name;
    const selectedData = this.tareaDocenteDocenciaDTO?.find((item) => item.name === selectedName);
    if(selectedData){
      this.tareaDocenteService.setTareDocenteDocenciaDTO(selectedData);
      this.router.navigate(['rendimiento-docente']);
    }
  }

}
