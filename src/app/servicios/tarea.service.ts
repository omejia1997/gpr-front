import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CargoDocente } from '../models/CargoDocente';
import { DashboardProyectoInvestigacion } from '../models/Dashboard/DashboardProyectoInvestigacion';
import { Docente } from '../models/Docente';
import { Indicador } from '../models/Indicador';
import { Proyecto } from '../models/Proyecto';
import { Tarea } from '../models/Tarea';
import { TareaDocente } from '../models/TareaDocente';
import { TareaDocenteProyecto } from '../models/TareaDocenteProyecto';
import { TareaIndicador } from '../models/TareaIndicador';
import { TareasRealizadas } from '../models/TareasRealizadas';
import { environment } from 'src/environments/environment';

//const URL='http://localhost:8080';
//const URL="https://gpr-decem-espe.azurewebsites.net"
const TAREA_DOCENTE = environment.URL_MICROSERVICE_INVESTIGACION  + '/tareaDocente';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private tareas$$ = new BehaviorSubject<TareaDocenteProyecto | null>(null);
  tareas$ = this.tareas$$.asObservable();

  private tareaDocente$$ = new BehaviorSubject<TareaDocente | null>(null);
  tareaDocente$ = this.tareaDocente$$.asObservable();

  private proyecto$$ = new BehaviorSubject<Proyecto | null>(null);
  proyecto$ = this.proyecto$$.asObservable();

  private dashboardProyectoInvestigacion$$ = new BehaviorSubject<DashboardProyectoInvestigacion | null>(null);
  dashboardProyectoInvestigacion$ = this.dashboardProyectoInvestigacion$$.asObservable();

  private proyectoModel$$ = new BehaviorSubject<Proyecto | null>(null);
  proyectoModel$ = this.proyectoModel$$.asObservable();

  private tarea$$ = new BehaviorSubject<Tarea | null>(null);
  tarea$ = this.tarea$$.asObservable();

  private tareasDocente$$ = new BehaviorSubject<any[]  |undefined>(undefined);
  tareasDocente$ = this.tareasDocente$$.asObservable();

  constructor(private http: HttpClient) { }

  public obtenerTareas(idDocente:string): Observable<TareaDocenteProyecto[]>{
    return this.http.get<TareaDocenteProyecto[]>(`${TAREA_DOCENTE}/listarTareas/${idDocente}`);
  }

  public obtenerTareasPorProyecto(idDocente:string,idProyecto:any): Observable<TareaDocenteProyecto[]>{
    return this.http.get<TareaDocenteProyecto[]>(`${TAREA_DOCENTE}/listarTareasPorProyecto/${idDocente}/${idProyecto}`);
  }

  public obtenerTodasTareasPorProyecto(idProyecto:any): Observable<TareaDocenteProyecto[]>{
    return this.http.get<TareaDocenteProyecto[]>(`${TAREA_DOCENTE}/listarTodasTareasPorProyecto/${idProyecto}`);
  }

  public obtenerTareasDocentePorCodigoTarea(codigoTarea:string): Observable<TareaDocente[]>{
    return this.http.get<TareaDocente[]>(`${TAREA_DOCENTE}/listarTareasDocentePorCodigoTarea/${codigoTarea}`);
  }

  public obtenerTareasEntregadas(idDocente:string): Observable<TareaDocente[]>{
    return this.http.get<TareaDocente[]>(`${TAREA_DOCENTE}/listarTareasEntregadas/${idDocente}`);
  }

  public obtenerTareasPorDocente(codigoDocente:number): Observable<TareaDocente[]>{
    return this.http.get<TareaDocente[]>(`${TAREA_DOCENTE}/listarTareaAsignadaPorDocente/${codigoDocente}`);
  }

  public obtenerIndicadoresTarea(codigoTareaDocente:number): Observable<TareaIndicador[]>{
    return this.http.get<TareaIndicador[]>(`${TAREA_DOCENTE}/listarIndicadoresPorTarea/${codigoTareaDocente}`);
  }

  public obtenerTareasAsignadasDocentes(codigoTareaDocente:any):Observable<TareaDocente[]>{
    return this.http.get<TareaDocente[]>(`${TAREA_DOCENTE}/listarDocentesTareasAsignadas/${codigoTareaDocente}`);
  }

  public obtenerTodasTareasRevisar():Observable<TareasRealizadas[]>{
    return this.http.get<TareasRealizadas[]>(`${TAREA_DOCENTE}/listarTodasTareasRevisadas`);
  }

  public obtenerDatosProyectoDashboardInvestigacion(idTipoProceso:number): Observable<DashboardProyectoInvestigacion[]>{
    return this.http.get<DashboardProyectoInvestigacion[]>(`${TAREA_DOCENTE}/obtenerDatosProyectoDashboardInvestigacion/${idTipoProceso}`);
  }

  public crearProyectoProgramado(proyecto:Proyecto,idProyectoCopiar:number){
    return this.http.post<any>(`${TAREA_DOCENTE}/crearTareasFromProyecto/${idProyectoCopiar}`,proyecto);
  }

  public crearTarea(tarea:TareaDocenteProyecto,checkTipoActividad:Boolean){
    if(!checkTipoActividad)
      return this.http.post<any>(`${TAREA_DOCENTE}/crearTarea`,tarea);
    else
      return this.http.post<any>(`${TAREA_DOCENTE}/crearTareaProgramada`,tarea);
  }

  public crearTareaConArchivo(tarea:TareaDocenteProyecto,file:File,checkTipoActividad:Boolean){
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

  public setTareaDocente(tarea: TareaDocente) {
    this.tareaDocente$$.next(tarea);
  }

  public setProyecto(proyecto: Proyecto) {
    this.proyecto$$.next(proyecto);
  }

  public setProyectoModel(proyecto: Proyecto) {
    this.proyectoModel$$.next(proyecto);
  }

  public setTareaModel(tarea: Tarea) {
    this.tarea$$.next(tarea);
  }

  public setTareasDocenteModel(tareaDocente: any[]) {
    this.tareasDocente$$.next(tareaDocente);
  }

  public setDashboardProyectoInvestigacion(dashboardProyectoInvestigacion: DashboardProyectoInvestigacion) {
    this.dashboardProyectoInvestigacion$$.next(dashboardProyectoInvestigacion);
  }

  public obtenerProyectoPorId(idProyecto:number){
    return this.http.get<Proyecto>(`${TAREA_DOCENTE}/${idProyecto}`);
  }

  public obtenerDocentes(): Observable<Docente[]>{
    return this.http.get<Docente[]>(`${TAREA_DOCENTE}/listarDocentes`);
  }

  public listarDocentesTareasAsignadas(): Observable<Docente[]>{
    return this.http.get<Docente[]>(`${TAREA_DOCENTE}/listarDocentesTareasAsignadas`);
  }

  public obtenerCargoDocentePorCodDocente(codDocente:any ): Observable<CargoDocente[]>{
    return this.http.get<CargoDocente[]>(`${TAREA_DOCENTE}/listarCargoDocentePorCodDocente/${codDocente}`);
  }

  public obtenerDocentesLikeNombreCargo(likeNombreCargo:any,codigoDocente:any): Observable<Docente[]>{
    return this.http.get<Docente[]>(`${TAREA_DOCENTE}/listarDocentesLikeNombreCargo/${likeNombreCargo}/${codigoDocente}`);
  }

  public obtenerDocentesPorCargo(idCargo:any,codigoDocente:any): Observable<Docente[]>{
    return this.http.get<Docente[]>(`${TAREA_DOCENTE}/listarDocentesPorCargo/${idCargo}/${codigoDocente}`);
  }


  public obtenerTodosDocentesPorCargo(idCargo:any): Observable<Docente[]>{
    return this.http.get<Docente[]>(`${TAREA_DOCENTE}/listarTodosDocentesPorCargo/${idCargo}`);
  }

  public obtenerTodosDocentesPorNombreCargo(nombreCargo:any): Observable<Docente[]>{
    return this.http.get<Docente[]>(`${TAREA_DOCENTE}/listarTodosDocentesPorNombreCargo/${nombreCargo}`);
  }

  public obtenerIndicadores(): Observable<Indicador[]>{
    return this.http.get<Indicador[]>(`${TAREA_DOCENTE}/listarIndicadores`);
  }

  public editarTarea(tareaDocente:TareaDocenteProyecto){
    return this.http.put<Proyecto>(`${TAREA_DOCENTE}/modificar`, tareaDocente);
  }

  public editarTareaConArchivo(tareaDocente:TareaDocenteProyecto,file:File){
    const formData: FormData = new FormData();
    formData.append("tareaDocenteProyecto",JSON.stringify(tareaDocente));
    formData.append('file', file);
    return this.http.put<any>(`${TAREA_DOCENTE}/editarTareaConArchivo`,formData);
  }

  public guardarTareaAsignadaAlDocente(tareaIndicadors:TareaIndicador[],codigoTareaDocente:any){
    const formData: FormData = new FormData();
    formData.append('tareaIndicadors', JSON.stringify(tareaIndicadors));
    formData.append('codigoTareaDocente', codigoTareaDocente);
    return this.http.put<String>(`${TAREA_DOCENTE}/guardarTareaAsignadaAlProfesor`,formData);
  }

  public guardarArchivoTareaAsignadaAlDocente(file:File,tareaIndicadors:TareaIndicador[],codigoTareaDocente:any){
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('tareaIndicadors', JSON.stringify(tareaIndicadors));
    formData.append('codigoTareaDocente', codigoTareaDocente);
    return this.http.put<any>(`${TAREA_DOCENTE}/guardarArchivoTareaAsignadaAlProfesor`,formData);
    /*console.log(formData);
    const req = new HttpRequest('PUT', `${TAREA_DOCENTE}/guardarArchivoTareaAsignadaAlProfesor`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);*/

    //return this.http.put<Proyecto>(`${TAREA_DOCENTE}/guardarTareaAsignadaAlProfesor`,tareaIndicadors);
  }

  public aprobarTareaDocente(tareaDocente:TareaDocente){
    return this.http.put<String>(`${TAREA_DOCENTE}/aprobarTareaDocente`,tareaDocente);
  }

  public denegarTareaDocente(tareaDocente:TareaDocente){
    return this.http.put<String>(`${TAREA_DOCENTE}/denegarTareaDocente`,tareaDocente);
  }

  /*
  public cambiarEstadoProyecto(codigoProyecto:any){
    return this.http.put<Proyecto>(`${PROYECTO}/cambiarEstado/${codigoProyecto}`,codigoProyecto);
  }
  */
  public eliminarTarea(codigoTarea:any){
    console.log("enrro")
    console.log(codigoTarea);
    return this.http.delete<Boolean>(`${TAREA_DOCENTE}/eliminarTarea/${codigoTarea}`);
  }

  public getFileModel(modulo:string,codigoTareaDocente:number){
    return this.http.get(`${TAREA_DOCENTE}/obtenerArchivoTareaDocente/${codigoTareaDocente}`);
  }

  public getFileGuia(modulo:string,codigoTarea:any){
    return this.http.get(`${TAREA_DOCENTE}/obtenerArchivoTarea/${codigoTarea}`);
  }

}
