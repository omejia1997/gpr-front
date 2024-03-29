import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


//const urlH="http://localhost:8080/api/v1/"
const urlH = environment.URL_MICROSERVICE_INVESTIGACION + "/api/v1/";
// const urlH="https://gpr-decem-espe.azurewebsites.net/api/v1/"

@Injectable({
  providedIn: 'root'
})

export class RegistroService {
  constructor(private http: HttpClient) {
  }

  registrarUsuario(body :any){
  const url= urlH+'docentes';
    return this.http.post(url,body)
  }

  obtenerDocentes(){
    const url= urlH+'docente';
    return this.http.get(url)
  }
  obtenerUsuariosUnicos(){
    const url= urlH+'docentePerfilU';
    return this.http.get(url)
  }
  obtenerUsuarioPorIDEspe(idEspe:any){
    const url4= urlH+'usuarioid/'+idEspe;
    return this.http.get(url4);
  }

  obtenerDocentePorCedula(cedula:any){
    const url4= urlH+'catalogodocente/'+cedula;
    return this.http.get(url4);
  }




}
