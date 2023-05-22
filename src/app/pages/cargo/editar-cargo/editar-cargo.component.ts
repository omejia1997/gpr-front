import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cargo } from 'src/app/models/Cargo';
import { Perfil } from 'src/app/models/Perfil';
import { CargoService } from 'src/app/servicios/cargo.service';
import { UsuarioperfilService } from 'src/app/servicios/usuarioperfil.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-editar-cargo',
  templateUrl: './editar-cargo.html',
  styleUrls:['./editar-cargo.component.css']
})
export class EditarCargoComponent implements OnInit {
  blockedDocument: boolean = false;
  visualBlockedDocument: boolean = true;
  cargo: any = {};
  //getCargos$: Observable<Cargo[]>;
  cargos: Cargo[]=[];
  perfil:Perfil= {};
  getPerfiles$: Observable<Perfil[]>;
  perfiles: Perfil[]=[];
  
  constructor(
    private router:Router,
    private perfilesService:UsuarioperfilService,
    private cargoService: CargoService,
    private messageService: MessageService
    ) {
      this.cargoService.cargo$.subscribe((res) => {
        this.cargo = res;
        if (this.cargo == null) {
          this.visualBlockedDocument = false;
          this.back();
        }
      });
      //this.getCargos$ = this.cargoService.obtenerCargosModel();
      this.getPerfiles$ = this.perfilesService.obtenerPerfiles();
  }

  ngOnInit(): void {
    //this.getCargos();
    this.getPerfiles();
  }

  back() {
    this.router.navigate(['listar-cargos']);
  }

  getCargos(){
    /*this.getCargos$.subscribe(cargo =>{
      this.cargos = cargo;
    });*/
  }

  getPerfiles(){
    this.getPerfiles$.subscribe(perfiles =>{
      this.perfiles = perfiles;
      console.log(this.perfiles);
    });
  }

  regresar() {
    this.router.navigate(["listar-cargos"])
  }

  save(){ 
    this.blockedDocument = true;
    this.cargoService.actualizarCargo(this.cargo)
    .subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Los datos del cargo han sido modificados con éxito'
        });
        setTimeout(() => {
          this.blockedDocument = false; 
          this.router.navigate(["listar-cargos"])
        }, 2000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message ?? ' Error al editar los datos del cargo'
        });
        this.blockedDocument = false; 
      },
      complete: () => {
        // this.isLoading = false;
      },
    })
  }

}
