import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DocenteInformacion } from '../../../modelos/DocenteInformacion';
import { Discapacidad } from '../../../modelos/Discapacidad';

@Component({
  selector: 'app-subir-informacion-general',
  templateUrl: './subir-informacion-general.component.html',
  styleUrls: ['./subir-informacion-general.component.css']
})
export class SubirInformacionGeneralComponent implements OnInit {

  blockedDocument: boolean = false;
  docente:DocenteInformacion={};
  discapacidad: Discapacidad={};

  constructor(private router:Router,private messageService: MessageService) { }

  ngOnInit() {
  }

  regresar() {
    this.router.navigate(["listar-proyectos"])
  }

  save(){
    // this.blockedDocument = true;
    // this.proyecto.tipoProceso = this.tipoProceso;
    // this.proyectoService.crearProyecto(this.proyecto)
    // .subscribe({
    //   next: (data) => {
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Éxito',
    //       detail: 'El proyecto ha sido creado con éxito'
    //     });
    //     setTimeout(() => {
    //       this.blockedDocument = false;
    //       this.router.navigate(["listar-proyectos"])
    //     }, 2000);
    //   },
    //   error: (err) => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: err?.message ?? ' Error al crear el proyecto'
    //     });
    //     this.blockedDocument = false;
    //   },
    //   complete: () => {
    //     // this.isLoading = false;
    //   },
    // })
  }

}
