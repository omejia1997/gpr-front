import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TareaDocencia } from '../modelos/TareaDocencia';
import { TareaDocenteDocenciaDTO } from '../modelos/dto/TareaDocenteDocenciaDTO';
import { Periodo } from 'src/app/models/Periodo';


const TAREA_DOCENCIA = environment.URL_MICROSERVICE_DOCENTE_TAREAS + '/tareaDocencia';

@Injectable({
  providedIn: 'root',
})
export class TareaDocenciaService {
  private tarea$$ = new BehaviorSubject<TareaDocencia | null>(null);
  tarea$ = this.tarea$$.asObservable();

  private periodo$$ = new BehaviorSubject<Periodo | null>(null);
  periodo$ = this.periodo$$.asObservable();

  constructor(private http: HttpClient) {}

  public listarTodasTareasPorDocente(idEspeDocente:any): Observable<TareaDocencia[]>{
    return this.http.get<TareaDocencia[]>(`${TAREA_DOCENCIA}/listarTodasTareasPorDocente/${idEspeDocente}`);
  }

  public setTarea(tarea: TareaDocencia) {
    this.tarea$$.next(tarea);
  }

  public setPeriodo(periodo: Periodo) {
    this.periodo$$.next(periodo);
  }

  public gestionarInformacion(tarea : TareaDocencia) {
    return this.http.post<any>(TAREA_DOCENCIA, tarea);
  }

  public actualizarTarea(tarea : TareaDocencia) {
    return this.http.put<any>(TAREA_DOCENCIA, tarea);
  }

  public obtenerTareasPorDocente(codigoDocente:number): Observable<TareaDocenteDocenciaDTO[]>{
    return this.http.get<TareaDocenteDocenciaDTO[]>(`${TAREA_DOCENCIA}/listarTareaAsignadaPorDocente/${codigoDocente}`);
  }

}
