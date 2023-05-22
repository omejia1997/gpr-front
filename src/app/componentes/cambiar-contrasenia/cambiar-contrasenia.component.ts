import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css']
})
export class CambiarContraseniaComponent implements OnInit {

  
  listaDocentes:any;
  nombreUsuario:any;
  passwordNewI:any;
  passwordConf:any;
  validaroPass:any;


  formularioContrasenia!: FormGroup;

  constructor(private fb:FormBuilder,private _usuario:UsuarioService, private router:Router) {
    
    this.iniciarFormulario();
    
    this.nombreUsuario=localStorage.getItem('usuario');
    this.cargarDocentes();
    this.validaroPass=true;
    
    
   
  }

  ngOnInit(): void {
    
  }
  validadorContrasenia(passwordNewA:any,passwordConA:any){
    console.log(passwordConA)
    if(passwordConA!=undefined){
      if(passwordNewA===passwordConA ){
        this.validaroPass=true;
      }else{
        this.validaroPass=false;
  
      }
    }
    
  }

  iniciarFormulario(){
    this.formularioContrasenia=this.fb.group({
      passwordAnt:['',Validators.required],
      passwordNew:['',Validators.required],
      passwordConf:['',Validators.required]
    })
    
  }

  cambiarContrasenia(){
    this.cargarDocentes();
   console.log (this.formularioContrasenia.value.passwordNew)
   console.log(this.listaDocentes.passwUsuario)

   let usuariodata={
    codigoUsuario: this.listaDocentes.codigoUsuario,
    nombreUsuario: this.listaDocentes.nombreUsuario,
    passwUsuario: this.formularioContrasenia.value.passwordNew,
    fechaCreUsu: this.listaDocentes.fechaCreUsu,
    fechaModUsuario: this.listaDocentes.fechaModUsuario,
    estadoUsuario: '1'
  }
  console.log(usuariodata)

  this._usuario.actualizarUsuario(usuariodata,this.listaDocentes.codigoUsuario).subscribe(respuesta=>{
    alert("Contraseña actualizada con éxito!")
    this.router.navigate(['./home']);

  },(error:any)=>{
    console.log(error)
  })


  }


  cargarDocentes(){
    
    this._usuario.obtenerUsuarioPorNombre(this.nombreUsuario).subscribe(respuesta=>{
      
      this.procesarDocentes(respuesta);
      
    })
  }
  procesarDocentes(resp: any){
    this.listaDocentes=resp.docenteResponse.docente[0].codigoUsuario
    
    console.log(this.listaDocentes.passwUsuario)
  }

  validarCadenaContrasenia(){
    console.log(this.passwordNewI.length)
    var myRe = new RegExp("^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$");
    console.log(this.formularioContrasenia)

  }


}
