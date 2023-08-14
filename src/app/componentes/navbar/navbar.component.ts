import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpcionesporperfilService } from 'src/app/servicios/opcionesporperfil.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  //Menus
  menusAdministrativo!: menus[];
  menusCuenta!: menus[];
  menusTareas!: menus[];
  menusReportes!: menus[];
  objmenu!: menus;

  public isMenuCollapsed = true;
  usuario: any;
  codigo: any;
  descPerfil: any;
  nombreDocenteRevisor: any;
  codigousuario: any;

  menus: any;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private _opcionperfil: OpcionesporperfilService
  ) {
    this.usuario = localStorage.getItem('usuario');
  }

  cargarPerfil() {
    this.codigousuario = localStorage.getItem('codUsuario');
    this.usuarioService.obtenerPerfil(this.codigousuario).subscribe((resp) => {
      this.cargarOpcionesPerfil(resp.codigoPerfil); //descomentar cuando se ponga bn los datos en la BD
      this.descPerfil= resp.descPerfil;
    });
  }

  cargarOpcionesPerfil(id: any) {
    this._opcionperfil.obtenerOpcionesPerfil(id).subscribe((respuesta) => {
      this.procesarOpcionesPerfil(respuesta);
    });
  }

  procesarOpcionesPerfil(resp: any) {
    this.menusAdministrativo = new Array();
    this.menusTareas = new Array();
    this.menusCuenta = new Array();
    this.menusReportes = new Array();

    this.menus = resp.opcionPerfilResponse.opcper;

    this.menus.forEach((element: { codigoOpcion: any }) => {
      switch (element.codigoOpcion.codSistema.descriSistema) {
        case 'Administrativo':
          this.objmenu = new menus(
            element.codigoOpcion.descOpcion,
            element.codigoOpcion.urlOpcion
          );
          this.menusAdministrativo.push(this.objmenu);
          break;
        case 'Actividades':
          this.objmenu = new menus(
            element.codigoOpcion.descOpcion,
            element.codigoOpcion.urlOpcion
          );
          this.menusTareas.push(this.objmenu);
          break;
        case 'Cuenta':
          this.objmenu = new menus(
            element.codigoOpcion.descOpcion,
            element.codigoOpcion.urlOpcion
          );
          this.menusCuenta.push(this.objmenu);
          break;

        case 'Reportes':
          this.objmenu = new menus(
            element.codigoOpcion.descOpcion,
            element.codigoOpcion.urlOpcion
          );
          this.menusReportes.push(this.objmenu);
          break;

        default:
          break;
      }
    });

    if (this.menusTareas.length != 0) {
      this.menusTareas
        .sort((x, y) => x.nombre.localeCompare(y.nombre))
        .reverse();
    }
  }

  agregarMenus() {
    this.cargarPerfil();
  }

  ngOnInit(): void {
    this.agregarMenus();
  }

  IsLoggedout() {
    this.router.navigate(['./login']);
    return localStorage.clear();
  }

}

class menus {
  nombre!: string;
  url!: string;

  constructor(nombre: string, url: string) {
    this.nombre = nombre;
    this.url = url;
  }
}
