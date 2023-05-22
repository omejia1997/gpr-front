import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throws } from 'assert';
import { RegistroService } from 'src/app/servicios/registro.service';
import { UsuarioperfilService } from 'src/app/servicios/usuarioperfil.service';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent implements OnInit {

  //variables perfil
  codPerfil: any;
  descPerfil: any;
  ObsPerfil: any;
  up!: usuarioperfil;
  perfil: any;

  listaDocentes: any;
  listaPerfiles: any;
  dataDocenteseleccionados!: usuarioperfil[];
  dataDocenteNoseleccionados!: usuarioperfil[];
  dataDocenteFinal!: usuarioperfil[];
  

  formularioUsuPer!: FormGroup;

  constructor(
    private _docente: RegistroService,
    private _usuarioperfil: UsuarioperfilService,
    private fb: FormBuilder,
    private router:Router
  ) {

    this.cargarDocentes();
    this.cargarPerfiles();

    
    // this.asignarDocentesCheck();
  }

  ngOnInit(): void {
 
    this.iniciarFormulario();

  }

  iniciarFormulario() {
    this.formularioUsuPer = this.fb.group({
      id: ['', Validators.required],

    })

  }




  cargarDocentes() {
    this._docente.obtenerUsuariosUnicos().subscribe(respuesta => {

      
      this.procesarDocentes(respuesta);

    })
  }
  procesarDocentes(resp: any) {
    this.listaDocentes = resp.docenteResponse.docente
  }

  cargarPerfiles() {
    this._usuarioperfil.obtenerUsuario().subscribe(respuesta => {

      this.procesarPerfiles(respuesta);

    })
  }
  procesarPerfiles(resp: any) {
    this.listaPerfiles = resp.perfilResponse.perfil

  }

  asignarDocentesCheck() {
    this.cargarDocentes()


    this.dataDocenteNoseleccionados = new Array();
    this.dataDocenteseleccionados = new Array();

    var usuperList = this.perfil.usuperList

    const codiPerfil=this.perfil.codigoPerfil

    usuperList.forEach((element: {
      codigoUsuario: any, nombreUsuario: any;codigoPerfil:any;codUsuper:any;

    }) => {
      

      this.up = new usuarioperfil(element.codigoUsuario.codigoUsuario,codiPerfil, element.codUsuper,element.codigoUsuario.nombreUsuario, true);

      this.dataDocenteseleccionados.push(this.up)

    })

    this.listaDocentes.forEach((element: {
      codigoUsuario: any, nombreDocente: any; apellidoDocente: any;

    }) => {

      this.up = new usuarioperfil(element.codigoUsuario.codigoUsuario, codiPerfil,"0",element.codigoUsuario.nombreUsuario, false);

      const resultado = this.dataDocenteseleccionados.find(up => up.codigoUsuario === element.codigoUsuario.codigoUsuario)
      if (resultado === undefined) {
        this.dataDocenteNoseleccionados.push(this.up)

      }

    })


  }

  guardarUsuarioPerfil(){

    
    this.dataDocenteFinal=this.dataDocenteseleccionados.concat(this.dataDocenteNoseleccionados)

    this.dataDocenteFinal.forEach(element => {
      console.log("Docente: "+element.codigoPerfil+element.codigoUsuario+element.codigoUsuper+element.isSelected);

      if(element.isSelected===true){
        this._usuarioperfil.guardarUsuarioPerfil(element.codigoPerfil,element.codigoUsuario,element.codigoUsuper).subscribe((data:any)=>{
          console.log(data);
        
    
        },(error:any)=>{
          
          console.log(error);
        })
  

      } else{

        this._usuarioperfil.quitarrUsuarioPerfil(element.codigoUsuper,element.codigoUsuper).subscribe((data:any)=>{
          console.log(data);
    
    
        },(error:any)=>{
          
          console.log(error);
        })

      } 
      
    });

    alert("Perfiles actualizados con éxito!")
    location.reload()
    

    
 

  }


}



class usuarioperfil {

  codigoUsuario!: string;
  codigoPerfil!: string;
  codigoUsuper!: string;
  nombreUsuario!: string;
  isSelected!: boolean;

  constructor(codigoUsuario: string, codigoPerfil: string,codigoUsuper: string,nombreUsuario: string, isSelected: boolean) {
    this.codigoUsuario = codigoUsuario
    this.codigoPerfil=codigoPerfil
    this.codigoUsuper=codigoUsuper
    this.nombreUsuario = nombreUsuario
    this.isSelected = isSelected

  }


}
