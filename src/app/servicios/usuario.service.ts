import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DocenteComponent } from '../componentes/docente/docente.component';
import { Docente } from '../models/Docente';
import { Perfil } from '../models/Perfil';


const urlH="http://localhost:8080/api/v1/"
//const urlH="https://gpr-mec-espe.azurewebsites.net/api/v1/"

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private codigoDocente$$ = new BehaviorSubject<DocenteComponent | null>(null);
  codigoDocente$ = this.codigoDocente$$.asObservable();
  private descPerfil$$ = new BehaviorSubject<String | null>(null);
  descPerfil$ = this.codigoDocente$$.asObservable();

  constructor(private http: HttpClient) { 

  }

  obtenerUsuario(){

    const url= urlH+'usuario';
    return this.http.get(url); 
  }

  
  login(user:any,pass:any){

    const url= urlH+'login/'+user+'/'+pass;
    return this.http.get(url); 
  }

  resetearPassword(email:string){
    return this.http.put<any>(`${urlH}resetearPassword`, email);
  }

  actualizarUsuario(body:any ,id:any){
    const url2= urlH+'usuario/'+id;
    return this.http.put(url2,body); 
  }

  actualizarDocente(body:any ,id:any){
    const url2= urlH+'updatedocente/'+id;
    return this.http.put(url2,body); 
  }

  IsLoggedin(){
    return localStorage.getItem('usuario')!=null;
  }

  public obtenerDocente(codeUser:number){
    return this.http.get<Docente>(`${urlH}obtenerDocente/${codeUser}`);
  }

  public obtenerPerfil(codeUser:number){
    return this.http.get<Perfil>(`${urlH}obtenerPerfil/${codeUser}`);
  }

  public setCodigoDocente(codigoDocente: DocenteComponent) {
    this.codigoDocente$$.next(codigoDocente);
  }

  public setDescPerfil(descPerfil: String) {
    this.descPerfil$$.next(descPerfil);
  }

  obtenerUsuarioPorNombre(nombreUsuario:any){

    const url3= urlH+'usuarionombre/'+nombreUsuario;
    //const url3= 'https://gpr-espe.azurewebsites.net/api/v1/usuarionombre/'+nombreUsuario;
    return this.http.get(url3); 
  }
  
}
