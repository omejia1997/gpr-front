import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadFilesService } from 'src/app/servicios/file.service';
import { Router } from '@angular/router';
import { TareaIndicador } from 'src/app/models/TareaIndicador';
import { Tarea } from 'src/app/models/Tarea';
import { TareaIndicadorFile } from 'src/app/models/TareaIndicadorFile';
import { MessageService } from 'primeng/api';
import { TareaVinculacionService } from 'src/app/modulos/vinculacion/servicios/tarea-vinculacion.service';
import { TareaVinculacion } from 'src/app/modulos/vinculacion/modelos/TareaVinculacion';

@Component({
  selector: 'app-ver-tarea-docente-vinculacion',
  templateUrl: './ver-tarea-docente-vinculacion.component.html',
  styleUrls: ['./ver-tarea-docente-vinculacion.component.css']
})
export class VerTareaDocenteVinculacionComponent implements OnInit {
  blockedDocument: boolean = false;
  checkButton:Boolean = false;
  indicadoresAsignados: any[] = [];
  valorIndicadores:any[] = [];
  tareaDocente: any = {};
  tarea: TareaVinculacion = {};
  tareaIndicadors:TareaIndicador[]=[];

  selectedFiles: any;
  selectedFile: any;
  progressInfo:any = [];
  message = '';
  imageName = "";

  fileModelTarea$: Observable<any>= new Observable;
  fileModelGuia$: Observable<any>= new Observable;
  fileModelClass:any={}
  fileModelClassGuia:any={}

  //fileInfos: Observable<any>= new Observable;

  tareaIndicadorFile: TareaIndicadorFile={};

  constructor(
    private uploadFilesService: UploadFilesService,
    private router:Router,
    private tareaService:TareaVinculacionService,
    private messageService: MessageService
    ) {
      this.tareaService.tareaDocente$.subscribe((res) => {
        this.tareaDocente = res;
        if (this.tareaDocente == null) {
          this.back();
        }else
          this.tarea = this.tareaDocente.tarea;
      });
      //this.getIndicadorTarea$ = this.tareaService.obtenerIndicadoresTarea(this.tareaDocente.codigoTareaDocente);
      this.indicadoresAsignados = this.tareaDocente.tareaIndicadorList;
      // this.fileModelGuia$ = this.uploadFilesService.getFileGuia(this.tarea.codigoTarea);
      // this.fileModel$ = this.uploadFilesService.getFileModel(this.tareaDocente.codigoTareaDocente);
      if(this.tarea.nombreArchivoTareaEnStorage){
        this.fileModelGuia$ = this.uploadFilesService.getFileGuia(this.tarea.id);
        this.getFileGuia();
      }

      if(this.tareaDocente.nombreArchivoTareaDocenteEnStorage){
        this.fileModelTarea$ = this.uploadFilesService.getFileModel(this.tareaDocente.id);
        this.getFileModel();
      }
    }

  ngOnInit(): void {
    this.tareaDocente.descripcionTareadocente = "";
  }

  getFileModel() {
    this.fileModelTarea$.subscribe(res =>{
      this.fileModelClass = res;
    });
  }

  getFileGuia() {
    this.fileModelGuia$.subscribe(res =>{
      this.fileModelClassGuia = res;
    });
  }

  back() {
    this.router.navigate(['monitoreo-tarea-docente-vinculacion']);
  }

  asignarIndicador(tareaIndicador:any){
    if(!this.tareaIndicadors.includes(tareaIndicador.codigoTareaIndicador))
      this.tareaIndicadors=this.tareaIndicadors.filter((item) => item.codigoTareaIndicador !== tareaIndicador.codigoTareaIndicador );
    this.tareaIndicadors.push(tareaIndicador);
  }

  selectFiles(event:any) {
    this.progressInfo = [];
    //event.target.files.length == 1 ? this.imageName = event.target.files[0].name : this.imageName = event.target.files.length + " archivos";
    this.imageName = event.target.files[0].name;
    this.selectedFiles = event.target.files;
  }

}
