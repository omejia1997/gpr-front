import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private serviceauth: UsuarioService,private router:Router) {

  }
  canActivate() {
    if (this.serviceauth.IsLoggedin()) {
      return true;
    } else {
      this.router.navigate(['./login']);
      return false;
    }
  }
}
