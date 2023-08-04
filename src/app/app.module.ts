import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxAbstractControlAsModule } from 'ngx-abstract-control-as';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CambiarContraseniaComponent } from './componentes/cambiar-contrasenia/cambiar-contrasenia.component';
import { ActualizarDocenteComponent } from './componentes/docente/actualizar-docente/actualizar-docente.component';
import { DocenteComponent } from './componentes/docente/docente.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
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
import { ListarTareasProgramadasComponent } from './pages/tarea/listar-tareas-programadas/listar-tareas-programadas.component';
import { ListarTareasRevisarComponent } from './pages/tarea/listar-tareas-revisar/listar-tareas-revisar.component';
import { RevisarTareaComponent } from './pages/tarea/revisar-tarea-entregada/revisar-tarea.component';
import { CrearTipoProcesoComponent } from './pages/tipoProceso/crear-tipo-proceso/crear-tipo-proceso.component';
import { EditarTipoProcesoComponent } from './pages/tipoProceso/editar-tipo-proceso/editar-tipo-proceso';
import { ListarTiposProcesosComponent } from './pages/tipoProceso/listar-tipos-procesos/listar-tipos-procesos.component';
import { ListarLogueoUsuariosComponent } from './pages/usuario/listar-logueo-usuarios/listar-logueo-usuarios.component';
import { PasswordOlvidadoComponent } from './pages/usuario/password-olvidado/password-olvidado.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ProyectoService } from './servicios/proyecto.service';
import { CrearTareaProgramadaComponent } from './pages/tarea/crear-tarea-programada/crear-tarea-programada.component';
import { CrearProyectoProgramadoComponent } from './pages/tarea/crear-proyecto-programado/crear-proyecto-programado.component';
import { MonitoreoProyectoComponent } from './pages/tarea/monitoreo/monitoreo-proyecto/monitoreo-proyecto.component';
import { MonitoreoTareasComponent } from './pages/tarea/monitoreo/monitoreo-tareas/monitoreo-tareas.component';
import { MonitoreoTareaDocenteComponent } from './pages/tarea/monitoreo/monitoreo-tarea-docente/monitoreo-tarea-docente.component';
import { VerTareaDocenteComponent } from './pages/tarea/monitoreo/monitoreo-tarea-docente/ver-tarea-docente/ver-tarea-docente.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardInvestigacionComponent } from './pages/dashboard/investigacion1/dashboard.component';
import { ProgressBarComponent } from './pages/dashboard/investigacion1/progress-bar/progress-bar.component';
import { DashboardTareaComponent } from './pages/dashboard/investigacion1/dashboard-tarea/dashboard-tarea.component';
import { MatPaginatorModule } from '@angular/material/paginator';
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
import {MatTabsModule} from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog'
import { ModalFormacionAcademicaComponent } from './modulos/docencia/informacion-personal/components/modal-formacion-academica/modal-formacion-academica.component';
import { ModalExperienciaProfesionalComponent } from './modulos/docencia/informacion-personal/components/modal-experiencia-profesional/modal-experiencia-profesional.component';
import { MatSelectModule } from '@angular/material/select';
import { ModalIdiomaHabladoComponent } from './modulos/docencia/informacion-personal/components/modal-idioma-hablado/modal-idioma-hablado.component';
import { ModalPublicacionRealizadaComponent } from './modulos/docencia/informacion-personal/components/modal-publicacion-realizada/modal-publicacion-realizada.component';
import { ListarDocentesInformacionComponent } from './modulos/docencia/informacion-personal/paginas/informacion-general/listar-docentes-informacion/listar-docentes-informacion.component';
import { VerDocenteInformacionComponent } from './modulos/docencia/informacion-personal/paginas/informacion-general/ver-docente-informacion/ver-docente-informacion.component';
import { ListarTareaDocenteComponent } from './modulos/tarea-docencia/paginas/tarea-docente/listar-tarea-docente/listar-tarea-docente.component';
import { GestionarTareaDocenteComponent } from './modulos/tarea-docencia/paginas/tarea-docente/gestionar-tarea-docente/gestionar-tarea-docente.component';
import { ModalStringComponent } from './modulos/tarea-docencia/components/modal-string/modal-string.component';
import { RealizarInformeFinalDocenciaComponent } from './modulos/tarea-docencia/paginas/tarea-docente/realizar-informe-final/realizar-informe-final-docencia.component';
import { ModalAsignaturaComponent } from './modulos/tarea-docencia/components/modal-asignatura/modal-asignatura.component';
import { ModalRendimientoAcademicoComponent } from './modulos/tarea-docencia/components/modal-rendimiento-academico/modal-rendimiento-academico.component';
import { ModalPromedioAcademicoComponent } from './modulos/tarea-docencia/components/modal-promedio-academico/modal-promedio-academico.component';
import { ModalTutoriaComponent } from './modulos/tarea-docencia/components/modal-tutoria/modal-tutoria.component';
import { ModalMejoraDocenteComponent } from './modulos/tarea-docencia/components/modal-mejora-docente/modal-mejora-docente.component';
import { ListarPeriodosComponent } from './pages/periodo/listar-periodos/listar-periodos.component';
import { CrearPeriodoComponent } from './pages/periodo/crear-periodo/crear-periodo.component';
import { EditarPeriodoComponent } from './pages/periodo/editar-periodo/editar-periodo.component';
import { RevisarTareaAsignadaDocenciaComponent } from './modulos/tarea-docencia/paginas/tarea-docente/revisar-tarea-asignada-docencia/revisar-tarea-asignada-docencia.component';
import { ModalAnexo2Component } from './modulos/tarea-docencia/components/modal-anexo2/modal-anexo2.component';
import { MatRadioModule } from '@angular/material/radio';
import { RevisarTodosInformeFinalSubidos } from './modulos/tarea-docencia/paginas/tarea-docente/revisar-todos-informe-final-subidos/revisar-todos-informe-final-subidos.component';
import { RendimientoGeneralAsignaturasComponent } from './modulos/tarea-docencia/paginas/tarea-docente/dashboard-tarea-modulo-docencia/rendimiento-general-asignaturas/rendimiento-general-asignaturas.component';
import { RendimientoDocenteComponent } from './modulos/tarea-docencia/paginas/tarea-docente/dashboard-tarea-modulo-docencia/rendimiento-general-asignaturas/rendimiento-docente/rendimiento-docente.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RevisarInformeFinalComponent } from './modulos/tarea-docencia/paginas/tarea-docente/revisar-informe-final/revisar-informe-final.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    DocenteComponent,
    FilterPipe,
    ListarPeriodosComponent,
    CrearPeriodoComponent,
    EditarPeriodoComponent,
    ListarProyectosComponent,
    CrearProyectosComponent,
    EditarProyectoComponent,
    CrearTareaComponent,
    EditarTareaComponent,
    ListarTareasDocenteComponent,
    RealizarTareaComponent,
    PaginasValidadorComponent,
    CambiarContraseniaComponent,
    ActualizarDocenteComponent,
    UsuarioPerfilComponent,
    ListarTareasEntregadasComponent,
    RevisarTareaComponent,
    ListarTareasAsignadasComponent,
    ListarTiposProcesosComponent,
    EditarTipoProcesoComponent,
    CrearTipoProcesoComponent,
    ListarTareasRevisarComponent,
    ListarLogueoUsuariosComponent,
    PasswordOlvidadoComponent,
    CrearCargoComponent,
    EditarCargoComponent,
    ListarCargoComponent,
    ListarTareasProgramadasComponent,
    CrearTareaProgramadaComponent,
    CrearProyectoProgramadoComponent,
    MonitoreoProyectoComponent,
    MonitoreoTareasComponent,
    MonitoreoTareaDocenteComponent,
    VerTareaDocenteComponent,
    DashboardInvestigacionComponent,
    ProgressBarComponent,
    DashboardTareaComponent,
    HomeVinculacionComponent,
    CrearProyectoVinculacionComponent,
    EditarProyectoVinculacionComponent,
    ListarTareasProgramadasVinculacionComponent,
    CrearTareaProgramadaVinculacionComponent,
    ListarProyectosVinculacionComponent,
    EditarTareaProgramadaVinculacionComponent,
    RealizarTareaVinculacionComponent,
    RevisarTareaEntregadaVinculacion,
    MonitoreoProyectoVinculacionComponent,
    MonitoreoTareasVinculacionComponent,
    MonitoreoTareaDocenteVinculacionComponent,
    VerTareaDocenteVinculacionComponent,
    ListarTareasRevisadasVinculacionComponent,
    DashboardVinculacionComponent,
    DashboardTareaVinculacionComponent,
    //Docencia
    SubirInformacionGeneralComponent,
    ModalFormacionAcademicaComponent,
    ModalIdiomaHabladoComponent,
    ModalPublicacionRealizadaComponent,
    ModalExperienciaProfesionalComponent,
    ListarDocentesInformacionComponent,
    VerDocenteInformacionComponent,
    ListarTareaDocenteComponent,
    GestionarTareaDocenteComponent,
    RealizarInformeFinalDocenciaComponent,
    ModalStringComponent,
    ModalAsignaturaComponent,
    ModalRendimientoAcademicoComponent,
    ModalPromedioAcademicoComponent,
    ModalTutoriaComponent,
    ModalMejoraDocenteComponent,
    RevisarTareaAsignadaDocenciaComponent,
    ModalAnexo2Component,
    RevisarTodosInformeFinalSubidos,
    RendimientoGeneralAsignaturasComponent,
    RendimientoDocenteComponent,
    RevisarInformeFinalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    NgxAbstractControlAsModule,
    MatInputModule,
    ProgressSpinnerModule,
    ToastModule,
    BlockUIModule,
    NgxChartsModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    ConfirmDialogModule
    //ComponentsModule
    //PagesModule
  ],
  providers: [ProyectoService,MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
