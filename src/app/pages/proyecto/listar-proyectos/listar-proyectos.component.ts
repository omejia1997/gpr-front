import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/Proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-proyectos',
  templateUrl: './listar-proyectos.html'
})
export class ListarProyectosComponent implements OnInit {

  getProyectos$: Observable<Proyecto[]>;
  proyectos: Proyecto[] = [];
  descPerfil: any;  

  constructor(
    private proyectoService: ProyectoService,
    private router: Router,
  ) {
    this.getProyectos$ = this.proyectoService.obtenerProyectos();
    this.descPerfil=localStorage.getItem('descPerfil');
  }

  ngOnInit(): void {
   // this.getDataAccount();
   this.getProyectos();
  }

  /*getDataAccount() {
    this.cAccountService.obtainActivesByGroup(this.authenticationService.authenticatedUser.groupInternalId)
      .subscribe(
        res => {
          if(res.length > 0) {
            this.account = res[0];
            this.getOrders();
          }
        }
      );
  }*/

  getProyectos() {
    /*this.proyectoService.obtenerProyectos().subscribe(
      res => {
        console.log(res);
        this.proyectos = res;
      },
      err => {
        //this.messageService.add({key: 'gl', severity:'error', summary:'Error', detail:'Error al obtener los pagos pendientes'});
      }
    );*/
    this.getProyectos$.subscribe(proyectos =>{
      this.proyectos = proyectos;  
    });
  }

  navegarCrearProyecto(){
    this.router.navigate(['crear-proyectos']);
  }

  editar(proy:Proyecto){
    this.proyectoService.setProyecto(proy);
    this.router.navigate(['editar-proyecto']);
  }

  cambiarEstado(proy:Proyecto){
    this.proyectoService.cambiarEstadoProyecto(proy.codigoProyecto)
    .subscribe(data=>{
      confirm("Se cambio el estado del Proyecto:"+proy.nombreProyecto);
      this.getProyectos();
    })
  }
}
