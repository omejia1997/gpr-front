import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarContraseniaComponent } from './componentes/cambiar-contrasenia/cambiar-contrasenia.component';
import { ActualizarDocenteComponent } from './componentes/docente/actualizar-docente/actualizar-docente.component';
import { DocenteComponent } from './componentes/docente/docente.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { PaginasValidadorComponent } from './componentes/paginas-validador/paginas-validador.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { UsuarioPerfilComponent } from './componentes/usuario-perfil/usuario-perfil.component';
import { CrearCargoComponent } from './pages/cargo/crear-cargo/crear-cargo.component';
import { EditarCargoComponent } from './pages/cargo/editar-cargo/editar-cargo.component';
import { ListarCargoComponent } from './pages/cargo/listar-cargo/listar-cargo.component';
import { CrearProyectosComponent } from './pages/proyecto/crear-proyectos/crear-proyectos.component';
import { EditarProyectoComponent } from './pages/proyecto/editar-proyecto/editar-proyecto.component';
import { ListarProyectosComponent } from './pages/proyecto/listar-proyectos/listar-proyectos.component';
import { ListarTareasDocenteComponent } from './pages/tarea-docente/listar-tareas-docente/listar-tareas-docente.component';
import { RealizarTareaComponent } from './pages/tarea-docente/realizar-tarea-docente/realizar-tarea.component';
import { CrearTareaComponent } from './pages/tarea/crear-tarea/crear-tarea.component';
import { EditarTareaComponent } from './pages/tarea/editar-tarea/editar-tarea.component';
import { ListarTareasAsignadasComponent } from './pages/tarea/listar-tareas-asignadas/listar-tareas-asignadas.component';
import { ListarTareasEntregadasComponent } from './pages/tarea/listar-tareas-entregadas/listar-tareas-entregadas.component';
import { ListarTareasRevisarComponent } from './pages/tarea/listar-tareas-revisar/listar-tareas-revisar.component';
import { ListarTareasComponent } from './pages/tarea/listar-tareas/listar-tareas.component';
import { RevisarTareaComponent } from './pages/tarea/revisar-tarea-entregada/revisar-tarea.component';
import { CrearTipoProcesoComponent } from './pages/tipoProceso/crear-tipo-proceso/crear-tipo-proceso.component';
import { EditarTipoProcesoComponent } from './pages/tipoProceso/editar-tipo-proceso/editar-tipo-proceso';
import { ListarTiposProcesosComponent } from './pages/tipoProceso/listar-tipos-procesos/listar-tipos-procesos.component';
import { ListarLogueoUsuariosComponent } from './pages/usuario/listar-logueo-usuarios/listar-logueo-usuarios.component';
import { PasswordOlvidadoComponent } from './pages/usuario/password-olvidado/password-olvidado.component';
import { AuthGuard } from './shared/auth.guard';
import { ListarTareasProgramadasComponent } from './pages/tarea/listar-tareas-programadas/listar-tareas-programadas.component';
import { CrearTareaProgramadaComponent } from './pages/tarea/crear-tarea-programada/crear-tarea-programada.component';

const routes: Routes = [
 {path: '', redirectTo:'/login' ,pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'password-olvidado', component:PasswordOlvidadoComponent},
  {path: 'home', component:HomeComponent,canActivate:[AuthGuard]},
  {path: 'docentes', component:DocenteComponent,canActivate:[AuthGuard]},
  {path: 'listar-proyectos', component:ListarProyectosComponent,canActivate:[AuthGuard]},
  {path: 'crear-proyectos', component:CrearProyectosComponent,canActivate:[AuthGuard]},
  {path: 'editar-proyecto', component:EditarProyectoComponent,canActivate:[AuthGuard]},
  {path: 'listar-tareas', component:ListarTareasComponent,canActivate:[AuthGuard]},
  {path: 'crear-tareas', component:CrearTareaComponent,canActivate:[AuthGuard]},
  {path: 'editar-tarea', component:EditarTareaComponent,canActivate:[AuthGuard]},
  {path: 'listar-tareas-docente', component:ListarTareasDocenteComponent,canActivate:[AuthGuard]},
  {path: 'realizar-tarea-docente', component:RealizarTareaComponent,canActivate:[AuthGuard]},
  {path: 'pagina-validador', component:PaginasValidadorComponent,canActivate:[AuthGuard]},
  {path: 'cambiar-contrasenia', component:CambiarContraseniaComponent,canActivate:[AuthGuard]},
  {path: 'actualizar-docente', component:ActualizarDocenteComponent,canActivate:[AuthGuard]},
  {path: 'usuario-perfil', component:UsuarioPerfilComponent,canActivate:[AuthGuard]},
  {path: 'tareas-entregadas', component:ListarTareasEntregadasComponent,canActivate:[AuthGuard]},
  {path: 'revisar-tarea-entregada', component:RevisarTareaComponent,canActivate:[AuthGuard]},
  {path: 'tareas-asignadas', component:ListarTareasAsignadasComponent,canActivate:[AuthGuard]},
  {path: 'listar-tipos-procesos', component:ListarTiposProcesosComponent,canActivate:[AuthGuard]},
  {path: 'crear-tipo-proceso', component:CrearTipoProcesoComponent,canActivate:[AuthGuard]},
  {path: 'editar-tipo-proceso', component:EditarTipoProcesoComponent,canActivate:[AuthGuard]},
  {path: 'listar-tareas-revisar', component:ListarTareasRevisarComponent,canActivate:[AuthGuard]},
  {path: 'listar-logueo-usuarios', component:ListarLogueoUsuariosComponent,canActivate:[AuthGuard]},
  {path: 'listar-cargos', component:ListarCargoComponent,canActivate:[AuthGuard]},
  {path: 'crear-cargo', component:CrearCargoComponent,canActivate:[AuthGuard]},
  {path: 'editar-cargo', component:EditarCargoComponent,canActivate:[AuthGuard]},
  {path: 'listar-tareas-programadas', component:ListarTareasProgramadasComponent,canActivate:[AuthGuard]},
  {path: 'crear-tarea-programada', component:CrearTareaProgramadaComponent,canActivate:[AuthGuard]},
  {path: '**', component:LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
  
})
export class AppRoutingModule { }
