import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProyectoVinculacion } from '../modelos/ProyectoVinculacion';
import { environment } from 'src/environments/environment';


//const URL="https://gpr-decem-espe.azurewebsites.net"
//const URL='http://localhost:8088';
const PROYECTO = environment.URL_MICROSERVICE_VINCULACION + '/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoVinculacionService {

  private proyecto$$ = new BehaviorSubject<ProyectoVinculacion | null>(null);
  proyecto$ = this.proyecto$$.asObservable();

  constructor(private http: HttpClient) { }

  public obtenerProyectosVinculacion(): Observable<ProyectoVinculacion[]>{
    return this.http.get<ProyectoVinculacion[]>(`${PROYECTO}/listarProyectosVinculacion`);
  }

  // public obtenerProyectosPorTipoProceso(idProceso:number): Observable<ProyectoVinculacion[]>{
  //   return this.http.get<ProyectoVinculacion[]>(`${PROYECTO}/listarProyectosPorProceso/${idProceso}`);
  // }

  public listarProyectosActivos(): Observable<ProyectoVinculacion[]>{
    return this.http.get<ProyectoVinculacion[]>(`${PROYECTO}/listarProyectosActivos`);
  }

  public crearProyectoVinculacion(proyecto:ProyectoVinculacion){
    return this.http.post<ProyectoVinculacion>(PROYECTO,proyecto);
  }

  public setProyecto(proyecto: ProyectoVinculacion) {
    this.proyecto$$.next(proyecto);
  }

  public obtenerProyectoPorId(idProyecto:number){
    return this.http.get<ProyectoVinculacion>(`${PROYECTO}/${idProyecto}`);
  }

  public editarProyectoVinculacion(proyecto:ProyectoVinculacion){
    return this.http.put<ProyectoVinculacion>(`${PROYECTO}/modificar`, proyecto);
  }

  // public cambiarEstadoProyecto(codigoProyecto:any){
  //   return this.http.put<ProyectoVinculacion>(`${PROYECTO}/cambiarEstado/${codigoProyecto}`,codigoProyecto);
  // }

}
