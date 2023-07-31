import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TareaDocenteProyecto } from 'src/app/models/TareaDocenteProyecto';
import { ProyectoVinculacion } from '../modelos/ProyectoVinculacion';
import { TareaDocenteProyectoVinculacion } from '../modelos/TareaDocenteProyectoVinculacion';
import { TareaDocenteVinculacion } from '../modelos/TareaDocenteVinculacion';
import { TareaIndicador } from 'src/app/models/TareaIndicador';
import { TareaVinculacion } from '../modelos/TareaVinculacion';
import { TareasRealizadas } from 'src/app/models/TareasRealizadas';
import { DashboardProyectoInvestigacion } from 'src/app/models/Dashboard/DashboardProyectoInvestigacion';
import { DashboardProyectoVinculacion } from '../modelos/Dashboard/DashboardProyectoVinculacion';
import { environment } from 'src/environments/environment';

//const URL='http://localhost:8088';
//const URL="https://gpr-decem-espe.azurewebsites.net"
const TAREA_DOCENTE = environment.URL_MICROSERVICE_VINCULACION + '/tareaDocente';

@Injectable({
  providedIn: 'root'
})
export class TareaVinculacionService {

  private tareas$$ = new BehaviorSubject<TareaDocenteProyecto | null>(null);
  tareas$ = this.tareas$$.asObservable();

  private tareaDocente$$ = new BehaviorSubject<TareaDocenteVinculacion | null>(null);
  tareaDocente$ = this.tareaDocente$$.asObservable();

  // private proyecto$$ = new BehaviorSubject<Proyecto | null>(null);
  // proyecto$ = this.proyecto$$.asObservable();

  private dashboardProyectoVinculacion$$ = new BehaviorSubject<DashboardProyectoInvestigacion | null>(null);
  dashboardProyectoVinculacion$ = this.dashboardProyectoVinculacion$$.asObservable();

  private proyectoModel$$ = new BehaviorSubject<ProyectoVinculacion | null>(null);
  proyectoModel$ = this.proyectoModel$$.asObservable();

  private tarea$$ = new BehaviorSubject<TareaVinculacion | null>(null);
  tarea$ = this.tarea$$.asObservable();

  // private tareasDocente$$ = new BehaviorSubject<any[]  |undefined>(undefined);
  // tareasDocente$ = this.tareasDocente$$.asObservable();

  constructor(private http: HttpClient) { }

  // public obtenerTareas(idDocente:string): Observable<TareaDocenteProyecto[]>{
  //   return this.http.get<TareaDocenteProyecto[]>(`${TAREA_DOCENTE}/listarTareas/${idDocente}`);
  // }

  // public obtenerTareasPorProyecto(idDocente:string,idProyecto:any): Observable<TareaDocenteProyecto[]>{
  //   return this.http.get<TareaDocenteProyecto[]>(`${TAREA_DOCENTE}/listarTareasPorProyecto/${idDocente}/${idProyecto}`);
  // }

  public obtenerTodasTareasPorProyecto(idProyecto:any): Observable<TareaDocenteProyectoVinculacion[]>{
    return this.http.get<TareaDocenteProyectoVinculacion[]>(`${TAREA_DOCENTE}/listarTodasTareasPorProyecto/${idProyecto}`);
  }

  public obtenerTareasDocentePorCodigoTarea(idTarea:string): Observable<TareaDocenteVinculacion[]>{
    return this.http.get<TareaDocenteVinculacion[]>(`${TAREA_DOCENTE}/listarTareasDocentePorCodigoTarea/${idTarea}`);
  }

  public obtenerTareasEntregadas(idDocente:string): Observable<TareaDocenteVinculacion[]>{
    return this.http.get<TareaDocenteVinculacion[]>(`${TAREA_DOCENTE}/listarTareasEntregadas/${idDocente}`);
  }

  public obtenerTareasPorDocente(codigoDocente:number): Observable<TareaDocenteVinculacion[]>{
    return this.http.get<TareaDocenteVinculacion[]>(`${TAREA_DOCENTE}/listarTareaAsignadaPorDocente/${codigoDocente}`);
  }

  // public obtenerIndicadoresTarea(codigoTareaDocente:number): Observable<TareaIndicador[]>{
  //   return this.http.get<TareaIndicador[]>(`${TAREA_DOCENTE}/listarIndicadoresPorTarea/${codigoTareaDocente}`);
  // }

  // public obtenerTareasAsignadasDocentes(codigoTareaDocente:any):Observable<TareaDocente[]>{
  //   return this.http.get<TareaDocente[]>(`${TAREA_DOCENTE}/listarDocentesTareasAsignadas/${codigoTareaDocente}`);
  // }

  public obtenerTodasTareasRevisar():Observable<TareasRealizadas[]>{
    return this.http.get<TareasRealizadas[]>(`${TAREA_DOCENTE}/listarTodasTareasRevisadas`);
  }

  public obtenerDatosProyectoDashboardVinculacion(): Observable<DashboardProyectoVinculacion[]>{
    return this.http.get<DashboardProyectoVinculacion[]>(`${TAREA_DOCENTE}/obtenerDatosProyectoDashboardVinculacion`);
  }

  // public crearProyectoProgramado(proyecto:Proyecto,idProyectoCopiar:number){
  //   return this.http.post<any>(`${TAREA_DOCENTE}/crearTareasFromProyecto/${idProyectoCopiar}`,proyecto);
  // }

  public crearTarea(tarea:TareaDocenteProyectoVinculacion,checkTipoActividad:Boolean){
    if(!checkTipoActividad)
      return this.http.post<any>(`${TAREA_DOCENTE}/crearTarea`,tarea);
    else
      return this.http.post<any>(`${TAREA_DOCENTE}/crearTareaProgramada`,tarea);
  }

  public crearTareaConArchivo(tarea:TareaDocenteProyectoVinculacion,file:File,checkTipoActividad:Boolean){
    const formData: FormData = new FormData();
    formData.append("tareaDocenteProyecto",JSON.stringify(tarea));
    formData.append('file', file);
    if(!checkTipoActividad)
      return this.http.post<any>(`${TAREA_DOCENTE}/crearTareaConArchivo`,formData);
    else
      return this.http.post<any>(`${TAREA_DOCENTE}/crearTareaConArchivoProgramada`,formData);
  }

  public setTarea(tarea: TareaDocenteProyecto) {
    this.tareas$$.next(tarea);
  }

  public setTareaDocente(tarea: TareaDocenteVinculacion) {
    this.tareaDocente$$.next(tarea);
  }

  // public setProyecto(proyecto: Proyecto) {
  //   this.proyecto$$.next(proyecto);
  // }

  public setProyectoModel(proyecto: ProyectoVinculacion) {
    this.proyectoModel$$.next(proyecto);
  }

  public setTareaModel(tarea: TareaVinculacion) {
    this.tarea$$.next(tarea);
  }

  // public setTareasDocenteModel(tareaDocente: any[]) {
  //   this.tareasDocente$$.next(tareaDocente);
  // }

  public setDashboardProyectoVinculacion(dashboardProyectoVinculacion: DashboardProyectoVinculacion) {
    this.dashboardProyectoVinculacion$$.next(dashboardProyectoVinculacion);
  }

  // public obtenerProyectoPorId(idProyecto:number){
  //   return this.http.get<Proyecto>(`${TAREA_DOCENTE}/${idProyecto}`);
  // }

  // public obtenerDocentes(): Observable<Docente[]>{
  //   return this.http.get<Docente[]>(`${TAREA_DOCENTE}/listarDocentes`);
  // }

  // public listarDocentesTareasAsignadas(): Observable<Docente[]>{
  //   return this.http.get<Docente[]>(`${TAREA_DOCENTE}/listarDocentesTareasAsignadas`);
  // }

  // public obtenerCargoDocentePorCodDocente(codDocente:any ): Observable<CargoDocente[]>{
  //   return this.http.get<CargoDocente[]>(`${TAREA_DOCENTE}/listarCargoDocentePorCodDocente/${codDocente}`);
  // }

  // public obtenerDocentesPorCargo(idCargo:any,codigoDocente:any): Observable<Docente[]>{
  //   return this.http.get<Docente[]>(`${TAREA_DOCENTE}/listarDocentesPorCargo/${idCargo}/${codigoDocente}`);
  // }

  // public obtenerIndicadores(): Observable<Indicador[]>{
  //   return this.http.get<Indicador[]>(`${TAREA_DOCENTE}/listarIndicadores`);
  // }

  public editarTarea(tareaDocente:TareaDocenteProyectoVinculacion){
    return this.http.put<TareaDocenteVinculacion>(`${TAREA_DOCENTE}/modificar`, tareaDocente);
  }

  public editarTareaConArchivo(tareaDocente:TareaDocenteProyecto,file:File){
    const formData: FormData = new FormData();
    formData.append("tareaDocenteProyecto",JSON.stringify(tareaDocente));
    formData.append('file', file);
    return this.http.put<any>(`${TAREA_DOCENTE}/editarTareaConArchivo`,formData);
  }

  public guardarTareaAsignadaAlDocente(tareaIndicadors:TareaIndicador[],idTareaDocente:any){
    const formData: FormData = new FormData();
    formData.append('tareaIndicadors', JSON.stringify(tareaIndicadors));
    formData.append('idTareaDocente', idTareaDocente);
    return this.http.put<String>(`${TAREA_DOCENTE}/guardarTareaAsignadaAlProfesor`,formData);
  }

  public guardarArchivoTareaAsignadaAlDocente(file:File,tareaIndicadors:TareaIndicador[],idTareaDocente:any){
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('tareaIndicadors', JSON.stringify(tareaIndicadors));
    formData.append('idTareaDocente', idTareaDocente);
    return this.http.put<any>(`${TAREA_DOCENTE}/guardarArchivoTareaAsignadaAlProfesor`,formData);
  }

  public aprobarTareaDocente(tareaDocente:TareaDocenteVinculacion){
    return this.http.put<String>(`${TAREA_DOCENTE}/aprobarTareaDocente`,tareaDocente);
  }

  public denegarTareaDocente(tareaDocente:TareaDocenteVinculacion){
    return this.http.put<String>(`${TAREA_DOCENTE}/denegarTareaDocente`,tareaDocente);
  }

  // /*
  // public cambiarEstadoProyecto(codigoProyecto:any){
  //   return this.http.put<Proyecto>(`${PROYECTO}/cambiarEstado/${codigoProyecto}`,codigoProyecto);
  // }
  // */

  public eliminarTarea(codigoTarea:any){
    return this.http.delete<Boolean>(`${TAREA_DOCENTE}/eliminarTarea/${codigoTarea}`);
  }

  public getFileModel(modulo:string,codigoTareaDocente:number){
    return this.http.get(`${TAREA_DOCENTE}/obtenerArchivoTareaDocente/${codigoTareaDocente}`);
  }

  public getFileGuia(modulo:string,codigoTarea:any){
    return this.http.get(`${TAREA_DOCENTE}/obtenerArchivoTarea/${codigoTarea}`);
  }

}
