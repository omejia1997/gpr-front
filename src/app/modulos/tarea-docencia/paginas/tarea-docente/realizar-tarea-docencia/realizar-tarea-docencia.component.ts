import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-realizar-tarea-docencia',
  templateUrl: './realizar-tarea-docencia.component.html',
  styleUrls: ['./realizar-tarea-docencia.component.css']
})
export class RealizarTareaDocenciaComponent implements OnInit {
  blockedDocument: boolean = false;
  tareaDocenciaDTO: TareaDocenciaRequest={};
  actividadRealizar!: string;
  cargos!:string[];
  cargoSeleccionado!: string;
  docentes: Docente[] = [];
  docentesAsignados: Docente[] = [];


  constructor(
    private router: Router,
    private tareaServiceGpr: TareaService,
    private tareaDocenciaService: TareaDocenciaService,
    private messageService: MessageService
    ) {
    this.cargos = cargos;
    this.tareaDocenciaRequest.observacionTarea=[];
  }

  ngOnInit() {
  }

  back(){
    this.router.navigate(['listar-tarea-docente']);
  }

  buscarDocentesPorCargo() {
    // this.getDocentes$ = this.tareaServiceGpr.obtenerTodosDocentesPorCargo(
    //   this.cargo.codCargo
    // );
    this.tareaServiceGpr.obtenerTodosDocentesPorNombreCargo(this.cargoSeleccionado).subscribe((docentes) => {
      this.docentes = docentes;
      if (this.docentesAsignados.length == 0) {
        this.docentes.forEach((docente) => {
          docente.checked = false;
        });
      } else {
        this.docentes.forEach((docente) => {
          docente.checked = false;
          if (
            this.docentesAsignados.find(
              (item) => item.codigoDocente === docente.codigoDocente
            )
          ) {
            docente.checked = true;
          }
        });
      }
    });
  }

  cambiarTodosDocentes() {
    this.docentes.forEach((docente) => {
      docente.checked = !docente.checked;
      if (!docente.checked)
        this.docentesAsignados = this.docentesAsignados.filter(
          (item) => item.codigoDocente !== docente.codigoDocente
        );
      else this.docentesAsignados.push(docente);
    });
  }

  cambiarCheckDocente(docente: Docente) {
    docente.checked = !docente.checked;
    if (!docente.checked)
      this.docentesAsignados = this.docentesAsignados.filter(
        (item) => item.codigoDocente !== docente.codigoDocente
      );
    else this.docentesAsignados.push(docente);
  }

  agregarActividadTarea(){
    this.tareaDocenciaRequest.observacionTarea?.push(this.actividadRealizar);
  }

  save() {
    this.blockedDocument = true;
    this.tareaDocenciaRequest.idEspeDocenteRevisor = localStorage.getItem('idEspeDocenteRevisor')!;
    this.tareaDocenciaRequest.nombreDocenteRevisor = localStorage.getItem('nombreDocenteRevisor')!;
    this.tareaDocenciaRequest.periodo = "";
    this.tareaDocenciaRequest.docentesAsignados = this.docentesAsignados;
    this.tareaDocenciaService.gestionarInformacion(this.tareaDocenciaRequest)
    .subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Datos Subidos con éxito'
        });
        setTimeout(() => {
          this.blockedDocument = false;
          this.router.navigate(["/subir-informacion-general"])
        }, 2000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message ?? ' Error ál subir los datos de la Tarea'
        });
        this.blockedDocument = false;
      },
      complete: () => {
      },
    })
  }


}
