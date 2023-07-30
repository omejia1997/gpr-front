import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Periodo } from '../models/Periodo';

const PERIODO = environment.URL_MICROSERVICE_INVESTIGACION  + '/periodo';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  private periodo$$ = new BehaviorSubject<Periodo | null>(null);
  periodo$ = this.periodo$$.asObservable();

  constructor(private http: HttpClient) { }

  public obtenerTodosLosPeriodos(): Observable<Periodo[]>{
    return this.http.get<Periodo[]>(`${PERIODO}/listarTodosLosPeriodos`);
  }

  public listarPeriodosActivos(): Observable<Periodo[]>{
    return this.http.get<Periodo[]>(`${PERIODO}/listarPeriodosActivos`);
  }

  public crearPeriodo(periodo:Periodo){
    return this.http.post<Periodo>(PERIODO,periodo);
  }

  public setPeriodo(periodo:Periodo) {
    this.periodo$$.next(periodo);
  }

  public editarPeriodo(periodo:Periodo){
    return this.http.put<Periodo>(`${PERIODO}/modificar`, periodo);
  }

  public cambiarEstadoPeriodo(codigoPeriodo:any){
    return this.http.put<Periodo>(`${PERIODO}/cambiarEstado/${codigoPeriodo}`,codigoPeriodo);
  }

}
