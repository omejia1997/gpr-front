import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CargoDocente } from '../models/CargoDocente';
import { environment } from 'src/environments/environment';

//const URL="https://gpr-decem-espe.azurewebsites.net";
//const URL='http://localhost:8080';
const CARGO_DOCENTE = environment.URL_MICROSERVICE_INVESTIGACION + '/cargoDocente';

@Injectable({
  providedIn: 'root'
})
export class CargoDocenteService {

  constructor(private http: HttpClient) { }

  public obtenerCargosDocente(codigoDocente:number): Observable<CargoDocente[]>{
    return this.http.get<CargoDocente[]>(`${CARGO_DOCENTE}/listarCargoDocente/${codigoDocente}`);
  }
}


