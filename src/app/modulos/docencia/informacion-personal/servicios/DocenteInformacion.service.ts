import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocenteInformacion } from '../modelos/DocenteInformacion';
import { ImagenUser } from '../modelos/ImagenUser';

const DOCENTE = environment.URL_MICROSERVICE_DOCENTE_INFORMACION + '/docente';

@Injectable({
  providedIn: 'root',
})
export class DocenteInformacionService {
  private docenteInformacion$$ = new BehaviorSubject<DocenteInformacion | null>(null);
  docenteInformacion$ = this.docenteInformacion$$.asObservable();

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

  public loadProvinciasEcuador(): Observable<any> {
    return this.http.get<any>('/assets/json/provinciasEcuador.json');
  }

  public loadIdiomas(): Observable<any> {
    return this.http.get<any>('/assets/json/idiomas.json');
  }

  public obtenerDocentePorIdEspe(idEspe:any): Observable<DocenteInformacion>{
    return this.http.get<DocenteInformacion>(`${DOCENTE}/obtenerDocentePorIdEspe/${idEspe}`);
  }

  public obtenerImagenUser(fileName:any): Observable<ImagenUser>{
    return this.http.get<ImagenUser>(`${DOCENTE}/obtenerImagenBase64/${fileName}`);
  }


  public listarTodosDocentes(): Observable<DocenteInformacion[]>{
    return this.http.get<DocenteInformacion[]>(`${DOCENTE}/listarTodosDocentes`);
  }

  public setDocente(docente: DocenteInformacion) {
    this.docenteInformacion$$.next(docente);
  }

  public guardarInformacion(docenteInformacion: DocenteInformacion,imagenSeleccionada:File) {
    const formData: FormData = new FormData();
    formData.append("docente",JSON.stringify(docenteInformacion));
    formData.append('file', imagenSeleccionada);
    if(docenteInformacion.id)
      return this.http.put<any>(DOCENTE, formData);
    else
      return this.http.post<any>(DOCENTE, formData);
  }
}
