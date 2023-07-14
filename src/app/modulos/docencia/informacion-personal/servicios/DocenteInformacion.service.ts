import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocenteInformacion } from '../modelos/DocenteInformacion';

const PROYECTO = environment.URL_MICROSERVICE_DOCENTE_INFORMACION + '/docente';

@Injectable({
  providedIn: 'root',
})
export class DocenteInformacionService {
  // private docente$$ = new BehaviorSubject<DocenteInformacion | null>(null);
  // proyecto$ = this.proyecto$$.asObservable();

  constructor(private http: HttpClient) {}

  public guardarInformacion(docenteInformacion: DocenteInformacion) {
    return this.http.post<any>(PROYECTO, docenteInformacion);
  }

  public loadNacionalidades(): Observable<any> {
    return this.http.get<any>('/assets/json/nacionalidades.json');
  }

  public getTerritorioEcuatoriano(): Observable<any> {
    return this.http.get<any>('/assets/json/provincias.json');
  }

  public loadGruposEtnicos(): Observable<any> {
    return this.http.get<any>('/assets/json/gruposEtnicos.json');
  }

  public loadPaises(): Observable<any> {
    return this.http.get<any>('/assets/json/paises.json');
  }

  // public obtenerProyectosVinculacion(): Observable<ProyectoVinculacion[]>{
  //   return this.http.get<ProyectoVinculacion[]>(`${PROYECTO}/listarProyectosVinculacion`);
  // }

  // // public obtenerProyectosPorTipoProceso(idProceso:number): Observable<ProyectoVinculacion[]>{
  // //   return this.http.get<ProyectoVinculacion[]>(`${PROYECTO}/listarProyectosPorProceso/${idProceso}`);
  // // }

  // public listarProyectosActivos(): Observable<ProyectoVinculacion[]>{
  //   return this.http.get<ProyectoVinculacion[]>(`${PROYECTO}/listarProyectosActivos`);
  // }

  // public crearProyectoVinculacion(proyecto:ProyectoVinculacion){
  //   return this.http.post<ProyectoVinculacion>(PROYECTO,proyecto);
  // }

  // public setProyecto(proyecto: ProyectoVinculacion) {
  //   this.proyecto$$.next(proyecto);
  // }

  // public obtenerProyectoPorId(idProyecto:number){
  //   return this.http.get<ProyectoVinculacion>(`${PROYECTO}/${idProyecto}`);
  // }

  // public editarProyectoVinculacion(proyecto:ProyectoVinculacion){
  //   return this.http.put<ProyectoVinculacion>(`${PROYECTO}/modificar`, proyecto);
  // }
}
