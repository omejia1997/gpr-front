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
import { MessageService } from 'primeng/api';
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
import { EditarTareaComponent } from './pages/tarea/editar-tarea/editar-tarea.component';
import { ListarTareasAsignadasComponent } from './pages/tarea/listar-tareas-asignadas/listar-tareas-asignadas.component';
import { ListarTareasEntregadasComponent } from './pages/tarea/listar-tareas-entregadas/listar-tareas-entregadas.component';
import { ListarTareasProgramadasComponent } from './pages/tarea/listar-tareas-programadas/listar-tareas-programadas.component';
import { ListarTareasRevisarComponent } from './pages/tarea/listar-tareas-revisar/listar-tareas-revisar.component';
import { ListarTareasComponent } from './pages/tarea/listar-tareas/listar-tareas.component';
import { RevisarTareaComponent } from './pages/tarea/revisar-tarea-entregada/revisar-tarea.component';
import { CrearTipoProcesoComponent } from './pages/tipoProceso/crear-tipo-proceso/crear-tipo-proceso.component';
import { EditarTipoProcesoComponent } from './pages/tipoProceso/editar-tipo-proceso/editar-tipo-proceso';
import { ListarTiposProcesosComponent } from './pages/tipoProceso/listar-tipos-procesos/listar-tipos-procesos.component';
import { ListarLogueoUsuariosComponent } from './pages/usuario/listar-logueo-usuarios/listar-logueo-usuarios.component';
import { PasswordOlvidadoComponent } from './pages/usuario/password-olvidado/password-olvidado.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ProyectoService } from './servicios/proyecto.service';
import { CrearTareaProgramadaComponent } from './pages/tarea/crear-tarea-programada/crear-tarea-programada.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    DocenteComponent,
    FilterPipe,
    ListarProyectosComponent,
    CrearProyectosComponent,
    EditarProyectoComponent,
    ListarTareasComponent,
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
    CrearTareaProgramadaComponent
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
    BlockUIModule
    //ComponentsModule
    //PagesModule
  ],
  providers: [ProyectoService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
