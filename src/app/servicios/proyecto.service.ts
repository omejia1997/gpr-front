import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/Proyecto';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


//const URL="https://gpr-decem-espe.azurewebsites.net"
//const URL='http://localhost:8080';
const PROYECTO = environment.URL_MICROSERVICE_INVESTIGACION  + '/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private proyecto$$ = new BehaviorSubject<Proyecto | null>(null);
  proyecto$ = this.proyecto$$.asObservable();

  constructor(private http: HttpClient) { }

  public obtenerProyectos(): Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(`${PROYECTO}/listarProyectos`);
  }

  public obtenerProyectosPorTipoProceso(idProceso:number): Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(`${PROYECTO}/listarProyectosPorProceso/${idProceso}`);
  }

  public listarProyectosActivos(): Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(`${PROYECTO}/listarProyectosActivos`);
  }

  public crearProyecto(proyecto:Proyecto){
    return this.http.post<Proyecto>(PROYECTO,proyecto);
  }

  public setProyecto(proyecto: Proyecto) {
    this.proyecto$$.next(proyecto);
  }

  public obtenerProyectoPorId(idProyecto:number){
    return this.http.get<Proyecto>(`${PROYECTO}/${idProyecto}`);
  }

  public editarProyecto(proyecto:Proyecto){
    return this.http.put<Proyecto>(`${PROYECTO}/modificar`, proyecto);
  }

  public cambiarEstadoProyecto(codigoProyecto:any){
    return this.http.put<Proyecto>(`${PROYECTO}/cambiarEstado/${codigoProyecto}`,codigoProyecto);
  }

}
