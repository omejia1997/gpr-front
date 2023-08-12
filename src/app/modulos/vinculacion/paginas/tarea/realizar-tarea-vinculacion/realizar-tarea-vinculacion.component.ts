import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadFilesService } from 'src/app/servicios/file.service';
import { Router } from '@angular/router';
import { TareaIndicador } from 'src/app/models/TareaIndicador';
import { TareaIndicadorFile } from 'src/app/models/TareaIndicadorFile';
import { MessageService } from 'primeng/api';
import { TareaVinculacionService } from '../../../servicios/tarea-vinculacion.service';
import { TareaService } from 'src/app/servicios/tarea.service';
import { TareaVinculacion } from '../../../modelos/TareaVinculacion';
import { StorageFileService } from '../../../servicios/storage-file.service';

const MAXIMO_TAMANIO_FILE:number = 5//5MB;

@Component({
  selector: 'app-realizar-tarea-vinculacion',
  templateUrl: './realizar-tarea-vinculacion.html',
  styleUrls: ['./realizar-tarea-vinculacion.component.css']
})
export class RealizarTareaVinculacionComponent implements OnInit {
  blockedDocument: boolean = false;
  indicadoresAsignados: any[] = [];
  valorIndicadores: any[] = [];
  tareaDocente: any = {};
  tarea: TareaVinculacion = {};
  tareaIndicadors: TareaIndicador[] = [];

  selectedFiles: any;
  selectedFile: any;
  progressInfo: any = [];
  message = '';
  imageName = "";
  descPerfil: any;

  fileModelTarea$: Observable<any> = new Observable;
  fileModelGuia$: Observable<any> = new Observable;
  fileModelClass: any = {}
  fileModelClassGuia: any = {}
  tareaIndicadorFile: TareaIndicadorFile = {};

  constructor(
    private storageFileService :StorageFileService,
    private router: Router,
    private tareaService: TareaVinculacionService,
    private messageService: MessageService
  ) {
    this.descPerfil = localStorage.getItem('descPerfil');
    this.tareaService.tareaDocente$.subscribe((res) => {
      this.tareaDocente = res;
      if (this.tareaDocente == null) {
        this.back();
      } else {
        this.tarea = this.tareaDocente.tarea;
      }
    });
    this.tareaIndicadors = this.tareaDocente.tareaIndicadorList;
    this.indicadoresAsignados = this.tareaDocente.tareaIndicadorList;
    if(this.tarea.nombreArchivoTareaEnStorage){
      this.fileModelGuia$ = this.tareaService.getFileGuia("Vinculacion",this.tarea.id);
      this.getFileGuia();
    }

    if(this.tareaDocente.nombreArchivoTareaDocenteEnStorage){
      this.fileModelTarea$ = this.tareaService.getFileModel("Vinculacion",this.tareaDocente.id);
      this.getFileModel();
    }
  }

  ngOnInit(): void {
  }

  getFileModel() {
    this.fileModelTarea$.subscribe(res => {
      this.fileModelClass = res;
    });
  }

  getFileGuia() {
    this.fileModelGuia$.subscribe(res => {
      this.fileModelClassGuia = res;
    });
  }

  save() {
    if (this.selectedFiles != undefined){
      if(this.selectedFiles[0].type != "application/pdf"){
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El archivo debe estar en Formato PDF'
        });
        return;
      }
      if (this.selectedFiles[0].size / 1024 / 1024 > MAXIMO_TAMANIO_FILE) {//5MB
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El archivo supera el tamaño especificado'
        });
        return;
      }
    }
    this.blockedDocument = true;
    this.tareaIndicadorFile.tareaIndicador = this.tareaIndicadors;
    if (this.selectedFiles == undefined) {
      this.tareaService.guardarTareaAsignadaAlDocente(this.tareaIndicadors, this.tareaDocente.id)
        .subscribe({
          next: (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'La Actividad ha sido subida con éxito'
            });
            setTimeout(() => {
              this.blockedDocument = false;
              this.router.navigate(["listar-tareas-docente-vinculacion"])
            }, 2000);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err?.message ?? ' Error al subir la Actividad'
            });
            this.blockedDocument = false;
          },
          complete: () => {
          },
        })
    } else {
      this.tareaService.guardarArchivoTareaAsignadaAlDocente(this.selectedFiles[0], this.tareaIndicadors, this.tareaDocente.id)
        .subscribe({
          next: (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'La Actividad ha sido subida con éxito'
            });
            setTimeout(() => {
              this.blockedDocument = false;
              this.router.navigate(["listar-tareas-docente-vinculacion"])
            }, 2000);

          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err?.message ?? ' Error al subir la Actividad'
            });
            this.blockedDocument = false;
          },
          complete: () => {
            // this.isLoading = false;
          },
        })
    }
  }

  back() {
    this.router.navigate(['listar-tareas-docente-vinculacion']);
  }

  regresar() {
    this.router.navigate(["listar-tareas-docente-vinculacion"])
  }

  asignarIndicador(tareaIndicador: any) {
    if (!this.tareaIndicadors.includes(tareaIndicador.codigoTareaIndicador))
      this.tareaIndicadors = this.tareaIndicadors.filter((item) => item.codigoTareaIndicador !== tareaIndicador.codigoTareaIndicador);

      this.tareaIndicadors.push(tareaIndicador);
      console.log("i-al cambiar uno",this.tareaIndicadors)
  }

  selectFiles(event: any) {
    this.progressInfo = [];
    //event.target.files.length == 1 ? this.imageName = event.target.files[0].name : this.imageName = event.target.files.length + " archivos";
    this.imageName = event.target.files[0].name;
    this.selectedFiles = event.target.files;
  }


  deleteFile(filename: string) {/*
    this.uploadFilesService.deleteFile(filename).subscribe(res => {
      this.message = res['message'];
      this.fileInfos = this.uploadFilesService.getFiles();
    });
  */}
}
