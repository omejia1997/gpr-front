import { Component, OnInit } from '@angular/core';
import { Docente } from 'src/app/models/Docente';
import { TareaService } from 'src/app/servicios/tarea.service';
import { TareaDocenciaService } from '../../../servicios/TareaDocenciaService';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { TareaDocenciaDTO } from '../../../modelos/dto/TareaDocenciaDTO';
import { Cargo } from 'src/app/models/Cargo';
import { Observable } from 'rxjs';
import { CargoService } from 'src/app/servicios/cargo.service';

const cargos: string[] = ['Manufactura y Producción',
'Mecatrónica',
'Materiales y Mecánica de Sólidos',
'Energía y Termofluidos',
'Diseño y Mecánica Computacional'];

@Component({
  selector: 'app-gestionar-tarea-docente',
  templateUrl: './gestionar-tarea-docente.component.html',
  styleUrls: ['./gestionar-tarea-docente.component.css']
})

export class GestionarTareaDocenteComponent implements OnInit {
  getCargos$: Observable<Cargo[]>;
  cargos: Cargo[] = [];
  cargo: any={};
  blockedDocument: boolean = false;
  tareaDocenciaRequest: TareaDocenciaDTO={};
  actividadRealizar!: string;
  cargoSeleccionado!: string;
  docentes: Docente[] = [];
  docentesAsignados: Docente[] = [];
  codDocente: any;


  constructor(
    private router: Router,
    private tareaServiceGpr: TareaService,
    private tareaDocenciaService: TareaDocenciaService,
    private messageService: MessageService,
    private cargoService: CargoService
    ) {
      this.codDocente = localStorage.getItem('codigoDocente');
      this.getCargos$ = this.cargoService.obtenerCargosModel();
      this.tareaDocenciaRequest.observacionTarea=[];
  }

  ngOnInit() {
    this.getCargos();
  }

  getCargos() {
    this.getCargos$.subscribe((cargos) => {
      this.cargos = cargos;
    });
  }

  back(){
    this.router.navigate(['listar-tarea-docente']);
  }

  buscarDocentesPorCargo() {
    if(this.cargo=='Coordinador'){
      this.blockedDocument = true;
      this.tareaServiceGpr.obtenerDocentesLikeNombreCargo(this.cargo,
        this.codDocente).subscribe({
          next: (docentes) => {
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
          this.blockedDocument = false;
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err?.message ?? ' Error al cargar los datos'
            });
            this.blockedDocument = false;
          },
          complete: () => {
          },
        });

    }else{
      this.blockedDocument = true;
      this.tareaServiceGpr.obtenerDocentesPorCargo(this.cargo.codCargo,
        this.codDocente).subscribe({
          next: (docentes) => {
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
          this.blockedDocument = false;
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err?.message ?? ' Error al cargar los datos'
            });
            this.blockedDocument = false;
          },
          complete: () => {
          },
        });
    }
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
          this.router.navigate(['listar-tarea-docente']);
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
