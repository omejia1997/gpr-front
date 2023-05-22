import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Perfil } from '../models/Perfil';

const urlH = "http://localhost:8080/api/v1/"
//const urlH="https://gpr-mec-espe.azurewebsites.net/api/v1/"


@Injectable({
  providedIn: 'root'
})
export class UsuarioperfilService {

  constructor(private http: HttpClient) { }

  obtenerUsuario() {
    const url = urlH + 'perfil';
    return this.http.get(url);
  }

  obtenerPerfiles() {
    const url = urlH + 'listarPerfiles';
    return this.http.get<Perfil[]>(url); 
  }

  guardarUsuarioPerfil(codigoperfil: any, codigousuario: any, idusuper: any) {
    const url = urlH + 'usuarioperfil/' + codigoperfil + '/' + codigousuario + '/' + idusuper;
    return this.http.post(url, null)
  }

  quitarrUsuarioPerfil(codigouperfil: any, idusuper: any) {

    const url = urlH + 'usuarioperfil/' + codigouperfil + '/' + idusuper;
    return this.http.delete(url)
  }


}
