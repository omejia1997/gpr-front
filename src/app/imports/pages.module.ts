import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputNumberModule } from 'primeng/inputnumber';

import { RadioButtonModule } from 'primeng/radiobutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import { ListarProyectosComponent } from '../pages/proyecto/listar-proyectos/listar-proyectos.component';
import { CrearProyectosComponent } from '../pages/proyecto/crear-proyectos/crear-proyectos.component';
import { EditarProyectoComponent } from '../pages/proyecto/editar-proyecto/editar-proyecto.component';
import { ListarTareasComponent } from '../pages/tarea/listar-tareas/listar-tareas.component';
import { CrearTareaComponent } from '../pages/tarea/crear-tarea/crear-tarea.component';
import { EditarTareaComponent } from '../pages/tarea/editar-tarea/editar-tarea.component';

@NgModule({
    declarations: [
        /*ListarProyectosComponent,
        CrearProyectosComponent,
        EditarProyectoComponent,
        ListarTareasComponent,
        CrearTareaComponent,
        EditarTareaComponent,*/
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        CalendarModule,
        PasswordModule,
        DropdownModule,
        InputTextModule,
        TableModule,
        CheckboxModule,
        ToggleButtonModule,
        ProgressSpinnerModule,
        CardModule,
        DividerModule,
        ButtonModule,
        ToastModule,
        MessageModule,
        InputNumberModule,
        DropdownModule,
        InputTextareaModule,
        RadioButtonModule,
        ToolbarModule,
        TooltipModule,
        FileUploadModule,
        HttpClientModule,
        DialogModule,
        MessagesModule,
        BrowserAnimationsModule,
        ToastModule,
        ConfirmDialogModule,
        TabViewModule
    ],
    providers: [MessageService],
})
export class PagesModule { }
