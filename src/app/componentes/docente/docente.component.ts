import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/servicios/registro.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  listaDocentes:any[]=[];
  filterpost:any
  cargaaprobado!:boolean;
  codigoUsuario:any;

  

  constructor(private _docente: RegistroService, private _usuario:UsuarioService, private router:Router) { 
    this.cargaaprobado=false;
    this.cargarDocentes();
    
  }

  aprobarSolicitud(data:any,estado:any){
    this.codigoUsuario=data.codigoUsuario.codigoUsuario;
    this.cargarDocentes();
    
    this.cargaaprobado=true;
    console.log(data)
    let usuariodata={
      codigoUsuario: data.codigoUsuario.codigoUsuario,
      nombreUsuario: data.codigoUsuario.nombreUsuario,
      passwUsuario: data.codigoUsuario.passwUsuario,
      fechaCreUsu: data.codigoUsuario.fechaCreUsu,
      fechaModUsuario: data.codigoUsuario.fechaModUsuario,
      estadoUsuario: estado
    }
    this._usuario.actualizarUsuario(usuariodata,data.codigoUsuario.codigoUsuario).subscribe(respuesta=>{
      
      this.cargarDocentes();
    this.cargaaprobado=false;
    },(error:any)=>{
      console.log(error)
    })
  }

  actualizarDocente(data:any){
    console.log(data.codigoUsuario.nombreUsuario)
    localStorage.setItem('usuarioAct',data.codigoUsuario.nombreUsuario);
    this.router.navigate(['./actualizar-docente']);


  }

  ngOnInit(): void {
  }

  cargarDocentes(){
    this._docente.obtenerDocentes().subscribe(respuesta=>{
      
      this.filterpost='';
      this.procesarDocentes(respuesta);
      
    })
  }
  procesarDocentes(resp: any){
    this.listaDocentes=resp.docenteResponse.docente
    this.listaDocentes.forEach(docente => {
      
    })
  }

}
