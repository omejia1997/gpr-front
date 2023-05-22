import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadFilesService } from 'src/app/servicios/file.service';
import { TareaService } from 'src/app/servicios/tarea.service';
import { Router } from '@angular/router';
import { TareaIndicador } from 'src/app/models/TareaIndicador';
import { Tarea } from 'src/app/models/Tarea';
import { TareaIndicadorFile } from 'src/app/models/TareaIndicadorFile';
import { MessageService } from 'primeng/api';

const MAXIMO_TAMANIO_FILE:number = 5//5MB;

@Component({
  selector: 'app-realizar-tarea',
  templateUrl: './realizar-tarea.html',
  styleUrls: ['./realizar-tarea.component.css']
})
export class RealizarTareaComponent implements OnInit {
  blockedDocument: boolean = false;
  indicadoresAsignados: any[] = [];
  valorIndicadores: any[] = [];
  getIndicadorTarea$: Observable<TareaIndicador[]>;
  tareaDocente: any = {};
  tarea: Tarea = {};
  tareaIndicadors: TareaIndicador[] = [];

  selectedFiles: any;
  selectedFile: any;
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  progressInfo: any = [];
  message = '';
  imageName = "";
  descPerfil: any;

  //fileInfos: Observable<any>= new Observable;
  fileModel$: Observable<any> = new Observable;
  fileModelGuia$: Observable<any> = new Observable;
  fileModelClass: any = {}
  fileModelClassGuia: any = {}
  tareaIndicadorFile: TareaIndicadorFile = {};

  constructor(
    private uploadFilesService: UploadFilesService,
    private router: Router,
    private tareaService: TareaService,
    private messageService: MessageService
  ) {
    this.descPerfil = localStorage.getItem('descPerfil');
    this.tareaService.tareaDocente$.subscribe((res) => {
      this.tareaDocente = res;
      if (this.tareaDocente == null) {
        this.back();
      } else {
        this.tarea = this.tareaDocente.codigoTarea;
      }
    });
    this.getIndicadorTarea$ = this.tareaService.obtenerIndicadoresTarea(this.tareaDocente.codigoTareaDocente);
    this.fileModelGuia$ = this.uploadFilesService.getFileGuia(this.tarea.codigoTarea);
    this.fileModel$ = this.uploadFilesService.getFileModel(this.tareaDocente.codigoTareaDocente);
  }

  ngOnInit(): void {
    //this.fileInfos = this.uploadFilesService.getFiles();
    this.getIndicadorTarea();
    this.getFileGuia();
    this.getFileModel();
  }

  getIndicadorTarea() {
    this.getIndicadorTarea$.subscribe(tareasIndicador => {
      tareasIndicador.forEach(t => {
        this.indicadoresAsignados.push(t);
      });
    });
  }

  getFileModel() {
    this.fileModel$.subscribe(res => {
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
    /*this.tareaService.guardarTareaAsignadaAlDocente(this.tareaIndicadors)
    .subscribe(data=>{
      confirm("Se guardaron sus datos con éxito!!");
      this.router.navigate(["listar-tareas-docente"]);
    })*/

    /*this.tareaService.guardarArchivoTareaAsignadaAlDocente(this.selectedFiles[0],this.tareaDocente.codigoTareaDocente)
    .subscribe(
    event => {
      
    },
    err => {
      
    });
    */
    //
    if (this.selectedFiles == undefined) {
      this.tareaService.guardarTareaAsignadaAlDocente(this.tareaIndicadors, this.tareaDocente.codigoTareaDocente)
        .subscribe({
          next: (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'La Actividad ha sido subida con éxito'
            });
            setTimeout(() => {
              this.blockedDocument = false;
              this.router.navigate(["listar-tareas-docente"])
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
    } else {
      this.tareaService.guardarArchivoTareaAsignadaAlDocente(this.selectedFiles[0], this.tareaIndicadors, this.tareaDocente.codigoTareaDocente)
        .subscribe({
          next: (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'La Actividad ha sido subida con éxito'
            });
            setTimeout(() => {
              this.blockedDocument = false;
              this.router.navigate(["listar-tareas-docente"])
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
    this.router.navigate(['listar-tareas-docente']);
  }

  regresar() {
    this.router.navigate(["listar-tareas-docente"])
  }
  
  asignarIndicador(tareaIndicador: any) {
    if (!this.tareaIndicadors.includes(tareaIndicador.codigoTareaIndicador))
      this.tareaIndicadors = this.tareaIndicadors.filter((item) => item.codigoTareaIndicador !== tareaIndicador.codigoTareaIndicador);
    this.tareaIndicadors.push(tareaIndicador);
  }

  selectFiles(event: any) {
    this.progressInfo = [];
    //event.target.files.length == 1 ? this.imageName = event.target.files[0].name : this.imageName = event.target.files.length + " archivos";
    this.imageName = event.target.files[0].name;
    this.selectedFiles = event.target.files;
  }

  /*
  upload(index:any, file:any) {
    this.progressInfo[index] = { value: 0, fileName: file.name };

    this.uploadFilesService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          if(event.total)
            this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadFilesService.getFiles();
        }
      },
      err => {
        this.progressInfo[index].value = 0;
        this.message = 'No se puede subir el archivo ' + file.name;
      });
  }
  */

  /*uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }*/

  deleteFile(filename: string) {/*
    this.uploadFilesService.deleteFile(filename).subscribe(res => {
      this.message = res['message'];
      this.fileInfos = this.uploadFilesService.getFiles();
    });
  */}

  /*crearSubTarea(){
    this.tareaService.setTareaModel(this.tarea);
    this.router.navigate(['crear-subTarea']);
  }*/
}