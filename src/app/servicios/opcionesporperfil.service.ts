import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const urlH="http://localhost:8080/api/v1/"

//const urlH="https://gpr-mec-espe.azurewebsites.net/api/v1/"

@Injectable({
  providedIn: 'root'
})
export class OpcionesporperfilService {

  constructor(private http: HttpClient) { }

  obtenerOpcionesPerfil(id:any){

    const url= urlH+'opcionperfil/'+id;
    return this.http.get(url); 
  }
}
