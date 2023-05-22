import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-password-olvidado',
  templateUrl: './password-olvidado.component.html',
  styleUrls: ['./password-olvidado.component.css']
})
export class PasswordOlvidadoComponent implements OnInit {
  blockedDocument: boolean = false;
  formulario2!: FormGroup;
  visible:boolean=true;
  changetype:boolean=true;
  user:any
  passwordService:any;
  flag:boolean=true;
  conf:boolean=true;
  docente: any;
  perfil:any;

  tareasDocente: TareaDocente[] = [];
  dataTable:any[] = [];

  constructor(
    private fb:FormBuilder, 
    private usuarioService: UsuarioService,
    private router: Router,
    private messageService: MessageService
    ) { 
    this.iniciarFormulario();
  }

  ngOnInit(): void {
  }

  iniciarFormulario(){
    this.formulario2=this.fb.group({
      usuario:['',Validators.required]
    })
  }

  resetearPassword(){
    this.blockedDocument = true; 
    this.usuarioService.resetearPassword(this.formulario2.value.usuario)
    .subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Se ha enviado un mensaje al correo ingresado'
        });
        setTimeout(() => {
          this.blockedDocument = false; 
          this.router.navigate(["login"])
        }, 2000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message ?? ' Error al enviar el mensaje'
        });
        this.blockedDocument = false; 
      },
      complete: () => {
        // this.isLoading = false;
      },
    })
  }
  

}
