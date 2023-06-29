import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class StorageFileService {



  //baseUrl="https://gpr-decem-espe.azurewebsites.net"
  //baseUrl = 'http://localhost:8090';

  constructor(private http: HttpClient) { }

  saveFile(modulo:string,file:File,nameFile:any){
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('nameFile', nameFile);
    return this.http.post<any>(`${environment.URL_STORAGE}/saveFileGuia/${modulo}`,formData);
  }

  saveFileTareaDocente(modulo:string,file:File,nameFile:any){
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('nameFile', nameFile);
    return this.http.post<any>(`${environment.URL_STORAGE}/saveFile/${modulo}`,formData);
  }


  getFiles(){
    return this.http.get(`${environment.URL_STORAGE}/files`);
  }

  getFileModel(modulo:string,codigoTareaDocente:number){
    return this.http.get(`${environment.URL_STORAGE}/getFileDocenteTarea/${modulo}/${codigoTareaDocente}`);
  }

  getFileGuia(modulo:string,codigoTarea:any){
    return this.http.get(`${environment.URL_STORAGE}/getFileTarea/${modulo}/${codigoTarea}`);
  }

  deleteFile(filename: string){
    return this.http.get(`${environment.URL_STORAGE}/delete/${filename}`);
  }

}
