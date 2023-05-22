import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/Proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { Observable } from 'rxjs';
import { Cargo } from 'src/app/models/Cargo';
import { CargoService } from 'src/app/servicios/cargo.service';

@Component({
  selector: 'app-listar-cargo',
  templateUrl: './listar-cargo.html'
})
export class ListarCargoComponent implements OnInit {

  getCargos$: Observable<Cargo[]>;
  cargos: Cargo[]= [];
  
  constructor(
    private cargoService: CargoService,
    private router: Router,
  ) {
    this.getCargos$ = this.cargoService.obtenerCargosModel();
  }

  ngOnInit(): void {
   // this.getDataAccount();
   this.getCargos();
  }

  getCargos() {
    this.getCargos$.subscribe(cargos =>{
      this.cargos = cargos;  
    });
  }

  navegarCrearCargo(){
    this.router.navigate(['crear-cargo']);
  }

  editar(cargo:Cargo){
    this.cargoService.serCargo(cargo);
    this.router.navigate(['editar-cargo']);
  }
}
