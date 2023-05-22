import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cargo } from '../models/Cargo';
import { CargoDocente } from '../models/CargoDocente';

//const urlH='https://gpr-mec-espe.azurewebsites.net/api/v1/';
const urlH="http://localhost:8080/api/v1/"

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private cargo$$ = new BehaviorSubject<Cargo | null>(null);
  cargo$ = this.cargo$$.asObservable();

  constructor(private http: HttpClient) { }

  
  obtenerCargos(){
     const url= urlH+'cargos';
     return this.http.get(url); 
   }

  public obtenerCargosModel(): Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${urlH}cargoModel`); 
  }

  public obtenerCargosPorPerfil(codCargo:any): Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${urlH}obtenerCargosPorCodCargo/${codCargo}`); 
  }

  public crearCargo(cargo:Cargo){
    return this.http.post<Cargo>(urlH+"cargos",cargo); 
  }

  public obtenerCargosDocente(codigoDocente:number): Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${urlH}listarCargoDocente/${codigoDocente}`); 
  }

  public serCargo(cargo:Cargo) {
    this.cargo$$.next(cargo);
  }

  public actualizarCargo(cargo:Cargo): Observable<String>{
    return this.http.put<String>(`${urlH}modificarCargo`, cargo);
  }
  

}


