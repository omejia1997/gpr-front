import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocenteInformacion } from '../modelos/DocenteInformacion';

const DOCENTE = environment.URL_MICROSERVICE_DOCENTE_INFORMACION + '/docente';

@Injectable({
  providedIn: 'root',
})
export class DocenteInformacionService {

  constructor(private http: HttpClient) {}

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

  public loadIdiomas(): Observable<any> {
    return this.http.get<any>('/assets/json/idiomas.json');
  }

  public obtenerDocentePorIdEspe(idEspe:any): Observable<DocenteInformacion>{
    return this.http.get<DocenteInformacion>(`${DOCENTE}/obtenerDocentePorIdEspe/${idEspe}`);
  }

  public listarTodosDocentes(): Observable<DocenteInformacion[]>{
    return this.http.get<DocenteInformacion[]>(`${DOCENTE}/listarTodosDocentes`);
  }


  public guardarInformacion(docenteInformacion: DocenteInformacion) {
    if(docenteInformacion.id)
      return this.http.put<any>(DOCENTE, docenteInformacion);
    else
      return this.http.post<any>(DOCENTE, docenteInformacion);
  }
}
