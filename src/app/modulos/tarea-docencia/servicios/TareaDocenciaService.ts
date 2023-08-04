import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Periodo } from 'src/app/models/Periodo';
import { environment } from 'src/environments/environment';
import { InformeFinal } from '../modelos/InformeFinal/InformeFinal';
import { TareaDocencia } from '../modelos/TareaDocencia';
import { TareaDocenciaDTO } from '../modelos/dto/TareaDocenciaDTO';
import { TareaDocenteDocenciaDTO } from '../modelos/dto/TareaDocenteDocenciaDTO';


const TAREA_DOCENCIA = environment.URL_MICROSERVICE_DOCENTE_TAREAS + '/tareaDocencia';

@Injectable({
  providedIn: 'root',
})
export class TareaDocenciaService {
  private tareasDocenteDocencia$$ = new BehaviorSubject<TareaDocenteDocenciaDTO[] | null>(null);
  tareasDocenteDocencia$ = this.tareasDocenteDocencia$$.asObservable();

  private tarea$$ = new BehaviorSubject<TareaDocenciaDTO | null>(null);
  tarea$ = this.tarea$$.asObservable();

  private tareaDocenteDocenciaDTO$$ = new BehaviorSubject<TareaDocenteDocenciaDTO | null>(null);
  tareaDocenteDocenciaDTO$ = this.tareaDocenteDocenciaDTO$$.asObservable();

  private periodo$$ = new BehaviorSubject<Periodo | null>(null);
  periodo$ = this.periodo$$.asObservable();

  constructor(private http: HttpClient) {}

  public listarTodasTareasPorPeriodo(codigoPeriodo:any): Observable<TareaDocenciaDTO[]>{
    return this.http.get<TareaDocenciaDTO[]>(`${TAREA_DOCENCIA}/listarTodasTareasPorPeriodo/${codigoPeriodo}`);
  }

  public listarTodasTareasAsignadasPorDocente(idEspeDocente:any): Observable<TareaDocenteDocenciaDTO[]>{
    return this.http.get<TareaDocenteDocenciaDTO[]>(`${TAREA_DOCENCIA}/listarTodasTareasAsignadasPorDocente/${idEspeDocente}`);
  }

  public listarTodasTareasSubidasPorPeriodo(codigoPeriodo:any): Observable<TareaDocenteDocenciaDTO[]>{
    return this.http.get<TareaDocenteDocenciaDTO[]>(`${TAREA_DOCENCIA}/listarTodasTareasSubidasPorPeriodo/${codigoPeriodo}`);
  }

  // public listarTodasTareasSubidasModuloDocencia(): Observable<TareaDocenteDocenciaDTO[]>{
  //   return this.http.get<TareaDocenteDocenciaDTO[]>(`${TAREA_DOCENCIA}/listarTodasTareasSubidasModuloDocencia`);
  // }

  public setTarea(tarea: TareaDocenciaDTO) {
    this.tarea$$.next(tarea);
  }

  public setTareasDocenteDocencia(tareasDocenteDocencia: TareaDocenteDocenciaDTO[]) {
    this.tareasDocenteDocencia$$.next(tareasDocenteDocencia);
  }

  public setTareDocenteDocenciaDTO(tareaDocenteDocenciaDTO: TareaDocenteDocenciaDTO) {
    this.tareaDocenteDocenciaDTO$$.next(tareaDocenteDocenciaDTO);
  }

  public setPeriodo(periodo: Periodo) {
    this.periodo$$.next(periodo);
  }

  public gestionarInformacion(tarea : TareaDocenciaDTO) {
    if(tarea.id){
      return this.http.put<any>(`${TAREA_DOCENCIA}/modificarTarea`, tarea);
    }else{
      return this.http.post<any>(TAREA_DOCENCIA, tarea);
    }
  }

  // public actualizarTarea(tarea : TareaDocencia) {
  //   return this.http.put<any>(TAREA_DOCENCIA, tarea);
  // }

  public obtenerTareasPorDocente(codigoDocente:number): Observable<TareaDocenteDocenciaDTO[]>{
    return this.http.get<TareaDocenteDocenciaDTO[]>(`${TAREA_DOCENCIA}/listarTareaAsignadaPorDocente/${codigoDocente}`);
  }

  public guardarTareaComoBorrador(idTareaDocente:any,informeFinalDTO : InformeFinal) {
    return this.http.put<any>(`${TAREA_DOCENCIA}/guardarTareaComoBorrador/${idTareaDocente}`, informeFinalDTO);
  }

  public guardarTareaParaSubir(idTareaDocente:any,informeFinalDTO : InformeFinal) {
    return this.http.put<any>(`${TAREA_DOCENCIA}/guardarTareaParaSubir/${idTareaDocente}`, informeFinalDTO);
  }

  public habilitarTareaParaEditar(idTareaDocente:any){
    return this.http.put<any>(`${TAREA_DOCENCIA}/habilitarTareaParaEditar`, idTareaDocente);
  }
}
