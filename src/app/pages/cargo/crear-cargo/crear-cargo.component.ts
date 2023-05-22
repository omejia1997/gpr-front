import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cargo } from 'src/app/models/Cargo';
import { Perfil } from 'src/app/models/Perfil';
import { CargoService } from 'src/app/servicios/cargo.service';
import { UsuarioperfilService } from 'src/app/servicios/usuarioperfil.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-cargo',
  templateUrl: './crear-cargo.html',
  styleUrls: ['./crear-cargo.component.css']
})
export class CrearCargoComponent implements OnInit {
  blockedDocument: boolean = false;
  cargo: Cargo = {};
  //getCargos$: Observable<Cargo[]>;
  cargos: Cargo[] = [];
  perfil: Perfil = {};
  getPerfiles$: Observable<Perfil[]>;
  perfiles: Perfil[] = [];

  constructor(
    private router: Router,
    private perfilesService: UsuarioperfilService,
    private cargoService: CargoService,
    private messageService: MessageService
  ) {
    //this.getCargos$ = this.cargoService.obtenerCargosModel();
    this.getPerfiles$ = this.perfilesService.obtenerPerfiles();
  }

  ngOnInit(): void {
    //this.getCargos();
    this.getPerfiles();
  }

  getCargos() {
    /*this.getCargos$.subscribe(cargo =>{
      this.cargos = cargo;
    });*/
  }

  getPerfiles() {
    this.getPerfiles$.subscribe(perfiles => {
      this.perfiles = perfiles;
      console.log(this.perfiles);
    });
  }

  save() {
    this.blockedDocument = true;
    this.cargoService.crearCargo(this.cargo)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'El cargo ha sido creado con éxito'
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
            detail: err?.message ?? ' Error al crear el cargo'
          });
          this.blockedDocument = false;
        },
        complete: () => {
          // this.isLoading = false;
        },
      })
  }

  regresar() {
    this.router.navigate(["listar-cargos"])
  }
}
