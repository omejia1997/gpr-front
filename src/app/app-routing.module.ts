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
import { ListarTareasAsignadasComponent } from './pages/tarea/listar-tareas-asignadas/listar-tareas-asignadas.component';
import { ListarTareasEntregadasComponent } from './pages/tarea/listar-tareas-entregadas/listar-tareas-entregadas.component';
import { ListarTareasRevisarComponent } from './pages/tarea/listar-tareas-revisar/listar-tareas-revisar.component';
import { RevisarTareaComponent } from './pages/tarea/revisar-tarea-entregada/revisar-tarea.component';
import { CrearTipoProcesoComponent } from './pages/tipoProceso/crear-tipo-proceso/crear-tipo-proceso.component';
import { EditarTipoProcesoComponent } from './pages/tipoProceso/editar-tipo-proceso/editar-tipo-proceso';
import { ListarTiposProcesosComponent } from './pages/tipoProceso/listar-tipos-procesos/listar-tipos-procesos.component';
import { ListarLogueoUsuariosComponent } from './pages/usuario/listar-logueo-usuarios/listar-logueo-usuarios.component';
import { PasswordOlvidadoComponent } from './pages/usuario/password-olvidado/password-olvidado.component';
import { AuthGuard } from './shared/auth.guard';
import { ListarTareasProgramadasComponent } from './pages/tarea/listar-tareas-programadas/listar-tareas-programadas.component';
import { CrearTareaProgramadaComponent } from './pages/tarea/crear-tarea-programada/crear-tarea-programada.component';
import { CrearProyectoProgramadoComponent } from './pages/tarea/crear-proyecto-programado/crear-proyecto-programado.component';
import { MonitoreoProyectoComponent } from './pages/tarea/monitoreo/monitoreo-proyecto/monitoreo-proyecto.component';
import { MonitoreoTareasComponent } from './pages/tarea/monitoreo/monitoreo-tareas/monitoreo-tareas.component';
import { MonitoreoTareaDocenteComponent } from './pages/tarea/monitoreo/monitoreo-tarea-docente/monitoreo-tarea-docente.component';
import { VerTareaDocenteComponent } from './pages/tarea/monitoreo/monitoreo-tarea-docente/ver-tarea-docente/ver-tarea-docente.component';
import { DashboardInvestigacionComponent } from './pages/dashboard/investigacion1/dashboard.component';
import { DashboardTareaComponent } from './pages/dashboard/investigacion1/dashboard-tarea/dashboard-tarea.component';
import { ListarTareasProgramadasVinculacionComponent } from './modulos/vinculacion/paginas/tarea/listar-tareas-programadas-vinculacion/listar-tareas-programadas-vinculacion.component';
import { CrearTareaProgramadaVinculacionComponent } from './modulos/vinculacion/paginas/tarea/crear-tarea-programada-vinculacion/crear-tarea-programada-vinculacion.component';
import { CrearProyectoVinculacionComponent } from './modulos/vinculacion/paginas/proyecto/crear-proyecto-vinculacion/crear-proyecto-vinculacion.component';
import { ListarProyectosVinculacionComponent } from './modulos/vinculacion/paginas/proyecto/listar-proyectos/listar-proyectos-vinculacion.component';
import { EditarProyectoVinculacionComponent } from './modulos/vinculacion/paginas/proyecto/editar-proyecto-vinculacion/editar-proyecto-vinculacion.component';
import { EditarTareaProgramadaVinculacionComponent } from './modulos/vinculacion/paginas/tarea/editar-tarea-programada-vinculacion/editar-tarea-programada-vinculacion.component';
import { RealizarTareaVinculacionComponent } from './modulos/vinculacion/paginas/tarea/realizar-tarea-vinculacion/realizar-tarea-vinculacion.component';
import { RevisarTareaEntregadaVinculacion } from './modulos/vinculacion/paginas/tarea/revisar-tarea-entregada-vinculacion/revisar-tarea-entregada-vinculacion';
import { MonitoreoProyectoVinculacionComponent } from './modulos/vinculacion/paginas/monitoreo/monitoreo-proyecto-vinculacion/monitoreo-proyecto-vinculacion.component';
import { MonitoreoTareasVinculacionComponent } from './modulos/vinculacion/paginas/monitoreo/monitoreo-tareas/monitoreo-tareas-vinculacion.component';
import { MonitoreoTareaDocenteVinculacionComponent } from './modulos/vinculacion/paginas/monitoreo/monitoreo-tarea-docente/monitoreo-tarea-docente-vinculacion.component';
import { VerTareaDocenteVinculacionComponent } from './modulos/vinculacion/paginas/monitoreo/monitoreo-tarea-docente/ver-tarea-docente/ver-tarea-docente-vinculacion.component';
import { ListarTareasRevisadasVinculacionComponent } from './modulos/vinculacion/paginas/tarea/listar-tareas-revisadas/listar-tareas-revisadas-vinculacion.component';
import { DashboardVinculacionComponent } from './modulos/vinculacion/paginas/dashboard/dashboard-vinculacion.component';
import { DashboardTareaVinculacionComponent } from './modulos/vinculacion/paginas/dashboard/dashboard-tarea/dashboard-tarea-vinculacion.component';
import { EditarTareaComponent } from './pages/tarea/editar-tarea-programada/editar-tarea.component';
import { HomeVinculacionComponent } from './modulos/vinculacion/paginas/home/home-vinculacion.component';
import { SubirInformacionGeneralComponent } from './modulos/docencia/informacion-personal/paginas/informacion-general/subir-informacion-general/subir-informacion-general.component';
import { ListarDocentesInformacionComponent } from './modulos/docencia/informacion-personal/paginas/informacion-general/listar-docentes-informacion/listar-docentes-informacion.component';
import { VerDocenteInformacionComponent } from './modulos/docencia/informacion-personal/paginas/informacion-general/ver-docente-informacion/ver-docente-informacion.component';
import { ListarTareaDocenteComponent } from './modulos/tarea-docencia/paginas/tarea-docente/listar-tarea-docente/listar-tarea-docente.component';
import { GestionarTareaDocenteComponent } from './modulos/tarea-docencia/paginas/tarea-docente/gestionar-tarea-docente/gestionar-tarea-docente.component';
import { RealizarInformeFinalDocenciaComponent } from './modulos/tarea-docencia/paginas/tarea-docente/realizar-informe-final/realizar-informe-final-docencia.component';
import { ListarPeriodosComponent } from './pages/periodo/listar-periodos/listar-periodos.component';
import { CrearPeriodoComponent } from './pages/periodo/crear-periodo/crear-periodo.component';
import { EditarPeriodoComponent } from './pages/periodo/editar-periodo/editar-periodo.component';
import { RevisarTareaAsignadaDocenciaComponent } from './modulos/tarea-docencia/paginas/tarea-docente/revisar-tarea-asignada-docencia/revisar-tarea-asignada-docencia.component';
import { RevisarTodosInformeFinalSubidos } from './modulos/tarea-docencia/paginas/tarea-docente/revisar-todos-informe-final-subidos/revisar-todos-informe-final-subidos.component';
import { RendimientoGeneralAsignaturasComponent } from './modulos/tarea-docencia/paginas/tarea-docente/dashboard-tarea-modulo-docencia/rendimiento-general-asignaturas/rendimiento-general-asignaturas.component';
import { RendimientoDocenteComponent } from './modulos/tarea-docencia/paginas/tarea-docente/dashboard-tarea-modulo-docencia/rendimiento-general-asignaturas/rendimiento-docente/rendimiento-docente.component';


const routes: Routes = [
 {path: '', redirectTo:'/login' ,pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'password-olvidado', component:PasswordOlvidadoComponent},
  {path: 'home', component:HomeComponent,canActivate:[AuthGuard]},
  {path: 'docentes', component:DocenteComponent,canActivate:[AuthGuard]},
  {path: 'listar-periodos', component:ListarPeriodosComponent,canActivate:[AuthGuard]},
  {path: 'crear-periodo', component:CrearPeriodoComponent,canActivate:[AuthGuard]},
  {path: 'editar-periodo', component:EditarPeriodoComponent,canActivate:[AuthGuard]},
  {path: 'listar-proyectos', component:ListarProyectosComponent,canActivate:[AuthGuard]},
  {path: 'crear-proyectos', component:CrearProyectosComponent,canActivate:[AuthGuard]},
  {path: 'editar-proyecto', component:EditarProyectoComponent,canActivate:[AuthGuard]},
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
  {path: 'crear-proyecto-programado', component:CrearProyectoProgramadoComponent,canActivate:[AuthGuard]},
  {path: 'monitoreo-proyecto', component:MonitoreoProyectoComponent,canActivate:[AuthGuard]},
  {path: 'monitoreo-tareas', component:MonitoreoTareasComponent,canActivate:[AuthGuard]},
  {path: 'monitoreo-tarea-docente', component:MonitoreoTareaDocenteComponent,canActivate:[AuthGuard]},
  {path: 'ver-tarea-docente', component:VerTareaDocenteComponent,canActivate:[AuthGuard]},
  {path: 'dashboard-investigacion', component:DashboardInvestigacionComponent,canActivate:[AuthGuard]},
  {path: 'dashboard-tarea-investigacion', component:DashboardTareaComponent,canActivate:[AuthGuard]},
  {path: 'home-vinculacion', component:HomeVinculacionComponent,canActivate:[AuthGuard]},
  {path: 'crear-proyecto-vinculacion', component:CrearProyectoVinculacionComponent,canActivate:[AuthGuard]},
  {path: 'editar-proyecto-vinculacion', component:EditarProyectoVinculacionComponent,canActivate:[AuthGuard]},
  {path: 'listar-proyectos-vinculacion', component:ListarProyectosVinculacionComponent,canActivate:[AuthGuard]},
  {path: 'listar-tareas-programadas-vinculacion', component:ListarTareasProgramadasVinculacionComponent,canActivate:[AuthGuard]},
  {path: 'crear-tarea-programada-vinculacion', component:CrearTareaProgramadaVinculacionComponent,canActivate:[AuthGuard]},
  {path: 'editar-tarea-programada-vinculacion', component:EditarTareaProgramadaVinculacionComponent,canActivate:[AuthGuard]},
  {path: 'realizar-tarea-vinculacion', component:RealizarTareaVinculacionComponent,canActivate:[AuthGuard]},
  {path: 'revisar-tarea-entregada-vinculacion', component:RevisarTareaEntregadaVinculacion,canActivate:[AuthGuard]},
  {path: 'monitoreo-proyecto-vinculacion', component:MonitoreoProyectoVinculacionComponent,canActivate:[AuthGuard]},
  {path: 'monitoreo-tareas-vinculacion', component:MonitoreoTareasVinculacionComponent,canActivate:[AuthGuard]},
  {path: 'monitoreo-tarea-docente-vinculacion', component:MonitoreoTareaDocenteVinculacionComponent,canActivate:[AuthGuard]},
  {path: 'ver-tarea-docente-vinculacion', component:VerTareaDocenteVinculacionComponent,canActivate:[AuthGuard]},
  {path: 'listar-tareas-revisadas-vinculacion', component:ListarTareasRevisadasVinculacionComponent,canActivate:[AuthGuard]},
  {path: 'dashboard-vinculacion', component:DashboardVinculacionComponent,canActivate:[AuthGuard]},
  {path: 'dashboard-tarea-vinculacion', component:DashboardTareaVinculacionComponent,canActivate:[AuthGuard]},
  //docente
  {path: 'subir-informacion-general', component:SubirInformacionGeneralComponent,canActivate:[AuthGuard]},
  {path: 'listar-docentes-informacion', component:ListarDocentesInformacionComponent,canActivate:[AuthGuard]},
  {path: 'ver-docente-informacion', component:VerDocenteInformacionComponent,canActivate:[AuthGuard]},
  //tarea-docente
  {path: 'listar-tarea-docente', component:ListarTareaDocenteComponent,canActivate:[AuthGuard]},
  {path: 'gestionar-tarea-docente', component:GestionarTareaDocenteComponent,canActivate:[AuthGuard]},
  {path: 'revisar-tarea-asignada-docencia', component:RevisarTareaAsignadaDocenciaComponent,canActivate:[AuthGuard]},
  {path: 'realizar-informe-final-docencia', component:RealizarInformeFinalDocenciaComponent,canActivate:[AuthGuard]},
  {path: 'revisar-todos-informe-final-subidos', component:RevisarTodosInformeFinalSubidos,canActivate:[AuthGuard]},
  {path: 'rendimiento-general-asignaturas', component:RendimientoGeneralAsignaturasComponent,canActivate:[AuthGuard]},
  {path: 'rendimiento-docente', component:RendimientoDocenteComponent,canActivate:[AuthGuard]},
  {path: '**', component:LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]

})
export class AppRoutingModule { }
