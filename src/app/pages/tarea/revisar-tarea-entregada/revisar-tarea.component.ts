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

@Component({
  selector: 'app-revisar-tarea',
  templateUrl: './revisar-tarea.html',
  styleUrls: ['./revisar-tarea.component.css']
})
export class RevisarTareaComponent implements OnInit {
  blockedDocument: boolean = false;
  checkButton:Boolean = false;
  indicadoresAsignados: any[] = [];
  valorIndicadores:any[] = [];
  getIndicadorTarea$: Observable<TareaIndicador[]>;
  tareaDocente: any = {};
  tarea: Tarea = {};
  tareaIndicadors:TareaIndicador[]=[];

  selectedFiles: any;
  selectedFile: any;
  progressInfo:any = [];
  message = '';
  imageName = "";

  fileModel$: Observable<any>= new Observable;
  fileModelGuia$: Observable<any>= new Observable;
  fileModelClass:any={}
  fileModelClassGuia:any={}

  //fileInfos: Observable<any>= new Observable;

  tareaIndicadorFile: TareaIndicadorFile={};

  constructor(
    private uploadFilesService: UploadFilesService,
    private router:Router,
    private tareaService:TareaService,
    private messageService: MessageService
    ) {
      this.tareaService.tareaDocente$.subscribe((res) => {
        this.tareaDocente = res;
        if (this.tareaDocente == null) {
          this.back();
        }else
          this.tarea = this.tareaDocente.codigoTarea;
      });
      this.getIndicadorTarea$ = this.tareaService.obtenerIndicadoresTarea(this.tareaDocente.codigoTareaDocente);
      this.fileModelGuia$ = this.uploadFilesService.getFileGuia(this.tarea.codigoTarea);
      this.fileModel$ = this.uploadFilesService.getFileModel(this.tareaDocente.codigoTareaDocente);
    }

  ngOnInit(): void {
    this.tareaDocente.descripcionTareadocente = "";
    this.getIndicadorTarea();
    this.getFileGuia();
    this.getFileModel();
  }

  getIndicadorTarea() {
    this.getIndicadorTarea$.subscribe(tareasIndicador =>{
      tareasIndicador.forEach(t => {
        this.indicadoresAsignados.push(t);
      });
    });
  }

  getFileModel() {
    this.fileModel$.subscribe(res =>{
      this.fileModelClass = res;
    });
  }

  getFileGuia() {
    this.fileModelGuia$.subscribe(res =>{
      this.fileModelClassGuia = res;
    });
  }

  back() {
    this.router.navigate(['tareas-entregadas']);
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

  aprobarTarea(){
    this.blockedDocument = true;
    this.tareaService.aprobarTareaDocente(this.tareaDocente)
    .subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success', 
          summary: 'Éxito', 
          detail: 'La Actividad ha sido aprobada con éxito'
        });
        setTimeout(() => {  
          this.blockedDocument = false;                      
          this.router.navigate(["tareas-entregadas"])
        }, 2000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message ?? ' Error al aprobar la Actividad'
        });
      },
      complete: () => {
        // this.isLoading = false;
      },
    })
  }

  regresar() {
    this.router.navigate(["tareas-entregadas"])
  }

  deleteFile(){}

  denegarTarea(){
    this.checkButton = true;
  }

  denegarTareaDocente(){
    this.blockedDocument = true;
    this.tareaService.denegarTareaDocente(this.tareaDocente)
    .subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success', 
          summary: 'Éxito', 
          detail: 'La Actividad ha sido Denegada con éxito'
        });
        setTimeout(() => {    
          this.blockedDocument = false;                    
          this.router.navigate(["tareas-entregadas"])
        }, 2000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message ?? ' Error al denegar la Actividad'
        });
        this.blockedDocument = false; 
      },
      complete: () => {
        // this.isLoading = false;
      },
    })
  }

  cancelarTareaDocente(){
    this.checkButton = false;
  }
}