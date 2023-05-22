import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoProceso } from '../models/TipoProceso';
import { BehaviorSubject, Observable } from 'rxjs';


//const URL="https://gpr-mec-espe.azurewebsites.net"
const URL='http://localhost:8080';
const TIPO_PROCESO = URL + '/tipoProceso';

@Injectable({
  providedIn: 'root'
})
export class TipoProcesoService {

  private tipoProceso$$ = new BehaviorSubject<TipoProceso | null>(null);
  tipoProceso$ = this.tipoProceso$$.asObservable();

  constructor(private http: HttpClient) { }

  public obtenerTipoProcesos(): Observable<TipoProceso[]>{
    return this.http.get<TipoProceso[]>(`${TIPO_PROCESO}/listarTiposProcesos`); 
  }

  public obtenerTipoProcesosActivos(): Observable<TipoProceso[]>{
    return this.http.get<TipoProceso[]>(`${TIPO_PROCESO}/listarTiposProcesosActivos`); 
  }

  public crear<TipoProceso>(tipoProceso:TipoProceso){
    return this.http.post<TipoProceso>(TIPO_PROCESO,tipoProceso); 
  }

  public setTipoProceso(tipoProceso: TipoProceso) {
    this.tipoProceso$$.next(tipoProceso);
  }

  public editarTipoProceso(tipoProceso:TipoProceso){
    return this.http.put<TipoProceso>(`${TIPO_PROCESO}/modificar`, tipoProceso);
  }

  public cambiarEstadoProceso(codigoTipoProceso:any){
    return this.http.put<TipoProceso>(`${TIPO_PROCESO}/cambiarEstado/${codigoTipoProceso}`, codigoTipoProceso);
  }

}
