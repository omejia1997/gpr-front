import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TareasRealizadas } from 'src/app/models/TareasRealizadas';
import { TareaService } from 'src/app/servicios/tarea.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario2!: FormGroup;
  visible:boolean=true;
  changetype:boolean=true;
  user:any
  usuarioService:any;
  passwordService:any;
  flag:boolean=true;
  conf:boolean=true;
  docente: any;
  perfil:any;

  getTareasDocente$: Observable<TareasRealizadas[]>;
  tareasDocente: TareasRealizadas[] = [];
  dataTable:any[] = [];

  constructor(
    private fb:FormBuilder,
    private _usuario: UsuarioService,
    private router: Router,
    private tareaService: TareaService
    ) {
    this.iniciarFormulario();
    this.getTareasDocente$ = this.tareaService.obtenerTodasTareasRevisar();
  }

  ngOnInit(): void {
    this.validarInicioSesionEnCache();
  }

  validarInicioSesionEnCache(){
    if (localStorage.getItem('usuario') != null) {
      if (localStorage.getItem('est') == '0') {
        this.router.navigate(['./pagina-validador']);

      }else if(localStorage.getItem('est') == '2'){
        this.router.navigate(['./cambiar-contrasenia']);
      }
      else {
        this.router.navigate(['./home']);
      }
    }
  }

  changeFlag(){
    this.flag = true;
  }

  iniciarFormulario(){
    this.formulario2=this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required],
    })
  }

  consultar(){
    this._usuario.login(this.formulario2.value.usuario,this.formulario2.value.password).subscribe(respuesta=>{
      //console.log(respuesta)
      this.procesarUsuarios2(respuesta)
    })
  }


  procesarUsuarios2(resp:any){
    let listusuarios=resp.categoryResponse.category
    this.conf=false;

    //console.log(listusuarios)

    listusuarios.forEach((element: {
      passwUsuario: any; nombreUsuario: any; codigoUsuario: any;estadoUsuario: any
      }) => {
        //console.log(element.nombreUsuario)
        if(element.nombreUsuario!=null){
          localStorage.setItem('usuario',element.nombreUsuario);
          localStorage.setItem('est', element.estadoUsuario);

          this.perfil = this._usuario.obtenerPerfil(element.codigoUsuario).subscribe({
            next: (res) => {
              if(res) {
                this.perfil =res;
                localStorage.setItem('codigoPerfil',this.perfil.codigoPerfil);
                localStorage.setItem('descPerfil',this.perfil.descPerfil);
              }
            }
          });

          localStorage.setItem('codUsuario',element.codigoUsuario);
          if(element.nombreUsuario!='admin'){
            this.docente = this._usuario.obtenerDocente(element.codigoUsuario).subscribe({
              next: (res) => {
                if(res) {
                  this.docente =res;
                  this._usuario.setCodigoDocente(this.docente);
                  localStorage.setItem('codigoDocente',this.docente.codigoDocente);
                  localStorage.setItem('idEspeDocenteRevisor',this.docente.idDocente);
                  localStorage.setItem('idDocenteRevisor',this.docente.cedulaDocente);
                  localStorage.setItem('nombreDocenteRevisor',this.docente.nombreDocente+" "+this.docente.apellidoDocente);
                }
              }
            });
          }
        }

    });
    if (localStorage.getItem('usuario') != null) {
      if (localStorage.getItem('est') == '0') {
        this.router.navigate(['./pagina-validador']);
      }else if(localStorage.getItem('est') == '2'){
        this.router.navigate(['./cambiar-contrasenia']);
      }
      else {
        this.router.navigate(['./home']);
      }
    } else {
      this.flag = false;
      this.router.navigate(['./login']);
    }
  }
  mostrarcontrasenia(){
    this.visible=!this.visible;
    this.changetype=!this.changetype;
  }

}
